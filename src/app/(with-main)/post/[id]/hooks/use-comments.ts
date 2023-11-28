import {
  useState,
  useEffect,
  useOptimistic,
  useRef,
  type ElementRef
} from 'react'
import { useParams, useRouter } from 'next/navigation'
import { addNewComment } from '../actions'
import { deleteCommentFromPost } from '@/services/posts'
import { toast } from 'sonner'
import { type Comment } from '@/lib/sanity/types/post'

export interface UseComments {
  comments: Comment[]
  loggedInUser: {
    id: string
    fullUsername: string
    userTag: string
    image: string
  }
}

type OptimisticComment = Comment & {
  sending: boolean
}

export function useComments({ comments, loggedInUser }: UseComments) {
  const [localComments, setLocalComments] = useState(comments)
  const [isPendingDelete, setIsPendingDelete] = useState(false)

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    localComments as OptimisticComment[],
    (oldComments, newComment: OptimisticComment) => {
      return [...oldComments, newComment]
    }
  )

  const router = useRouter()
  const { id: postID } = useParams()

  const commentsFormRef = useRef<ElementRef<'form'>>(null)
  const commentsBoxRef = useRef<ElementRef<'div'>>(null)
  const commentsInputRef = useRef<ElementRef<'textarea'>>(null)

  useEffect(() => {
    if (commentsBoxRef.current !== null) {
      commentsBoxRef.current?.scrollTo({
        top: commentsBoxRef.current?.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [optimisticComments])

  const commentFormAction = async (formData: FormData) => {
    const commentText = formData.get('comment') as string

    if (commentText.trim() === '') return

    const newComment: OptimisticComment = {
      _key: crypto.randomUUID(),
      comment: commentText,
      createdAt: new Date().toISOString(),
      postedBy: {
        _id: loggedInUser.id,
        image: loggedInUser.image,
        userName: loggedInUser.fullUsername,
        userTag: loggedInUser.userTag
      },
      sending: true
    }

    addOptimisticComment(newComment)
    commentsFormRef.current?.reset()

    formData.append('postID', postID as string)
    formData.append('userID', loggedInUser.id)

    // The idea here is to use router.refresh() or revalidatePath
    // from the server action to update the new optimistic comments array.
    // However, it seems there is a bug concerning router.refresh() and revalidatePath
    // when used with parallel + intercepting routes
    // as described here: https://github.com/vercel/next.js/issues/54173

    const { status, message, payload } = await addNewComment(formData)
    const toastFn = status === 'success' ? toast.success : toast.error

    if (status === 'success') {
      setLocalComments(payload)
    }

    toastFn(message)
  }

  const deleteComment = ({
    commentKey,
    postID
  }: {
    commentKey: string
    postID: string
  }) => {
    setIsPendingDelete(true)

    toast.promise(deleteCommentFromPost({ commentKey, postID }), {
      loading: 'Deleting comment...',
      success: () => {
        // There might be an issue regarding useOptimistic
        // showing stale data as described
        // here: https://github.com/vercel/next.js/issues/57662
        // setLocalComments(prev =>
        //  prev.filter(comment => comment._key !== deletedCommentKey)
        // )
        setIsPendingDelete(false)
        router.replace(`/post/${postID}?update=${new Date().valueOf()}`)
        return 'Comment deleted'
      },
      error: () => {
        setIsPendingDelete(false)
        return 'Failed to delete comment'
      }
    })
  }

  return {
    optimisticComments,
    isPendingDelete,
    commentsFormRef,
    commentsBoxRef,
    commentsInputRef,
    postID,
    commentFormAction,
    deleteComment
  }
}

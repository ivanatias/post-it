import { useEffect, useOptimistic, useRef, type ElementRef } from 'react'
import { useParams } from 'next/navigation'
import { addCommentToPost, deleteCommentFromPost } from '../actions'
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

export type OptimisticComment = Comment & {
  sending?: boolean
}

const ACTIONS = {
  ADD: (comments: OptimisticComment[], newComment: Comment) => {
    return [...comments, { ...newComment, sending: true }]
  },
  DELETE: (comments: OptimisticComment[], commentToDelete: Comment) => {
    return comments.filter(comment => comment._key !== commentToDelete._key)
  }
} as const

type Action = keyof typeof ACTIONS

type CommentsAction = {
  type: Action
  payload: Comment
}

const commentsReducer = (
  state: OptimisticComment[],
  action: CommentsAction
) => {
  const { type, payload } = action
  return ACTIONS[type](state, payload)
}

export function useComments({ comments, loggedInUser }: UseComments) {
  const [optimisticComments, dispatch] = useOptimistic(
    comments,
    commentsReducer
  )
  const { id: postID } = useParams()

  const commentsFormRef = useRef<ElementRef<'form'>>(null)
  const commentsBoxRef = useRef<ElementRef<'ul'>>(null)
  const commentsInputRef = useRef<ElementRef<'textarea'>>(null)

  useEffect(() => {
    if (commentsBoxRef.current !== null) {
      commentsBoxRef.current?.scrollTo({
        top: commentsBoxRef.current?.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [optimisticComments])

  const addComment = async (formData: FormData) => {
    const commentText = formData.get('comment') as string

    if (commentText.trim() === '') return

    const newComment: Comment = {
      _key: crypto.randomUUID(),
      comment: commentText,
      createdAt: new Date().toISOString(),
      postedBy: {
        _id: loggedInUser.id,
        image: loggedInUser.image,
        userName: loggedInUser.fullUsername,
        userTag: loggedInUser.userTag
      }
    }

    dispatch({ type: 'ADD', payload: newComment })
    commentsFormRef.current?.reset()

    formData.append('postID', postID as string)
    formData.append('userID', loggedInUser.id)

    const { status, message } = await addCommentToPost(formData)
    const toastFn = status === 'success' ? toast.success : toast.error
    toastFn(message)
  }

  const deleteComment = async (formData: FormData) => {
    const commentKey = formData.get('commentKey')
    const toDelete = optimisticComments.find(
      comment => comment._key === commentKey
    )

    if (toDelete === undefined) throw new Error('Comment not found')
    // It seems useOptimistic's dispatch fn only works properly within a server action.
    // That's why the comment items' delete buttons in comments-box.tsx
    // are being wrapped in a form element with an input of type hidden
    // holding the value of the comment's to delete key
    dispatch({ type: 'DELETE', payload: toDelete })
    formData.append('postID', postID as string)

    const { status, message } = await deleteCommentFromPost(formData)

    if (status === 'error') toast.error(message)
  }

  return {
    optimisticComments,
    commentsFormRef,
    commentsBoxRef,
    commentsInputRef,
    addComment,
    deleteComment
  }
}

import { useState, startTransition } from 'react'
import { useRouter } from 'next/navigation'
import { togglePostLike, deletePost } from '@/services/posts'
import { toast } from 'sonner'
import { type Saved } from '@/lib/sanity/types/post'

interface UsePostActions {
  userID: string
  postID: string
  saved: Saved[]
}

export function usePostActions({ userID, postID, saved }: UsePostActions) {
  const [doingAction, setDoingAction] = useState(false)
  const router = useRouter()

  const postAlreadyLiked = saved.some(el => {
    return el.postedBy._id === userID
  })

  const handleToggleLikePost = () => {
    const action = postAlreadyLiked ? 'unlike' : 'like'

    const loadingMsg = postAlreadyLiked ? 'Unliking post...' : 'Liking post...'
    const successMsg = postAlreadyLiked ? 'Post unliked!' : 'Post liked!'
    const errorMsg = `Could not ${
      postAlreadyLiked ? 'unlike' : 'like'
    } post due to error, try again.`

    setDoingAction(true)

    toast.promise(togglePostLike({ postID, userID, action }), {
      loading: loadingMsg,
      success: () => {
        startTransition(() => {
          setDoingAction(false)
          router.refresh()
        })
        return successMsg
      },
      error: () => {
        setDoingAction(false)
        return errorMsg
      }
    })
  }

  const handleDeletePost = () => {
    setDoingAction(true)

    toast.promise(deletePost(postID), {
      loading: 'Deleting post...',
      success: () => {
        startTransition(() => {
          setDoingAction(false)
          router.refresh()
        })
        return 'Post deleted!'
      },
      error: 'Error deleting post, try again.'
    })
  }

  return {
    postAlreadyLiked,
    doingAction,
    handleToggleLikePost,
    handleDeletePost
  }
}

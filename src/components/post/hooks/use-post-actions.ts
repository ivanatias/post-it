import { useState, startTransition } from 'react'
import { useRouter } from 'next/navigation'
import { togglePostLike } from '@/services/posts'
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
    const endpoint = postAlreadyLiked ? '/api/posts/unlike' : '/api/posts/like'

    const loadingMsg = postAlreadyLiked ? 'Unliking post...' : 'Liking post...'
    const successMsg = postAlreadyLiked ? 'Post unliked!' : 'Post liked!'
    const errorMsg = `Could not ${
      postAlreadyLiked ? 'unlike' : 'like'
    } post due to error, try again.`

    setDoingAction(true)

    toast.promise(togglePostLike({ postID, userID, endpoint }), {
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

  return {
    postAlreadyLiked,
    doingAction,
    handleToggleLikePost
  }
}

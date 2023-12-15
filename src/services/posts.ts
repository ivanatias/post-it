import { type PostFormSchema } from '@/lib/schemas/post-form'

export const togglePostLike = async ({
  postID,
  userID,
  action
}: {
  postID: string
  userID: string
  action: 'like' | 'unlike'
}) => {
  const endpoint = `/api/posts/likes?action=${action}`

  const res = await fetch(endpoint, {
    method: 'PATCH',
    body: JSON.stringify({ postID, userID }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) throw new Error('Error performing action, try again.')
}

export const createPost = async ({
  values,
  userID
}: {
  values: PostFormSchema
  userID: string
}) => {
  const formData = new FormData()

  for (const [key, value] of Object.entries(values)) {
    formData.append(key, value)
  }

  formData.append('userID', userID)

  const res = await fetch(`/api/posts`, {
    method: 'POST',
    body: formData
  })

  if (!res.ok) throw new Error('Error performing action, try again.')
}

export const deletePost = async (postID: string) => {
  const res = await fetch(`/api/posts`, {
    method: 'DELETE',
    body: JSON.stringify({ postID }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) throw new Error('Error performing action, try again.')
}

export const deleteCommentFromPost = async ({
  commentKey,
  postID
}: {
  commentKey: string
  postID: string
}): Promise<{ deletedCommentKey: string }> => {
  const res = await fetch(`/api/comments`, {
    method: 'DELETE',
    body: JSON.stringify({ commentKey, postID }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) throw new Error('Error performing action, try again.')

  const { deletedCommentKey } = await res.json()

  return deletedCommentKey
}

export const togglePostLike = async ({
  postID,
  userID,
  endpoint
}: {
  postID: string
  userID: string
  endpoint: '/api/posts/like' | '/api/posts/unlike'
}) => {
  const res = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ postID, userID }),
    headers: {
      'Content-Type': 'application/json'
    }
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

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

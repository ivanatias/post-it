import { currentUser } from '@clerk/nextjs'
import { CommentsBox } from './comments-box'
import { client } from '@/lib/sanity/client'
import { getPostCommentsQuery } from '@/lib/sanity/queries'
import { parseUserID } from '@/lib/utils'
import { type Comment } from '@/lib/sanity/types/post'

export async function Comments({ postID }: { postID: string }) {
  const [results, user] = await Promise.all([
    client.fetch<{ comments: Comment[] } | null>(
      getPostCommentsQuery(postID),
      {},
      {
        cache: 'no-store'
      }
    ),
    currentUser()
  ])

  if (results === null) {
    return null
  }

  const loggedInUser = {
    id: parseUserID(user?.id as string),
    fullUsername: `${user?.firstName} ${user?.lastName}`,
    userTag: `${user?.firstName} ${user?.lastName}`
      .split(' ')
      .join('')
      .toLocaleLowerCase(),
    image: user?.imageUrl as string
  }

  return <CommentsBox comments={results.comments} loggedInUser={loggedInUser} />
}

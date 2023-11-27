import { currentUser } from '@clerk/nextjs'
import { CommentsBox } from './comments-box'
import { client } from '@/lib/sanity/client'
import { getPostCommentsQuery } from '@/lib/sanity/queries'
import { parseUserID } from '@/lib/utils'
import { type Comment } from '@/lib/sanity/types/post'

export async function Comments({ postID }: { postID: string }) {
  const [{ comments }, user] = await Promise.all([
    client.fetch<{ comments: Comment[] }>(
      getPostCommentsQuery(postID),
      {},
      {
        cache: 'no-store'
      }
    ),
    currentUser()
  ])

  const loggedInUser = {
    id: parseUserID(user?.id as string),
    fullUsername: `${user?.firstName} ${user?.lastName}`,
    userTag: `${user?.firstName} ${user?.lastName}`
      .split(' ')
      .join('')
      .toLocaleLowerCase(),
    image: user?.imageUrl as string
  }

  return <CommentsBox comments={comments} loggedInUser={loggedInUser} />
}

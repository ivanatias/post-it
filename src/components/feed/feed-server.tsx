import { currentUser } from '@clerk/nextjs'
import { PostCard } from '../post'
import { MasonryLayout } from '../utils/masonry-layout'
import { client } from '@/lib/sanity/client'
import {
  getAllPostsQuery,
  getPostsByCategoryQuery,
  getPostsByUserQuery
} from '@/lib/sanity/queries'
import { parseUserID } from '@/lib/utils'
import type { Post } from '@/lib/sanity/types/post'

type FeedProps =
  | {
      type: 'main'
    }
  | {
      type: 'category'
      category: string
    }
  | {
      type: 'user'
      userID: string
    }
  | {
      type: 'search'
      term: string
    }

export async function FeedServer(props: FeedProps) {
  let queryForFeed = ''

  if (props.type === 'category') {
    queryForFeed = getPostsByCategoryQuery(props.category)
  }

  if (props.type === 'user') {
    queryForFeed = getPostsByUserQuery(props.userID)
  }

  if (props.type === 'search') {
    queryForFeed = 'todo'
  }

  if (props.type === 'main') {
    queryForFeed = getAllPostsQuery()
  }

  const [posts, user] = await Promise.all([
    client.fetch<Post[]>(queryForFeed, {}, { cache: 'no-store' }),
    currentUser()
  ])

  return (
    <section>
      <MasonryLayout>
        {posts.map(post => (
          <PostCard
            post={post}
            loggedInUserID={parseUserID(user?.id as string)}
            key={post._id}
          />
        ))}
      </MasonryLayout>
    </section>
  )
}

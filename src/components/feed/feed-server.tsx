import { currentUser } from '@clerk/nextjs'
import { PostCard } from '../post'
import { MasonryLayout } from '../utils/masonry-layout'
import { client } from '@/lib/sanity/client'
import {
  getAllPostsQuery,
  getPostsByCategoryQuery,
  getPostsByUserQuery,
  getPostsLikedByUserQuery,
  getSearchPostsQuery
} from '@/lib/sanity/queries'
import { parseUserID, capitalize } from '@/lib/utils'
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
      term?: string
    }
  | {
      type: 'likedByUser'
      userID: string
    }

export async function FeedServer(props: FeedProps) {
  let queryForFeed = ''
  let emptyFeedMsg = 'No posts to show...'

  if (props.type === 'category') {
    queryForFeed = getPostsByCategoryQuery(capitalize(props.category))
  }

  if (props.type === 'user') {
    queryForFeed = getPostsByUserQuery(props.userID)
    emptyFeedMsg = 'No posts by this user'
  }

  if (props.type === 'search') {
    queryForFeed = getSearchPostsQuery(props.term)
  }

  if (props.type === 'likedByUser') {
    queryForFeed = getPostsLikedByUserQuery(props.userID)
    emptyFeedMsg = 'No posts liked by this user'
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
      {posts.length > 0 ? (
        <MasonryLayout>
          {posts.map(post => (
            <PostCard
              post={post}
              loggedInUserID={parseUserID(user?.id as string)}
              key={post._id}
            />
          ))}
        </MasonryLayout>
      ) : (
        <p
          className={`text-muted-foreground text-lg lg:text-xl font-semibold ${
            props.type === 'user' || props.type === 'likedByUser'
              ? 'text-left'
              : 'text-center'
          }`}
        >
          {emptyFeedMsg}
        </p>
      )}
    </section>
  )
}

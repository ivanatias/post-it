import { currentUser } from '@clerk/nextjs'
import { PostCard } from '../post'
import { MasonryLayout } from '../utils/masonry-layout'
import { client } from '@/lib/sanity/client'
import { getAllPostsQuery } from '@/lib/sanity/queries'
import { parseUserID } from '@/lib/utils'
import type { Post } from '@/lib/sanity/types/post'

export async function FeedServer() {
  const [posts, user] = await Promise.all([
    client.fetch<Post[]>(getAllPostsQuery()),
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

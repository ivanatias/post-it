import { client } from '@/lib/sanity/client'
import { getAllPostsQuery } from '@/lib/sanity/queries'
import { PostCard } from '../post/post-card'
import { MasonryLayout } from '../utils/masonry-layout'
import type { Post } from '@/lib/sanity/types/post'

export async function FeedServer() {
  const posts = await client.fetch<Post[]>(getAllPostsQuery())

  return (
    <section>
      <MasonryLayout>
        {posts.map(post => (
          <PostCard post={post} key={post._id} />
        ))}
      </MasonryLayout>
    </section>
  )
}

import { Suspense } from 'react'
import { FeedServer } from '@/components/feed/feed-server'
import { PostCardSkeleton } from '@/components/post/components/post-skeleton'
import { FEED_SKELETONS_DIMENSIONS } from '@/constants/skeletons'

export default async function Home() {
  return (
    <Suspense
      fallback={
        <div className='flex flex-wrap gap-6 w-full'>
          {FEED_SKELETONS_DIMENSIONS.map((dimension, index) => (
            <PostCardSkeleton
              key={index}
              width={dimension.width}
              height={dimension.height}
            />
          ))}
        </div>
      }
    >
      <FeedServer type='main' />
    </Suspense>
  )
}

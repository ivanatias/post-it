import { Suspense } from 'react'
import { FeedServer } from '@/components/feed/feed-server'
import { PostCardSkeleton } from '@/components/post/components/post-skeleton'
import { FEED_SKELETONS_DIMENSIONS } from '@/constants/skeletons'

export default function CategoryPage({
  params
}: {
  params: { category: string }
}) {
  return (
    <Suspense
      fallback={
        <div className='flex flex-wrap gap-6 w-full'>
          {FEED_SKELETONS_DIMENSIONS.slice(0, 4).map((dimension, index) => (
            <PostCardSkeleton
              key={index}
              width={dimension.width}
              height={dimension.height}
            />
          ))}
        </div>
      }
    >
      <FeedServer type='category' category={params.category} />
    </Suspense>
  )
}

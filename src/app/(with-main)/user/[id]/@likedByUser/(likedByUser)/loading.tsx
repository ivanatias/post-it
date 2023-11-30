import { PostCardSkeleton } from '@/components/post/components/post-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { FEED_SKELETONS_DIMENSIONS } from '@/constants/skeletons'

export default function Loading() {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton className='w-60 h-5' />
      <div className='flex flex-wrap gap-6 w-full'>
        {FEED_SKELETONS_DIMENSIONS.slice(0, 3).map((dimension, index) => (
          <PostCardSkeleton
            key={index}
            width={dimension.width}
            height={dimension.height}
          />
        ))}
      </div>
    </div>
  )
}

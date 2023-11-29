import { PostCardSkeleton } from '@/components/post/components/post-skeleton'
import { FEED_SKELETONS_DIMENSIONS } from '@/constants/skeletons'

export default function Loading() {
  return (
    <div className='flex flex-wrap gap-6 w-full'>
      {FEED_SKELETONS_DIMENSIONS.map((dimension, index) => (
        <PostCardSkeleton
          key={index}
          width={dimension.width}
          height={dimension.height}
        />
      ))}
    </div>
  )
}

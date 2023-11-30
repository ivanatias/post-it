import { PostCardSkeleton } from '@/components/post/components/post-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton className='w-60 h-5' />
      <div className='flex flex-wrap gap-6 w-full justify-center lg:justify-start'>
        {Array.from({ length: 2 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

import { Suspense } from 'react'
import { FeedServer } from '@/components/feed/feed-server'
import { PostCardSkeleton } from '@/components/post/components/post-skeleton'

export default function CategoryPage({
  params
}: {
  params: { category: string }
}) {
  return (
    <Suspense
      fallback={
        <div className='flex flex-wrap gap-6 w-full justify-center lg:justify-start'>
          {Array.from({ length: 4 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      }
    >
      <FeedServer type='category' category={params.category} />
    </Suspense>
  )
}

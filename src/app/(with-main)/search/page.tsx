import { Suspense } from 'react'
import { FeedServer } from '@/components/feed/feed-server'
import { PostCardSkeleton } from '@/components/post/components/post-skeleton'

export default function SearchPage({
  searchParams
}: {
  searchParams?: { q: string }
}) {
  return (
    <Suspense
      key={searchParams?.q}
      fallback={
        <div className='flex flex-wrap gap-6 w-full justify-center lg:justify-start'>
          {Array.from({ length: 4 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      }
    >
      <FeedServer type='search' term={searchParams?.q} />
    </Suspense>
  )
}

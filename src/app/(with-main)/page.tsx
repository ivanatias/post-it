import { Suspense } from 'react'
import { FeedServer } from '@/components/feed/feed-server'
import { PostCardSkeleton } from '@/components/post/components/post-skeleton'

export default async function Home() {
  return (
    <Suspense
      fallback={
        <div className='flex flex-wrap gap-6 w-full justify-center lg:justify-start'>
          {Array.from({ length: 5 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      }
    >
      <FeedServer type='main' />
    </Suspense>
  )
}

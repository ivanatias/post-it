import { Suspense } from 'react'
import { FeedServer } from '@/components/feed/feed-server'
import { PostCardSkeleton } from '@/components/post/components/post-skeleton'

const SKELETONS_DIMENSIONS = [
  {
    width: 320,
    height: 570
  },
  {
    width: 320,
    height: 300
  },
  {
    width: 320,
    height: 500
  },
  {
    width: 300,
    height: 500
  },
  {
    width: 370,
    height: 565
  },

  {
    width: 240,
    height: 390
  }
]

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className='flex flex-wrap gap-6 w-full'>
          {SKELETONS_DIMENSIONS.map((dimension, index) => (
            <PostCardSkeleton
              key={index}
              width={dimension.width}
              height={dimension.height}
            />
          ))}
        </div>
      }
    >
      <FeedServer />
    </Suspense>
  )
}

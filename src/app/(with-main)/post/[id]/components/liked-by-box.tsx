'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserAvatar } from '@/components/user-avatar'
import { PlusIcon } from 'lucide-react'
import { formatLikedBy } from '@/lib/utils'
import { type PostDetails } from '@/lib/sanity/types/post'

export function LikedByBox({ liked }: { liked: PostDetails['saved'] }) {
  const [showBox, setShowBox] = useState(false)

  const { likedByText, sliced } = formatLikedBy(liked)

  if (liked.length === 0) {
    return null
  }

  return (
    <>
      <div
        className='flex items-center gap-3 cursor-pointer text-muted-foreground hover:text-slate-300 transition-colors'
        onClick={() => {
          setShowBox(true)
        }}
      >
        <ul className='flex items-center'>
          {sliced.map((saved, index) => (
            <li key={saved._key}>
              <UserAvatar
                userName={saved.postedBy.userName}
                imageUrl={saved.postedBy.image}
                className={index > 0 ? '-ml-2' : ''}
              />
            </li>
          ))}
        </ul>
        <p className='text-xs font-light'>{likedByText}</p>
      </div>
      {showBox && (
        <div className='fixed flex flex-col gap-5 bg-slate-900 border border-border rounded-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='flex flex-1 justify-end p-3'>
            <button
              aria-label='Close liked by box'
              onClick={() => {
                setShowBox(false)
              }}
            >
              <PlusIcon className='w-6 h-6 -rotate-45' />
            </button>
          </div>
          <p className='text-center text-base lg:text-lg font-semibold'>
            Liked by
          </p>
          <div className='flex flex-col gap-5 px-14 pb-6 max-h-[250px] overflow-y-auto'>
            {liked.map(item => (
              <Link
                key={item.postedBy._id}
                className='flex items-center gap-3'
                href={`/user/${item.postedBy._id}`}
                aria-label={`View ${item.postedBy.userName} profile`}
              >
                <UserAvatar
                  userName={item.postedBy.userName}
                  imageUrl={item.postedBy.image}
                />
                <p className='text-xs lg:text-sm'>{item.postedBy.userTag}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

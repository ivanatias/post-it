'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
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
        className='flex items-center gap-3 cursor-pointer'
        onClick={() => {
          setShowBox(true)
        }}
      >
        <div className='flex items-center'>
          {sliced.map((saved, index) => (
            <Avatar
              key={saved._key}
              className={`w-8 h-8 ${index > 0 ? '-ml-2' : ''}`}
            >
              <AvatarImage
                className='object-cover'
                src={saved.postedBy.image}
              />
              <AvatarFallback>{saved.postedBy.userName}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className='text-xs font-light'>{likedByText}</div>
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
                <Avatar className='w-8 h-8'>
                  <AvatarImage
                    className='object-cover'
                    src={item.postedBy.image}
                  />
                  <AvatarFallback>
                    <span className='text-xs'>{item.postedBy.userName}</span>
                  </AvatarFallback>
                </Avatar>
                <p className='text-xs lg:text-sm'>{item.postedBy.userTag}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

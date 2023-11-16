'use client'

import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Skeleton } from '../ui/skeleton'
import { HeartIcon, DownloadIcon, Trash } from 'lucide-react'
import { usePostActions } from './hooks/use-post-actions'
import type { Post } from '@/lib/sanity/types/post'

interface PostCardProps {
  post: Post
  loggedInUserID: string
}

export function PostCard({ post, loggedInUserID }: PostCardProps) {
  const { doingAction, handleToggleLikePost, postAlreadyLiked } =
    usePostActions({
      userID: loggedInUserID,
      postID: post._id,
      saved: post.saved
    })

  const isPostByUser = post.postedBy._id === loggedInUserID

  return (
    <article className='flex flex-col gap-5 border border-slate-700 bg-slate-900 p-3 rounded-xl'>
      <header className='flex items-center justify-between'>
        <Link
          className='flex items-center gap-3'
          href={`/user/${post.postedBy._id}`}
          title={`${post.postedBy.userName} profile`}
        >
          <Avatar>
            <AvatarImage className='object-cover' src={post.postedBy.image} />
            <AvatarFallback>
              <span className='text-xs'>{post.postedBy.userName}</span>
            </AvatarFallback>
          </Avatar>
          <h3 className='font-semibold text-slate-300 text-sm lg:text-base truncate max-w-[130px]'>
            {post.postedBy.userTag}
          </h3>
          <span className='sr-only'>
            Go to {post.postedBy.userName} profile
          </span>
        </Link>
        <div className='flex items-center gap-2 text-slate-200'>
          <button
            className={`${
              doingAction ? 'opacity-80' : 'hover:drop-shadow-[0_0_2px_#eee]'
            } ${
              postAlreadyLiked ? 'text-red-500' : ''
            } disabled:text-muted-foreground disabled:cursor-not-allowed
            `}
            aria-label={postAlreadyLiked ? 'Unlike post' : 'Like post'}
            onClick={handleToggleLikePost}
            disabled={doingAction}
          >
            <HeartIcon className='w-5 h-5' />
          </button>
          <a
            className='hover:drop-shadow-[0_0_2px_#eee]'
            aria-label='Download post image'
            download
            href={`?download=${post.image.asset.url}`}
          >
            <DownloadIcon className='w-5 h-5' />
          </a>
          {isPostByUser && (
            <button
              className={`${
                doingAction ? 'opacity-80' : 'hover:drop-shadow-[0_0_2px_#eee]'
              } disabled:cursor-not-allowed disabled:text-muted-foreground`}
              aria-label='Delete post'
              disabled={doingAction}
            >
              <Trash className='w-5 h-5' />
            </button>
          )}
        </div>
      </header>
      <img
        src={post.image.asset.url}
        alt={post.title}
        className='w-full h-auto rounded-xl'
      />
      <p className='text-sm md:text-sm lg:text-base text-slate-300'>
        {post.title}
      </p>
    </article>
  )
}

interface PostCardSkeletonProps {
  width?: number
  height?: number
}

export function PostCardSkeleton({
  width = 300,
  height = 400
}: PostCardSkeletonProps) {
  return (
    <div className='flex flex-col gap-5 p-3' style={{ width, height }}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Skeleton className='w-10 h-10 rounded-full bg-slate-700' />
          <Skeleton className='w-24 h-3 bg-slate-700' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='w-4 h-4 rounded-full bg-slate-700' />
          <Skeleton className='w-4 h-4 rounded-full bg-slate-700' />
          <Skeleton className='w-4 h-4 rounded-full bg-slate-700' />
        </div>
      </div>
      <Skeleton className='bg-slate-700 rounded-md' style={{ width, height }} />
      <Skeleton className='w-[220px] h-6 bg-slate-700' />
    </div>
  )
}

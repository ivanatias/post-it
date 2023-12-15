'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { HeartIcon, DownloadIcon, Trash } from 'lucide-react'
import { usePostActions } from './hooks/use-post-actions'
import type { Post } from '@/lib/sanity/types/post'

interface PostCardProps {
  post: Post
  loggedInUserID: string
}

export function PostCard({ post, loggedInUserID }: PostCardProps) {
  const {
    doingAction,
    handleToggleLikePost,
    handleDeletePost,
    postAlreadyLiked
  } = usePostActions({
    userID: loggedInUserID,
    postID: post._id,
    saved: post.saved
  })

  const router = useRouter()

  const isPostByUser = post.postedBy._id === loggedInUserID

  return (
    <article
      className={`flex flex-col gap-5 border cursor-pointer border-slate-700 bg-slate-800 p-3 rounded-xl
      ${doingAction ? 'animate-pulse' : ''} hover:bg-slate-900 transition-colors
    `}
      onClick={() => {
        router.push(`/post/${post._id}`)
      }}
    >
      <header
        className='flex items-center justify-between'
        onClick={e => {
          e.stopPropagation()
        }}
      >
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
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className={`${
                    doingAction
                      ? 'opacity-80'
                      : 'hover:drop-shadow-[0_0_2px_#eee]'
                  } disabled:cursor-not-allowed disabled:text-muted-foreground`}
                  aria-label='Delete post'
                  disabled={doingAction}
                >
                  <Trash className='w-5 h-5' />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your post.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className='w-full flex items-center justify-center gap-4'>
                  <DialogClose asChild>
                    <Button variant='ghost'>Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant='destructive' onClick={handleDeletePost}>
                      Yes, delete
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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

'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { deletePost } from '@/services/posts'
import { toast } from 'sonner'

export function PostActions({ isModal = false }: { isModal?: boolean }) {
  const [pendingDelete, setPendingDelete] = useState(false)
  const router = useRouter()
  const { id: postID } = useParams()

  const handleDeletePost = () => {
    setPendingDelete(true)

    toast.promise(deletePost(postID as string), {
      loading: 'Deleting post...',
      success: () => {
        if (isModal) {
          router.back()
          router.refresh()
        } else {
          router.push('/')
        }
        setPendingDelete(false)

        return 'Post deleted!'
      },
      error: () => {
        setPendingDelete(false)
        return 'Failed to delete post'
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='disabled:opacity-70 disabled:cursor-not-allowed'
          disabled={pendingDelete}
          variant='destructive'
        >
          Delete post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
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
  )
}

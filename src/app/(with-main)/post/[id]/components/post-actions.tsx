'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PostForm, type PostFormProps } from '@/components/post-form'
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

interface PostActionsProps extends PostFormProps {
  isModal?: boolean
}

export function PostActions({
  isModal = false,
  ...restOfProps
}: PostActionsProps) {
  const [pendingDelete, setPendingDelete] = useState(false)
  const [editingDialogOpen, setEditingDialogOpen] = useState(false)
  const router = useRouter()
  const { id: postID } = useParams()

  const handleDeletePost = () => {
    setPendingDelete(true)

    toast.promise(deletePost(postID as string), {
      loading: 'Deleting post...',
      success: () => {
        if (isModal) {
          router.back()
        } else {
          router.push('/')
        }
        router.refresh()
        setPendingDelete(false)

        return 'Post deleted!'
      },
      error: () => {
        setPendingDelete(false)
        return 'Failed to delete post'
      }
    })
  }

  const afterEdit = () => {
    setEditingDialogOpen(false)
  }

  return (
    <div className='flex flex-wrap items-center justify-center gap-3'>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className='disabled:opacity-70 disabled:cursor-not-allowed'
            disabled={pendingDelete}
            variant='destructive'
            size='sm'
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
      <Dialog open={editingDialogOpen} onOpenChange={setEditingDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            disabled={pendingDelete}
            className='disabled:opacity-70 disabled:cursor-not-allowed'
          >
            Edit post
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit post</DialogTitle>
            <DialogDescription>
              You can edit all information about your post except for the post
              image.
            </DialogDescription>
          </DialogHeader>
          <div className='max-h-[500px] overflow-y-auto'>
            <PostForm afterEdit={afterEdit} {...restOfProps} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

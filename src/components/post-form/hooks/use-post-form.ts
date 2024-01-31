import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPost, editPost } from '@/services/posts'
import { postFormSchema, type PostFormSchema } from '@/lib/schemas/post-form'
import { parseUserID, createImageFileFromURL } from '@/lib/utils'
import { toast } from 'sonner'

export interface UsePostForm {
  initialImageURL?: string
  initialTitle?: string
  initialDescription?: string
  initialCategory?: string
  afterEdit?: () => void
}

export function usePostForm({
  initialImageURL,
  initialTitle,
  initialDescription,
  initialCategory,
  afterEdit
}: UsePostForm) {
  const [previewImageURL, setPreviewImageURL] = useState(initialImageURL ?? '')
  const [downloadingImage, setDownloadingImage] = useState(true)
  const [retryImageDownload, setRetryImageDownload] = useState(false)
  const [downloadImageError, setDownloadImageError] = useState('')

  const router = useRouter()
  const { id: postID } = useParams()
  const { user } = useUser()

  const form = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      image: undefined,
      title: initialTitle ?? '',
      description: initialDescription ?? '',
      category: initialCategory ?? ''
    }
  })

  const isEditing = [
    initialImageURL,
    initialTitle,
    initialDescription,
    initialCategory
  ].every(el => el !== undefined)

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewImageURL)
    }
  }, [previewImageURL])

  useEffect(() => {
    if (!isEditing) return

    setDownloadingImage(true)
    createImageFileFromURL(previewImageURL)
      .then(file => {
        form.setValue('image', file)
      })
      .catch((e: Error) => {
        setDownloadImageError(`${e.message} Try again to edit your post.`)
      })
      .finally(() => {
        setDownloadingImage(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryImageDownload])

  const updatePreviewImageURL = (file?: File) => {
    if (file !== undefined) {
      setPreviewImageURL(URL.createObjectURL(file))
    } else {
      setPreviewImageURL('')
    }
  }

  const onSubmit = async (values: PostFormSchema) => {
    const submitPromise = isEditing
      ? editPost({ values, postID: postID as string })
      : createPost({
          values,
          userID: parseUserID(user?.id as string)
        })

    const successMsg = isEditing ? 'Post edited!' : 'Post created!'

    const errorMsg = isEditing
      ? 'Could not edit post, try again.'
      : 'Could not create post, try again.'

    try {
      await submitPromise
      form.reset()
      setPreviewImageURL('')
      if (isEditing) {
        afterEdit?.()
      } else {
        router.push('/')
      }
      router.refresh()
      toast.success(successMsg)
    } catch {
      toast.error(errorMsg)
    }

    // Required to return so RHK knows when the form is no longer submitting
    return undefined
  }

  const toggleRetryImageDownload = () => {
    setRetryImageDownload(!retryImageDownload)
  }

  const idleMsg = isEditing ? 'Edit post' : 'Create post'
  const pendingMsg = isEditing ? 'Editing post...' : 'Creating post...'
  const isSubmitting = form.formState.isSubmitting

  return {
    form,
    previewImageURL,
    isEditing,
    downloadingImage,
    downloadImageError,
    idleMsg,
    pendingMsg,
    isSubmitting,
    updatePreviewImageURL,
    toggleRetryImageDownload,
    onSubmit
  }
}

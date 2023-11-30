import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPost } from '@/services/posts'
import { postFormSchema, type PostFormSchema } from '@/lib/schemas/post-form'
import { parseUserID } from '@/lib/utils'
import { toast } from 'sonner'

export interface UsePostForm {
  initialImageURL?: string
  initialTitle?: string
  initialDescription?: string
  initialCategory?: string
}

export function usePostForm({
  initialImageURL,
  initialTitle,
  initialDescription,
  initialCategory
}: UsePostForm) {
  const [previewImageURL, setPreviewImageURL] = useState(initialImageURL ?? '')
  const router = useRouter()
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
    const fileObjectURL = previewImageURL

    return () => {
      URL.revokeObjectURL(fileObjectURL)
    }
  }, [previewImageURL])

  const updatePreviewImageURL = (file?: File) => {
    if (file !== undefined) {
      setPreviewImageURL(URL.createObjectURL(file))
    } else {
      setPreviewImageURL('')
    }
  }

  const onSubmit = form.handleSubmit(async (values: PostFormSchema) => {
    await new Promise(resolve => {
      toast.promise(
        createPost({ values, userID: parseUserID(user?.id as string) }),
        {
          loading: 'Creating post...',
          success: () => {
            form.reset()
            setPreviewImageURL('')
            router.push('/')
            resolve(undefined)
            return 'Post created!'
          },
          error: () => {
            resolve(undefined)
            return 'Could not create post, try again.'
          }
        }
      )
    })
  })

  return {
    form,
    previewImageURL,
    isEditing,
    updatePreviewImageURL,
    onSubmit
  }
}

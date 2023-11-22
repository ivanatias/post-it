// For some reason, use client must be used for this module
// to avoid error of type: ReactServerComponentsError
'use client'

import { useFormState } from 'react-dom'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPost } from '../actions'
import { postFormSchema, type PostFormSchema } from '@/lib/schemas/post-form'
import { initialFormState } from '../constants'

export interface UsePostForm {
  action: 'create' | 'edit'
  loggedInUserID: string
  initialImageURL?: string
  initialTitle?: string
  initialDescription?: string
  initialCategory?: string
}

export function usePostForm({
  action,
  loggedInUserID,
  initialImageURL,
  initialTitle,
  initialDescription,
  initialCategory
}: UsePostForm) {
  const [previewImageURL, setPreviewImageURL] = useState(initialImageURL ?? '')

  const form = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      image: undefined,
      title: initialTitle ?? '',
      description: initialDescription ?? '',
      category: initialCategory ?? ''
    }
  })

  const actionFn =
    action === 'create'
      ? createPost
      : async () => {
          return {
            status: 'success',
            message: 'Post created'
          }
        }

  const [formState, formAction] = useFormState(actionFn, initialFormState)

  useEffect(() => {
    const fileObjectURL = previewImageURL

    return () => {
      URL.revokeObjectURL(fileObjectURL)
    }
  }, [previewImageURL])

  const updatePreviewImageURL = (file?: File) => {
    if (file === undefined) return

    setPreviewImageURL(URL.createObjectURL(file))
  }

  const performAction = async (formData: FormData) => {
    const valid = await form.trigger()

    if (valid) {
      formData.append('userID', loggedInUserID)
      formAction(formData)
    }
  }

  return {
    form,
    previewImageURL,
    formState,
    performAction,
    updatePreviewImageURL
  }
}

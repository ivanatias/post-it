// For some reason, use client must be used for this module
// to avoid error of type: ReactServerComponentsError
'use client'

import { useFormState } from 'react-dom'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPost } from '../actions'
import { postFormSchema, type PostFormSchema } from '@/lib/schemas/post-form'
import { parseUserID } from '@/lib/utils'
import { INITIAL_FORM_STATE } from '@/constants/forms'

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

  const form = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      image: undefined,
      title: initialTitle ?? '',
      description: initialDescription ?? '',
      category: initialCategory ?? ''
    }
  })

  const [formState, formAction] = useFormState(createPost, INITIAL_FORM_STATE)

  const { user } = useUser()

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

  const performAction = async (formData: FormData) => {
    const valid = await form.trigger()

    if (valid) {
      formData.append('userID', parseUserID(user?.id as string))
      formAction(formData)
    }
  }

  return {
    form,
    previewImageURL,
    formState,
    isEditing,
    performAction,
    updatePreviewImageURL
  }
}

'use server'

import { client } from '@/lib/sanity/client'
import { postFormSchema } from '@/lib/schemas/post-form'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { FORM_STATUS, type FormStatus } from '@/constants/forms'

export const createPost = async (
  _prevState: any,
  formData: FormData
): Promise<{
  status: FormStatus
  message: string
}> => {
  const data: any = ensureSafePost(formData)

  if (data.status === FORM_STATUS.ERROR) {
    return data
  }

  const userID = formData.get('userID') as string

  try {
    const imageData = await (data.image as File).arrayBuffer()
    const asset = await client.assets.upload('image', Buffer.from(imageData), {
      filename: data.image.name,
      contentType: data.image.type
    })

    const doc = {
      _type: 'post',
      title: data.title,
      description: data.description,
      category: data.category,
      saved: [],
      comments: [],
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id
        }
      },
      userId: userID,
      postedBy: {
        _type: 'postedBy',
        _ref: userID
      }
    }

    await client.create(doc)
  } catch {
    return {
      status: FORM_STATUS.ERROR,
      message: 'Could not create post, try again.'
    }
  }

  revalidatePath('/')
  redirect('/')

  return {
    status: FORM_STATUS.SUCCESS,
    message: 'Post created successfully!'
  }
}

export const editPost = async (_prevState: any, formData: FormData) => {
  const data: any = ensureSafePost(formData)

  if (data.status === FORM_STATUS.ERROR) {
    return data
  }

  const postID = formData.get('postID') as string

  try {
    await client
      .patch(postID)
      .set({
        title: data.title,
        description: data.description,
        category: data.category
      })
      .commit()
  } catch {
    return {
      status: FORM_STATUS.ERROR,
      message: 'Could not edit post, try again.'
    }
  }

  return {
    status: FORM_STATUS.SUCCESS,
    message: 'Post edited successfully!'
  }
}

function ensureSafePost(formData: FormData):
  | {
      status: string
      message: string
    }
  | {
      image: File
      title: string
      category: string
      description?: string
    } {
  const parse = postFormSchema.safeParse({
    image: formData.get('image'),
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category')
  })

  if (!parse.success) {
    return {
      status: FORM_STATUS.ERROR,
      message: 'Invalid inputs'
    }
  }

  return parse.data
}

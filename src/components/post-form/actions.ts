'use server'

import { client } from '@/lib/sanity/client'
import { postFormSchema } from '@/lib/schemas/post-form'
import { FORM_STATUS } from './constants'

export const createPost = async (
  _prevState: any,
  formData: FormData
): Promise<{
  status: (typeof FORM_STATUS)[keyof typeof FORM_STATUS]
  message: string
}> => {
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

  const userID = formData.get('userID') as string

  try {
    const data = parse.data

    const asset = await client.assets.upload('image', data.image, {
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

    return {
      status: FORM_STATUS.SUCCESS,
      message: 'Post created successfully!'
    }
  } catch {
    return {
      status: FORM_STATUS.ERROR,
      message: 'Could not create post, try again.'
    }
  }
}

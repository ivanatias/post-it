'use server'

import { client } from '@/lib/sanity/client'
import { FORM_STATUS, type FormStatus } from '@/constants/forms'
import { getPostCommentsQuery } from '@/lib/sanity/queries'
import { type Comment } from '@/lib/sanity/types/post'

type CommentActionResult = {
  status: FormStatus
  message: string
  payload: Comment[]
}

export const addNewComment = async (
  formData: FormData
): Promise<CommentActionResult> => {
  let actionResult: CommentActionResult = {
    status: 'idle',
    message: '',
    payload: []
  }
  const comment = formData.get('comment') as string
  const postID = formData.get('postID') as string
  const userID = formData.get('userID') as string

  try {
    await client
      .patch(postID)
      .insert('after', 'comments[-1]', [
        {
          _type: 'comment',
          _key: crypto.randomUUID(),
          postedBy: {
            _type: 'postedBy',
            _ref: userID
          },
          comment,
          createdAt: new Date().toISOString()
        }
      ])
      .commit()

    const { comments } = await client.fetch(
      getPostCommentsQuery(postID),
      {},
      {
        cache: 'no-store'
      }
    )

    actionResult = {
      status: FORM_STATUS.SUCCESS,
      message: 'Comment added',
      payload: comments as Comment[]
    }
  } catch {
    actionResult = {
      status: FORM_STATUS.ERROR,
      message: 'Something went wrong adding comment',
      payload: []
    }
  }

  return actionResult
}

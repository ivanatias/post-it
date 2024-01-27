'use server'

import { revalidatePath } from 'next/cache'
import { client } from '@/lib/sanity/client'
import { FORM_STATUS, type FormStatus } from '@/constants/forms'

type CommentActionResult = {
  status: FormStatus
  message: string
}

export const addCommentToPost = async (
  formData: FormData
): Promise<CommentActionResult> => {
  let actionResult: CommentActionResult = {
    status: FORM_STATUS.IDLE,
    message: ''
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

    actionResult = {
      status: FORM_STATUS.SUCCESS,
      message: 'Comment added'
    }
  } catch {
    actionResult = {
      status: FORM_STATUS.ERROR,
      message: 'Something went wrong adding comment'
    }
  }

  revalidatePath(`/post/${postID}`)
  return actionResult
}

export const deleteCommentFromPost = async (
  formData: FormData
): Promise<CommentActionResult> => {
  let actionResult: CommentActionResult = {
    status: FORM_STATUS.IDLE,
    message: ''
  }

  const postID = formData.get('postID') as string
  const commentKey = formData.get('commentKey') as string

  try {
    await client
      .patch(postID)
      .unset([`comments[_key== "${commentKey}"]`])
      .commit()

    actionResult = {
      status: FORM_STATUS.SUCCESS,
      message: 'Comment deleted'
    }
  } catch {
    actionResult = {
      status: FORM_STATUS.ERROR,
      message: 'Something went wrong deleting comment'
    }
  }

  revalidatePath(`/post/${postID}`)
  return actionResult
}

import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

export async function DELETE(request: Request) {
  const { commentKey, postID } = await request.json()

  if (
    commentKey === undefined ||
    postID === undefined ||
    typeof commentKey !== 'string' ||
    typeof postID !== 'string'
  ) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  try {
    await client
      .patch(postID)
      .unset([`comments[_key== "${commentKey}"]`])
      .commit()

    return NextResponse.json({ success: true, deletedCommentKey: commentKey })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

import { client } from '@/lib/sanity/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { postID, userID } = await request.json()

  if (
    postID === undefined ||
    userID === undefined ||
    typeof postID !== 'string' ||
    typeof userID !== 'string'
  ) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  try {
    await client
      .patch(postID)
      .setIfMissing({ saved: [] })
      .insert('after', 'saved[-1]', [
        {
          _key: userID,
          userId: userID,
          postedBy: {
            _type: 'postedBy',
            _ref: userID
          }
        }
      ])
      .commit()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

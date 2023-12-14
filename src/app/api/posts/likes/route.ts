import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import { type PatchOperations } from 'next-sanity'

export async function PATCH(request: Request) {
  const { postID, userID } = await request.json()
  const action = new URL(request.url).searchParams.get('action')
  if (
    typeof postID !== 'string' ||
    typeof userID !== 'string' ||
    typeof action !== 'string' ||
    (action !== 'like' && action !== 'unlike')
  ) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  try {
    const patchConfig = {
      like: {
        insert: {
          after: 'saved[-1]',
          items: [
            {
              _key: userID,
              userId: userID,
              postedBy: {
                _type: 'postedBy',
                _ref: userID
              }
            }
          ]
        }
      },
      unlike: {
        unset: [`saved[_key == "${userID}"]`]
      }
    }

    await client.patch(postID, patchConfig[action] as PatchOperations).commit()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

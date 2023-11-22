import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

export async function DELETE(request: Request) {
  const { postID } = await request.json()

  if (postID === undefined || typeof postID !== 'string') {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  try {
    await client.delete(postID)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

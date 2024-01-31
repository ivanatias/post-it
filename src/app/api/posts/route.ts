import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import { type SanityImageAssetDocument } from 'next-sanity'
import { type PostFormSchema } from '@/lib/schemas/post-form'

export async function POST(request: Request) {
  const formData = await request.formData()

  const image = formData.get('image') as File | null
  const title = formData.get('title') as string | null
  const description = formData.get('description') as string | null
  const category = formData.get('category') as string | null
  const userID = formData.get('userID') as string | null

  if (
    image === null ||
    title === null ||
    description === null ||
    category === null ||
    userID === null
  ) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  try {
    const imageArrBuffer = await image.arrayBuffer()
    const asset = await client.assets.upload(
      'image',
      Buffer.from(imageArrBuffer),
      {
        filename: image.name,
        contentType: image.type
      }
    )

    const dataForDoc = {
      title,
      description,
      category,
      userID,
      asset
    }

    await client.create(generateNewPostDoc(dataForDoc))

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

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

export async function PATCH(request: Request) {
  const { title, description, category, postID } = await request.json()

  if (
    title === undefined ||
    description === undefined ||
    category === undefined ||
    postID === undefined ||
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof category !== 'string' ||
    typeof postID !== 'string'
  ) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  try {
    await client.patch(postID).set({ title, description, category }).commit()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

function generateNewPostDoc(
  data: Omit<PostFormSchema, 'image'> & {
    userID: string
    asset: SanityImageAssetDocument
  }
) {
  return {
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
        _ref: data.asset._id
      }
    },
    userId: data.userID,
    postedBy: {
      _type: 'postedBy',
      _ref: data.userID
    }
  }
}

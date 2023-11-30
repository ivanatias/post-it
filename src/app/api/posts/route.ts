import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import { type SanityImageAssetDocument } from 'next-sanity'
import { postFormSchema, type PostFormSchema } from '@/lib/schemas/post-form'

export async function POST(request: Request) {
  const formData = await request.formData()
  let parsedData: PostFormSchema

  try {
    parsedData = ensureSafePost(formData)
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  try {
    const imageArrBuffer = await parsedData.image.arrayBuffer()
    const asset = await client.assets.upload(
      'image',
      Buffer.from(imageArrBuffer),
      {
        filename: parsedData.image.name,
        contentType: parsedData.image.type
      }
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image, ...restOfData } = parsedData
    const userID = formData.get('userID') as string
    await client.create(generateNewPostDoc({ ...restOfData, asset, userID }))

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

function ensureSafePost(formData: FormData) {
  const data = postFormSchema.parse({
    image: formData.get('image'),
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category')
  })

  return data
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

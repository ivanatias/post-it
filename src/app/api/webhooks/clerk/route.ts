import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { client } from '@/lib/sanity/client'
import { parseUserID } from '@/lib/utils'
import { type WebhookEvent } from '@clerk/nextjs/server'
import { type IdentifiedSanityDocumentStub } from 'next-sanity'

interface UserDoc {
  userName: string
  userTag: string
  image: string
}

export async function POST(request: Request) {
  const { wh, svixId, svixTimestamp, svixSignature } = await validateRequest()
  const body = await request.json()

  let event: WebhookEvent | null = null

  try {
    event = (await wh.verify(JSON.stringify(body), {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature
    })) as WebhookEvent
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error verifying webhook: ${err.message}`)
      return NextResponse.json(
        { message: `Error verifying webhook: ${err.message}` },
        { status: 400 }
      )
    }
  }

  const eventType = (event as WebhookEvent).type

  const {
    first_name: firstName,
    last_name: lastName,
    username,
    id,
    image_url: image
  } = body.data

  const fullName = `${firstName ?? ''} ${lastName ?? ''}`

  try {
    if (eventType === 'user.created') {
      const doc: IdentifiedSanityDocumentStub<UserDoc> = {
        _type: 'user',
        image,
        userTag: username ?? fullName.split(' ').join('').toLocaleLowerCase(),
        userName: fullName.trim() !== '' ? fullName : username,
        _id: parseUserID(id)
      }

      await client.create(doc)
    }

    if (eventType === 'user.updated') {
      await client
        .patch(parseUserID(id))
        .set({
          userName: fullName.trim() !== '' ? fullName : username,
          userTag: username,
          image
        })
        .commit()
    }

    if (eventType === 'user.deleted') {
      await client.delete(parseUserID(id))
    }
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

async function validateRequest() {
  const headersInstance = headers()

  const svixId = headersInstance.get('svix-id')
  const svixTimestamp = headersInstance.get('svix-timestamp')
  const svixSignature = headersInstance.get('svix-signature')

  if (svixId === null || svixTimestamp === null || svixSignature === null) {
    throw new Error('Missing svix headers')
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

  if (webhookSecret === undefined) {
    throw new Error('CLERK_WEBHOOK_SECRET is not defined')
  }

  const wh = new Webhook(webhookSecret)

  return {
    wh,
    svixId,
    svixTimestamp,
    svixSignature
  }
}

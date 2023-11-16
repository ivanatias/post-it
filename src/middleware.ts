import { NextResponse } from 'next/server'
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { decodeJwt } from '@clerk/nextjs/api'
import { client } from './lib/sanity/client'
import { type Jwt } from '@clerk/types'
import { type IdentifiedSanityDocumentStub } from 'next-sanity'

type ExtendedJwt = Jwt & {
  payload: Jwt['payload'] & {
    fullName: string
    firstName: string
    lastName: string
    imageUrl?: string
    hasImage: boolean
  }
}

interface UserDoc {
  userName: string
  userTag: string
  image: string
}

const publicRoutes = ['/login', '/sign-up', '/studio/:path*']

export default authMiddleware({
  publicRoutes,
  afterAuth: async (auth, req) => {
    if (auth.userId === null && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    if (auth.userId !== null && !auth.isPublicRoute) {
      const token = await auth.getToken()

      if (token === null) {
        return redirectToSignIn({ returnBackUrl: req.url })
      }

      const origin = new URL(req.url).origin
      const decodedToken = decodeJwt(token) as ExtendedJwt
      const { fullName, hasImage, imageUrl } = decodedToken.payload

      const userTag = fullName.split(' ').join('').toLocaleLowerCase()
      const id = auth.userId.split('user_').at(1) as string
      const image = hasImage
        ? (imageUrl as string)
        : `${origin}/user-placeholder.png`

      const doc: IdentifiedSanityDocumentStub<UserDoc> = {
        _type: 'user',
        userName: fullName,
        _id: id,
        image,
        userTag
      }

      const userExists =
        (await client.fetch<string | null>(
          `*[_type == "user" && _id == $id][0]._id`,
          { id }
        )) !== null

      userExists ? await client.createOrReplace(doc) : await client.create(doc)
    }

    return NextResponse.next()
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api)(.*)']
}

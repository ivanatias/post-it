import { authMiddleware } from '@clerk/nextjs'

const publicRoutes = [
  '/sign-in',
  '/sign-up',
  '/studio/:path*',
  '/api/webhooks/clerk'
]

export default authMiddleware({
  publicRoutes
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api)(.*)']
}

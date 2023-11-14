import { authMiddleware } from '@clerk/nextjs'

const publicRoutes = ['/login', '/sign-up', '/studio']

export default authMiddleware({
  publicRoutes
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api)(.*)']
}

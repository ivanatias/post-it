'use client'

import { ClientOnly } from '@/components/utils/client-only'
import { SignIn } from '@clerk/nextjs'

export function SignInBox() {
  return (
    <ClientOnly mountAfterMs={1200}>
      <SignIn />
    </ClientOnly>
  )
}

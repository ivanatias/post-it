'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { Spinner } from './spinner'

export function UserAuthButton() {
  const { isLoaded } = useUser()

  if (!isLoaded) return <Spinner />

  return <UserButton afterSignOutUrl='/sign-in' />
}

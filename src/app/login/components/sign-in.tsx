'use client'

import { useEffect, useState } from 'react'
import { SignIn } from '@clerk/nextjs'

export function SignInBox() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true)
    }, 1200)
  }, [])

  if (!isMounted)
    return (
      <img
        src='/logo.svg'
        alt='Post it logo'
        className='animate-pulse'
        width={240}
        height={120}
      />
    )

  return <SignIn />
}

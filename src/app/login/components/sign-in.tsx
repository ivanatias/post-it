'use client'

import { useEffect, useState } from 'react'
import { SignIn } from '@clerk/nextjs'

export function SignInBox() {
  const [showSignIn, setShowSignIn] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowSignIn(true)
    }, 1200)
  }, [])

  if (!showSignIn) {
    return (
      <img
        src='/logo.svg'
        alt='Post it logo'
        width={240}
        height={120}
        className='animate-pulse'
      />
    )
  }

  return <SignIn />
}

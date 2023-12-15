'use client'

import { useEffect, useState } from 'react'
import { SignIn, SignUp } from '@clerk/nextjs'

export function AuthBox({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const [showBox, setShowBox] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowBox(true)
    }, 1000)
  }, [])

  if (!showBox) {
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

  return mode === 'sign-in' ? <SignIn /> : <SignUp />
}

'use client'

import { useEffect, useState } from 'react'

export function Wrapper({ children }: { children: React.ReactNode }) {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowChild(true)
    }, 1000)
  }, [])

  if (!showChild) {
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

  return <>{children}</>
}

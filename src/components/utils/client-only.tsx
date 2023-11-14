'use client'

import { useState, useEffect } from 'react'

interface ClientOnlyProps {
  children: React.ReactNode
  mountAfterMs?: number
}

export function ClientOnly({ children, mountAfterMs }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (mountAfterMs !== undefined) {
      setTimeout(() => {
        setMounted(true)
      }, mountAfterMs)
    }

    setMounted(true)
  }, [mountAfterMs])

  return mounted ? <>{children}</> : null
}

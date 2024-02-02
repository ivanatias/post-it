'use client'

import { useState, useEffect } from 'react'
import { formatTimeago } from '@/lib/utils'

export function Timeago({ date }: { date: Date }) {
  const [, setNow] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000 * 20)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return formatTimeago(date.getTime())
}

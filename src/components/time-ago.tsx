'use client'

import { useState, useEffect } from 'react'
import { formatTimeago } from '@/lib/utils'

export function Timeago({ date }: { date: Date }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_now, setNow] = useState(Date.now())

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

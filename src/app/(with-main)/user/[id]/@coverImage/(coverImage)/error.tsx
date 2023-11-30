'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex flex-col items-center justify-center gap-4 w-full h-[300px]'>
      <img
        src='/no-image-placeholder.png'
        alt='no image'
        width={180}
        height={180}
      />
      <p className='text-muted-foreground text-sm lg:text-base'>
        Error loading cover image...
      </p>
      <Button variant='outline' onClick={reset}>
        Try to load again
      </Button>
    </div>
  )
}

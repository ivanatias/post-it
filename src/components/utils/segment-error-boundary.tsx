import { useEffect } from 'react'
import { Button } from '../ui/button'

export function SegmentErrorBoundary({
  message,
  error,
  reset
}: {
  message: string
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex flex-col items-center gap-6 p-12'>
      <h2 className='text-center text-lg lg:text-xl font-bold text-red-500'>
        {message}
      </h2>
      <Button variant='outline' onClick={reset}>
        Try again
      </Button>
    </div>
  )
}

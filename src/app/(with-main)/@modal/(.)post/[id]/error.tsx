'use client'

import { useEffect } from 'react'
import { Modal } from '@/components/modal'
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
    <Modal>
      <div className='flex flex-col items-center gap-6 p-12'>
        <h2 className='text-center text-lg lg:text-xl font-bold text-red-500'>
          Something went wrong!
        </h2>
        <Button variant='outline' onClick={reset}>
          Try again
        </Button>
      </div>
    </Modal>
  )
}

'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

export function SubmitCommentButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      className='text-xs disabled:opacity-70 disabled:cursor-not-allowed'
      variant='ghost'
      type='submit'
      disabled={pending}
    >
      {pending ? 'Commenting...' : 'Add comment'}
    </Button>
  )
}

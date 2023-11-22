'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../../ui/button'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      className='disabled:opacity-70 disabled:cursor-not-allowed'
      type='submit'
      disabled={pending}
    >
      {pending ? 'Creating post...' : 'Create post'}
    </Button>
  )
}

import { useFormStatus } from 'react-dom'
import { Button, type ButtonProps } from '@/components/ui/button'

type SubmitButtonProps = Omit<
  ButtonProps,
  'className' | 'type' | 'disabled' | 'children'
> & {
  idleText: string
  pendingText: string
}

export function SubmitButton(props: SubmitButtonProps) {
  const { pendingText, idleText, ...restOfProps } = props
  const { pending } = useFormStatus()

  return (
    <Button
      className='text-xs disabled:opacity-70 disabled:cursor-not-allowed'
      type='submit'
      disabled={pending}
      {...restOfProps}
    >
      {pending ? pendingText : idleText}
    </Button>
  )
}

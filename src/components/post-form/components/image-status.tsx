import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'

export function RetrievingImage() {
  return (
    <div className='flex items-center gap-3'>
      <Spinner width={16} />
      <p className='text-muted-foreground text-xs'>Retrieving post image...</p>
    </div>
  )
}

export function ErrorRetrievingImage({
  downloadImageError,
  toggleRetryImageDownload
}: {
  downloadImageError: string
  toggleRetryImageDownload: () => void
}) {
  return (
    <div className='flex flex-col gap-3'>
      <p className='text-red-500 text-xs'>{downloadImageError}</p>
      <Button variant='ghost' onClick={toggleRetryImageDownload}>
        Try again
      </Button>
    </div>
  )
}

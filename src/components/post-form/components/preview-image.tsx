import { ALLOWED_IMAGE_EXTENSIONS } from '@/constants/allowed-image-formats'

export function PreviewImage({ previewImageURL }: { previewImageURL: string }) {
  return (
    <div className='border border-border w-full max-w-lg h-80 rounded-md p-4'>
      {previewImageURL !== '' ? (
        <img
          src={previewImageURL}
          alt='Preview image for post'
          className='w-full h-full object-cover rounded-[11px]'
        />
      ) : (
        <div className='grid place-content-center gap-3 w-full h-full text-xs lg:text-sm text-center text-muted-foreground'>
          <p className='font-semibold'>Upload an image for your post</p>
          <p>Accepted formats: {ALLOWED_IMAGE_EXTENSIONS}</p>
          <p className='underline'>Maximum size of 15 MB</p>
        </div>
      )}
    </div>
  )
}

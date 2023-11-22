export const ALLOWED_IMAGE_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'image/gif',
  'image/tiff'
]

export const ALLOWED_IMAGE_EXTENSIONS = ALLOWED_IMAGE_FORMATS.map(format =>
  format.split('/').at(1)
)
  .join(', ')
  .toUpperCase()

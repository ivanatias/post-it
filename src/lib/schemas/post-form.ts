import * as z from 'zod'

export const postFormSchema = z.object({
  image: z
    .instanceof(File)
    .refine(
      val => {
        const MAX_SIZE = 1.5e7 // 15 MB
        return val.size <= MAX_SIZE
      },
      {
        message: 'Image size should be less than 15 MB'
      }
    )
    .refine(
      val => {
        const ALLOWED_TYPES = [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/gif',
          'image/svg+xml',
          'image/tiff'
        ]
        return ALLOWED_TYPES.includes(val.type)
      },
      {
        message: 'Only JPEG, PNG, WEBP, GIF, SVG, TIFF formats are allowed'
      }
    ),
  title: z.string().min(5, {
    message: 'Title should be at least 5 characters'
  }),
  description: z
    .string()
    .min(10, {
      message: 'Description should be at least 10 characters'
    })
    .optional(),
  category: z.string().refine(
    val => {
      return val.length > 0
    },
    {
      message: 'You must select a category from the list'
    }
  )
})

export type PostFormSchema = z.infer<typeof postFormSchema>

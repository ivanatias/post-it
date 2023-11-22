import * as z from 'zod'
import {
  ALLOWED_IMAGE_FORMATS,
  ALLOWED_IMAGE_EXTENSIONS
} from '@/constants/allowed-image-formats'

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
        return ALLOWED_IMAGE_FORMATS.includes(val.type)
      },
      {
        message: `Only ${ALLOWED_IMAGE_EXTENSIONS} are allowed`
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

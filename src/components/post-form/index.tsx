'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { SubmitButton } from './components/submit-btn'
import { usePostForm, type UsePostForm } from './hooks/use-post-form'
import { FORM_STATUS } from '@/constants/forms'
import { categories } from '@/constants/categories'
import { ALLOWED_IMAGE_EXTENSIONS } from '@/constants/allowed-image-formats'

type PostFormProps = UsePostForm

export function PostForm(props: PostFormProps) {
  const {
    form,
    formState,
    performAction,
    previewImageURL,
    isEditing,
    updatePreviewImageURL
  } = usePostForm(props)

  return (
    <div className='flex flex-col items-center'>
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
      <Form {...form}>
        <form action={performAction} className='w-full flex flex-col gap-8'>
          {isEditing ? null : (
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem className='max-w-sm'>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      name='image'
                      type='file'
                      className='cursor-pointer'
                      onChange={e => {
                        const file = e.target.files?.[0]
                        field.onChange(file)
                        updatePreviewImageURL(file)
                      }}
                    />
                  </FormControl>
                  <FormDescription>The image for your post</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='My amazing vacations!' {...field} />
                </FormControl>
                <FormDescription>Title for your post</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Visiting Norway... Ah! What a beautiful country'
                    {...field}
                  />
                </FormControl>
                <FormDescription>Description for your post</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  name='category'
                  onValueChange={field.onChange}
                  defaultValue=''
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a category for your post' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Post category</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton />
          <p aria-live='polite' className='sr-only'>
            {formState?.message}
          </p>
          {formState?.status === FORM_STATUS.ERROR && (
            <p className='text-red-800 text-xs lg:text-sm'>
              {formState?.message}
            </p>
          )}
        </form>
      </Form>
    </div>
  )
}

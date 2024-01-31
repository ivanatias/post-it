'use client'

import { PreviewImage } from './components/preview-image'
import {
  RetrievingImage,
  ErrorRetrievingImage
} from './components/image-status'
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
import { Button } from '../ui/button'
import { usePostForm, type UsePostForm } from './hooks/use-post-form'
import { categories } from '@/constants/categories'

export type PostFormProps = UsePostForm

export function PostForm(props: PostFormProps) {
  const {
    form,
    previewImageURL,
    isEditing,
    downloadingImage,
    downloadImageError,
    idleMsg,
    pendingMsg,
    isSubmitting,
    updatePreviewImageURL,
    toggleRetryImageDownload,
    onSubmit
  } = usePostForm(props)

  const isRetrievingImage = isEditing && downloadingImage
  const isErrorImage = downloadImageError !== '' && !downloadingImage
  const buttonText = isSubmitting ? pendingMsg : idleMsg

  return (
    <div className='flex flex-col items-center gap-5'>
      <PreviewImage previewImageURL={previewImageURL} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-8'
        >
          <div className='flex flex-col gap-3 mt-2'>
            {isRetrievingImage && <RetrievingImage />}
            {isErrorImage && (
              <ErrorRetrievingImage
                downloadImageError={downloadImageError}
                toggleRetryImageDownload={toggleRetryImageDownload}
              />
            )}
          </div>
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
                    className={`${isEditing ? 'hidden' : ''} cursor-pointer`}
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
                  defaultValue={field.value}
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
          <Button
            className='disabled:opacity-70 disabled:cursor-not-allowed'
            type='submit'
            disabled={isSubmitting}
          >
            {buttonText}
          </Button>
        </form>
      </Form>
    </div>
  )
}

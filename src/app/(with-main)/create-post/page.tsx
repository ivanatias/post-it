import { PostForm } from '@/components/post-form'

export default function CreatePostPage() {
  return (
    <section className='flex flex-col gap-6 max-w-5xl mx-auto'>
      <h1 className='text-4xl lg:text-5xl text-center font-bold'>
        Let&apos;s <span className='text-red-500'>create</span> a cool post!
      </h1>
      <PostForm />
    </section>
  )
}

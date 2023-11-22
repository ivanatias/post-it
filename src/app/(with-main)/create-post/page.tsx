import { currentUser } from '@clerk/nextjs'
import { PostForm } from '@/components/post-form'
import { parseUserID } from '@/lib/utils'

export default async function CreatePostPage() {
  const user = await currentUser()

  return (
    <section className='flex flex-col gap-6 max-w-5xl mx-auto'>
      <h1 className='text-4xl lg:text-5xl text-center font-bold'>
        Let&apos;s <span className='text-red-500'>create</span> a cool post!
      </h1>
      <PostForm
        action='create'
        loggedInUserID={parseUserID(user?.id as string)}
      />
    </section>
  )
}

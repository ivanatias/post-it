import { currentUser } from '@clerk/nextjs'
import { PostForm } from '@/components/post-form'
import { parseUserID } from '@/lib/utils'

export default async function CreatePostPage() {
  const user = await currentUser()

  return (
    <section className='max-w-5xl mx-auto'>
      <PostForm
        action='create'
        loggedInUserID={parseUserID(user?.id as string)}
      />
    </section>
  )
}

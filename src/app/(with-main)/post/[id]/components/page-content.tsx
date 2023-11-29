import Link from 'next/link'
import { notFound } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
import { PostActions } from './post-actions'
import { LikedByBox } from './liked-by-box'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { client } from '@/lib/sanity/client'
import { getPostQuery } from '@/lib/sanity/queries'
import { parseUserID } from '@/lib/utils'
import { type PostDetails } from '@/lib/sanity/types/post'

export async function PostDetailsPageContent({
  postID,
  isModal = false
}: {
  postID: string
  isModal?: boolean
}) {
  const [post, user] = await Promise.all([
    client.fetch<PostDetails | null>(
      getPostQuery(postID),
      {},
      {
        cache: 'no-store'
      }
    ),
    currentUser()
  ])

  if (post === null) {
    notFound()
  }

  const loggedInUserID = parseUserID(user?.id as string)

  const isPostByUser = post.postedBy._id === loggedInUserID

  return (
    <section className='relative flex flex-col gap-8 w-full max-w-5xl mx-auto'>
      <header className='flex flex-col gap-4 items-center w-full'>
        <div className='flex items-center justify-center gap-3 text-lg lg:text-xl font-bold'>
          <p>Posted by</p>
          <Link
            className='flex items-center gap-2'
            href={`/user/${post.postedBy._id}`}
          >
            <Avatar>
              <AvatarImage className='object-cover' src={post.postedBy.image} />
              <AvatarFallback>{post.postedBy.userName}</AvatarFallback>
            </Avatar>
            <p>{post.postedBy.userTag}</p>
          </Link>
        </div>
        <img
          className='w-full h-auto max-w-3xl rounded-2xl'
          src={post.image.asset.url}
          alt={post.title}
        />
        {isPostByUser ? <PostActions isModal={isModal} /> : null}
      </header>
      <div className='flex flex-col gap-4'>
        <h1 className='font-bold'>{post.title}</h1>
        <p className='text-slate-300 font-light'>{post.description}</p>
        <div className='w-fit px-4 py-2 bg-slate-800 rounded-lg text-white font-semibold text-xs'>
          {post.category}
        </div>
      </div>
      <LikedByBox liked={post.saved} />
    </section>
  )
}

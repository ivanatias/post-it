import Link from 'next/link'
import { notFound } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
import { PostActions } from './post-actions'
import { UserAvatar } from '@/components/user-avatar'
import { LikedByBox } from './liked-by-box'
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
    <section className='relative flex flex-col gap-8'>
      <header className='flex flex-col gap-4 items-center w-full'>
        <div className='flex flex-wrap items-center justify-center gap-3 text-lg lg:text-xl font-bold'>
          <p>Posted by</p>
          <Link
            className='flex items-center gap-2'
            href={`/user/${post.postedBy._id}`}
          >
            <UserAvatar
              userName={post.postedBy.userName}
              imageUrl={post.postedBy.image}
              size='lg'
            />
            <p>{post.postedBy.userTag}</p>
          </Link>
        </div>
        <img
          className='w-full h-auto max-w-3xl rounded-2xl'
          src={post.image.asset.url}
          alt={post.title}
        />
        {isPostByUser && (
          <PostActions
            initialTitle={post.title}
            initialDescription={post.description}
            initialCategory={post.category}
            initialImageURL={post.image.asset.url}
            isModal={isModal}
          />
        )}
      </header>
      <div className='flex flex-col gap-4 w-full'>
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

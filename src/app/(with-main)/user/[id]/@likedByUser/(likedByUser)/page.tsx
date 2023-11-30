import { client } from '@/lib/sanity/client'
import { FeedServer } from '@/components/feed/feed-server'
import { getUserInfoQuery } from '@/lib/sanity/queries'
import { type User } from '@/lib/sanity/types/user'

export default async function PostsByUserParallel({
  params
}: {
  params: { id: string }
}) {
  const user = await client.fetch<User | null>(
    getUserInfoQuery(params.id),
    {},
    { cache: 'no-store' }
  )

  if (user === null) {
    return null
  }

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-white font-bold text-lg lg:text-xl'>
        Posts liked by {user.userName}
      </h2>
      <FeedServer type='likedByUser' userID={params.id} />
    </div>
  )
}

import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import { getUserInfoQuery } from '@/lib/sanity/queries'
import { type User } from '@/lib/sanity/types/user'

export default async function UserProfilePage({
  params
}: {
  params: { id: string }
}) {
  const user = await client.fetch<User | null>(
    getUserInfoQuery(params.id),
    {},
    {
      cache: 'no-store'
    }
  )

  if (user === null) {
    notFound()
  }

  return (
    <section className='flex flex-col items-center gap-5'>
      <div className='w-[150px] h-[150px] rounded-full p-1 border border-slate-400'>
        <img
          src={user.image}
          alt={`${user.userName} profile avatar`}
          className='w-full h-full rounded-full object-cover'
        />
      </div>
      <h1 className='text-2xl lg:text-3xl text-center font-bold'>
        {user.userName}
      </h1>
    </section>
  )
}

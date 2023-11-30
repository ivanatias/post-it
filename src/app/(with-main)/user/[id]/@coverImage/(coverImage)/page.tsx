import { client } from '@/lib/sanity/client'
import { getUserInfoQuery } from '@/lib/sanity/queries'
import { type User } from '@/lib/sanity/types/user'

export default async function CoverImageParallel({
  params
}: {
  params: { id: string }
}) {
  const [user, res] = await Promise.all([
    client.fetch<User | null>(
      getUserInfoQuery(params.id),
      {},
      { cache: 'no-store' }
    ),
    fetch(
      'https://api.unsplash.com/photos/random?orientation=landscape&query=nature',
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
        },
        next: {
          revalidate: 60
        }
      }
    )
  ])

  if (user === null) {
    return null
  }

  if (!res.ok) {
    throw new Error('Failed to fetch image')
  }

  const photo = await res.json()

  return (
    <div className='w-full h-[300px]'>
      <img
        src={photo.urls.regular}
        alt={photo.alt_description}
        className='w-full h-full object-cover'
      />
    </div>
  )
}

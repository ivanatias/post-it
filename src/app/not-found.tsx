import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='grid place-content-center h-screen gap-2'>
      <img src='/logo.svg' width={240} height={120} alt='Post it logo' />
      <h1 className='text-xl lg:text-2xl text-center font-bold'>
        Page not found
      </h1>
      <Link className='underline text-center' href='/'>
        Go back to main page
      </Link>
    </div>
  )
}

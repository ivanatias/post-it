import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center gap-2'>
      <h1 className='text-xl lg:text-2xl text-center font-bold'>
        Such user doesn&apos;t exist!
      </h1>
      <Link className='underline text-center' href='/'>
        Go back to main page
      </Link>
    </div>
  )
}

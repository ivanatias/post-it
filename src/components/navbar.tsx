import Link from 'next/link'
import { UserAuthButton } from './user-auth-btn'
import { MobileWidgets } from './mobile-widgets'
import { Search } from './search'
import { SearchIcon, PlusIcon } from './icons'

export function Navbar() {
  return (
    <nav className='relative flex items-center justify-between w-full gap-3 px-6 py-3 bg-black backdrop-blur-md lg:px-12'>
      <img src='/logo.svg' alt='Post it logo' width={140} height={80} />
      <div className='text-slate-400 hidden md:flex md:flex-1 md:gap-2 md:items-center'>
        <SearchIcon />
        <Search className='w-full max-w-2xl' />
      </div>
      <div className='flex items-center gap-4'>
        <UserAuthButton />
        <MobileWidgets />
        <Link href='/create-post' title='Create post' className='text-red-500'>
          <PlusIcon />
          <span className='sr-only'>Create post</span>
        </Link>
      </div>
    </nav>
  )
}

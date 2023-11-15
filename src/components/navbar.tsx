import Link from 'next/link'
import { UserAuthButton } from './user-auth-btn'
import { MobileWidgets } from './mobile-widgets'
import { Search } from './search'
import { PlusIcon, SearchIcon } from 'lucide-react'

export function Navbar() {
  return (
    <nav className='relative flex items-center justify-between w-full gap-3 py-3'>
      <img src='/logo.svg' alt='Post it logo' width={140} height={80} />
      <div className='text-muted-foreground hidden md:flex md:flex-1 md:gap-2 md:items-center'>
        <SearchIcon />
        <Search className='w-full max-w-2xl' />
      </div>
      <div className='flex items-center gap-4'>
        <UserAuthButton />
        <MobileWidgets />
        <Link href='/create-post' title='Create post' className='text-red-500'>
          <PlusIcon className='hover:drop-shadow-[0_0_2px_#ff0000] w-6 h-6' />
          <span className='sr-only'>Create post</span>
        </Link>
      </div>
    </nav>
  )
}

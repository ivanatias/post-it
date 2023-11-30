import Link from 'next/link'
import { UserAuthButton } from './user-auth-btn'
import { MobileWidgets } from './mobile-widgets'
import { Search } from './search'
import { PlusIcon, SearchIcon } from 'lucide-react'

export function Navbar() {
  return (
    <nav className='relative flex items-center justify-between w-full gap-3 py-3'>
      <Link href='/'>
        <img src='/logo.svg' alt='Post it logo' width={140} height={80} />
      </Link>
      <div className='text-muted-foreground hidden lg:flex lg:flex-1 lg:gap-2 lg:items-center'>
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

import Link from 'next/link'
import { MobileWidgets } from './mobile-widgets'
import { Search } from './search'
import { SearchIcon, PlusIcon } from './icons'

export function Navbar() {
  return (
    <nav className='relative flex items-center justify-between w-full gap-3 px-6 py-3 bg-black/20 backdrop-blur-md md:px-10 lg:px-12'>
      <MobileWidgets />
      <img src='/logo.svg' alt='Post it logo' width={140} height={80} />
      <div className='text-slate-400 hidden md:flex md:flex-1 md:gap-3 md:items-center md:justify-center'>
        <SearchIcon />
        <Search className='w-full max-w-lg' />
      </div>
      <Link href='/create-post' title='Create post' className='text-red-500'>
        <PlusIcon />
        <span className='sr-only'>Create post</span>
      </Link>
    </nav>
  )
}

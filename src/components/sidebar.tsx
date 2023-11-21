'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Spinner } from './spinner'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { categories } from '@/constants/categories'
import { parseUserID } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  closeSidebar?: () => void
}

function NavLink({ href, children, closeSidebar }: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={`font-semibold text-xs md:text-sm transition-colors duration-100 ease-in-out hover:text-red-400 last:mt-2 ${
        pathname === href ? 'text-red-400 font-bold' : ''
      }`}
      onClick={closeSidebar}
    >
      {children}
    </Link>
  )
}

export function Sidebar({ closeSidebar }: { closeSidebar?: () => void }) {
  const { user, isLoaded } = useUser()

  const parsedUserID = isLoaded ? parseUserID(user?.id as string) : ''

  return (
    <aside className='text-slate-300 flex-col items-center border-r lg:border-r-slate-800 border-r-slate-700 w-full h-full p-5 overflow-y-auto shadow-md hide-scrollbar lg:bg-slate-950/30 bg-slate-950 lg:h-screen lg:w-56 lg:justify-start'>
      <div className='flex items-center justify-center h-24 mb-5'>
        {isLoaded ? (
          <NavLink href={`/user/${parsedUserID}`} closeSidebar={closeSidebar}>
            <Image
              alt={`${user?.fullName} avatar image`}
              src={user?.imageUrl as string}
              width={80}
              height={80}
              objectFit='cover'
              className='rounded-full cursor-pointer'
            />
          </NavLink>
        ) : (
          <Spinner width={80} />
        )}
      </div>
      <h2 className='h-[50px] my-3 text-base lg:text-lg font-bold text-center text-white'>
        {user?.fullName}
      </h2>
      <div className='flex flex-col items-center gap-4'>
        <NavLink href={`/user/${parsedUserID}`} closeSidebar={closeSidebar}>
          Profile
        </NavLink>
        <NavLink href='/' closeSidebar={closeSidebar}>
          Home
        </NavLink>
        <div className='mt-5 flex flex-col items-center justify-center w-full gap-4'>
          <h2 className='font-bold text-center text-white'>Discover</h2>
          <div className='flex flex-col items-center justify-center w-full gap-3 font-semibold'>
            {categories.map(category => (
              <NavLink
                key={category.name}
                href={`/category/${category.name.toLowerCase()}`}
                closeSidebar={closeSidebar}
              >
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

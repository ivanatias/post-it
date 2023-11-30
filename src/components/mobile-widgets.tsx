'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { Search } from './search'
import { MenuIcon, SearchIcon, PlusIcon } from 'lucide-react'

export function MobileWidgets() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchBoxOpen, setSearchBoxOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const toggleSearchBox = () => {
    setSearchBoxOpen(!searchBoxOpen)
  }

  return (
    <div className='flex lg:hidden text-white'>
      <div className='flex items-center gap-4'>
        <button aria-label='Open menu' onClick={toggleMenu}>
          <MenuIcon className='hover:drop-shadow-[0_0_2px_#eee]' />
        </button>
        <button aria-label='Open search box' onClick={toggleSearchBox}>
          <SearchIcon className='hover:drop-shadow-[0_0_2px_#eee]' />
        </button>
      </div>
      {menuOpen && <MobileMenu closeMenu={toggleMenu} />}
      {searchBoxOpen && <SearchBox closeSearchBox={toggleSearchBox} />}
    </div>
  )
}

interface MobileMenuProps {
  closeMenu: () => void
}

function MobileMenu({ closeMenu }: MobileMenuProps) {
  return (
    <div className='flex z-10 animate-fade-right animate-once animate-duration-300 animate-ease-in-out fixed top-0 left-0 lg:hidden w-full h-screen'>
      <div className='relative flex flex-col flex-[0.4]'>
        <button
          aria-label='Close menu'
          className='absolute right-5 top-7'
          onClick={closeMenu}
        >
          <PlusIcon className='hover:drop-shadow-[0_0_2px_#eee] rotate-45 w-6 h-6' />
        </button>
        <Sidebar closeSidebar={closeMenu} />
      </div>
      <div className='bg-black/80 flex-[0.6]' />
    </div>
  )
}

interface SearchBoxProps {
  closeSearchBox: () => void
}

function SearchBox({ closeSearchBox }: SearchBoxProps) {
  return (
    <div className='flex items-center justify-center gap-4 p-10 absolute top-0 left-0 bg-slate-950 w-full animate-fade-down animate-duration-300 animate-ease-in-out'>
      <button
        className='text-white'
        aria-label='Close search box'
        onClick={closeSearchBox}
      >
        <PlusIcon className='hover:drop-shadow-[0_0_2px_#eee] rotate-45 w-6 h-6' />
      </button>
      <Search onSearch={closeSearchBox} className='w-full max-w-xs' />
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { Search } from './search'
import { CloseIcon, MenuIcon, SearchIcon } from './icons'

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
    <div className='flex md:hidden text-white'>
      <div className='flex items-center gap-5'>
        <button aria-label='Open menu' onClick={toggleMenu}>
          <MenuIcon />
        </button>
        <button aria-label='Open search box' onClick={toggleSearchBox}>
          <SearchIcon />
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
    <div className='flex z-10 animate-fade-right animate-once animate-duration-300 animate-ease-in-out fixed top-0 left-0 md:hidden w-full h-screen'>
      <div className='relative flex flex-col flex-[0.6]'>
        <button
          aria-label='Close menu'
          className='absolute right-5 top-7'
          onClick={closeMenu}
        >
          <CloseIcon />
        </button>
        <Sidebar closeSidebar={closeMenu} />
      </div>
      <div className='bg-black/80 flex-[0.4]' />
    </div>
  )
}

interface SearchBoxProps {
  closeSearchBox: () => void
}

function SearchBox({ closeSearchBox }: SearchBoxProps) {
  return (
    <div className='flex items-center justify-center gap-4 p-10 absolute top-0 left-0 border-b border-b-slate-800 bg-slate-950 w-full animate-fade-down animate-duration-300 animate-ease-in-out'>
      <button
        className='text-white'
        aria-label='Close search box'
        onClick={closeSearchBox}
      >
        <CloseIcon />
      </button>
      <Search onSearch={closeSearchBox} className='w-full max-w-xs' />
    </div>
  )
}

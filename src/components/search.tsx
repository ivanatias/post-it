'use client'

import { useRouter } from 'next/navigation'

interface SearchProps {
  onSearch?: () => void
  className?: string
}

export function Search({ onSearch, className }: SearchProps) {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchTerm = e.currentTarget.search.value

    if (searchTerm.trim() === '') return

    onSearch?.()
    e.currentTarget.reset()
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <form role='searchbox' onSubmit={handleSearch} className={className}>
      <input
        name='search'
        className='text-white text-sm bg-transparent w-full p-2 border border-gray-700 rounded-md outline-none focus-within:shadow focus-within:shadow-gray-600 placeholder:text-sm placeholder:text-gray-500'
        placeholder='Looking for something?'
      />
    </form>
  )
}

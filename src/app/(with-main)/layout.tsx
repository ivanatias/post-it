import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='flex'>
        <div className='hidden md:flex'>
          <Sidebar />
        </div>
        <div className='flex flex-col w-full h-screen'>
          <header>
            <Navbar />
          </header>
          <main className='relative pt-16 px-6 lg:px-12 pb-12 overflow-y-auto hide-scrollbar'>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

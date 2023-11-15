import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='flex'>
        <div className='hidden md:flex'>
          <Sidebar />
        </div>
        <div className='flex flex-col w-full h-screen max-w-7xl mx-auto px-6 lg:px-12'>
          <header>
            <Navbar />
          </header>
          <main className='relative py-12 w-full overflow-y-auto hide-scrollbar'>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

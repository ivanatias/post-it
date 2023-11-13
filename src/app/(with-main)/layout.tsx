import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='flex'>
        <div className='hidden md:flex'>
          <Sidebar />
        </div>
        <div className='flex flex-col w-full'>
          <header>
            <Navbar />
          </header>
          <main className='pt-16 px-7 w-full h-screen overflow-y-scroll hide-scrollbar'>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

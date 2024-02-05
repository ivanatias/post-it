import { Navbar } from '@/components/navigation/navbar'
import { Sidebar } from '@/components/navigation/sidebar'

export default function Layout({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className='relative lg:flex'>
      <div className='hidden lg:flex'>
        <Sidebar />
      </div>
      <div className='flex flex-col w-full h-screen max-w-7xl overflow-y-auto mx-auto px-4 lg:px-8'>
        <header>
          <Navbar />
        </header>
        <main className='relative py-12 w-full'>{children}</main>
      </div>
      {modal}
    </div>
  )
}

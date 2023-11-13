import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { AuthProvider } from '@/components/auth-provider'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600'] })

export const metadata: Metadata = {
  title: 'Post it',
  description: 'Social media app to share all the photos you want'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${montserrat.className} overflow-y-hidden`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

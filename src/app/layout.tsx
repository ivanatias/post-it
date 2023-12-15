import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import { dark } from '@clerk/themes'
import './globals.css'

const opensans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700']
})

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
    <html lang='en' className='dark'>
      <body className={`${opensans.className} overflow-y-hidden`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: '#dc2626',
              colorInputBackground: '#0f172a',
              colorBackground: '#0f172a',
              fontSize: '16px',
              fontFamily: 'Open Sans'
            }
          }}
        >
          {children}
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  )
}

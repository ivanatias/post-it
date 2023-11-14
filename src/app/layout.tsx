import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
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
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: 'red',
              colorBackground: '#0C090A',
              fontSize: '20px',
              fontFamily: 'Montserrat'
            }
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}

'use client'

import Masonry from 'react-layout-masonry'
import { ClientOnly } from './client-only'

export function MasonryLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly>
      <Masonry columns={{ 320: 1, 640: 2, 1280: 3, 1536: 4 }} gap={24}>
        {children}
      </Masonry>
    </ClientOnly>
  )
}

'use client'

import Masonry from 'react-layout-masonry'
import { ClientOnly } from './client-only'

export function MasonryLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly>
      <Masonry columns={{ 420: 1, 768: 2, 1280: 3, 1536: 4 }} gap={24}>
        {children}
      </Masonry>
    </ClientOnly>
  )
}

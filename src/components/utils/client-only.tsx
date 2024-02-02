'use client'

import { useClientOnly } from '@/hooks/use-client-only'

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ClientOnly({ children, fallback }: ClientOnlyProps) {
  const isClient = useClientOnly()

  return isClient ? <>{children}</> : <>{fallback ?? null}</>
}

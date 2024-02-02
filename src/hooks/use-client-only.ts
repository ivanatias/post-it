import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

export function useClientOnly() {
  const value = useSyncExternalStore(
    emptySubscribe,
    () => 'client',
    () => 'server'
  )

  return value === 'client'
}

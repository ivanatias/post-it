'use client'

import { useCallback, useRef, useEffect, type MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'

export function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick: MouseEventHandler = useCallback(
    e => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        onDismiss()
      }
    },
    [onDismiss, overlay, wrapper]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className='grid place-content-center z-50 inset-0 bg-black/80 px-4 absolute'
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className='bg-slate-950 border border-border rounded-lg overflow-y-auto max-h-[640px]'
      >
        {children}
      </div>
    </div>
  )
}

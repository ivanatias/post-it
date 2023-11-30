'use client'

import { SegmentErrorBoundary } from '@/components/utils/segment-error-boundary'

export default function Error(props: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <SegmentErrorBoundary {...props} message="Error loading user's data" />
}

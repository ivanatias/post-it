import { Skeleton } from '@/components/ui/skeleton'

interface PostCardSkeletonProps {
  width?: number
  height?: number
}

export function PostCardSkeleton({
  width = 300,
  height = 400
}: PostCardSkeletonProps) {
  return (
    <div className='flex flex-col gap-5 p-3' style={{ width, height }}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Skeleton className='w-10 h-10 rounded-full bg-slate-700' />
          <Skeleton className='w-24 h-3 bg-slate-700' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='w-4 h-4 rounded-full bg-slate-700' />
          <Skeleton className='w-4 h-4 rounded-full bg-slate-700' />
          <Skeleton className='w-4 h-4 rounded-full bg-slate-700' />
        </div>
      </div>
      <Skeleton className='bg-slate-700 rounded-md' style={{ width, height }} />
      <Skeleton className='w-[220px] h-6 bg-slate-700' />
    </div>
  )
}

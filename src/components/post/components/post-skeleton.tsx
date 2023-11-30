import { Skeleton } from '@/components/ui/skeleton'

export function PostCardSkeleton() {
  return (
    <div className='flex flex-col gap-5 p-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Skeleton className='w-10 h-10 rounded-full bg-slate-700' />
          <Skeleton className='w-24 h-3' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='w-4 h-4 rounded-full bg-slate-700' />
          <Skeleton className='w-4 h-4 rounded-full bg-slate-700' />
          <Skeleton className='w-4 h-4 rounded-full bg-slate-700' />
        </div>
      </div>
      <Skeleton className='rounded-md w-[280px] h-[300px] sm:w-[200px] sm:h-[380px] md:w-[340px] md:h-[400px] lg:w-[260px]' />
      <Skeleton className='w-[220px] h-6 bg-slate-700' />
    </div>
  )
}

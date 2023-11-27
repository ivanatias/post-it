import { Skeleton } from '@/components/ui/skeleton'

export function PostPageSkeleton() {
  return (
    <div className='flex flex-col gap-8 px-6 py-10 w-full mx-auto'>
      <div className='flex flex-col gap-4 items-center w-full'>
        <div className='flex items-center justify-center gap-3'>
          <Skeleton className='w-28 h-5' />
          <div className='flex items-center gap-2'>
            <Skeleton className='w-10 h-10 rounded-full' />
            <Skeleton className='w-24 h-5' />
          </div>
        </div>
        <Skeleton className='w-[280px] md:w-[640px] lg:w-[840px] h-[220px] md:h-[380px] lg:h-[500px] rounded-2xl' />
      </div>
      <div className='flex flex-col gap-4'>
        <Skeleton className='w-28 h-5' />
        <Skeleton className='w-40 h-5' />
        <div className='w-fit px-4 py-2 bg-slate-800 rounded-lg'>
          <Skeleton className='w-14 h-5' />
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <div className='flex items-center'>
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`w-8 h-8 rounded-full ${i > 0 ? '-ml-2' : ''}`}
            />
          ))}
        </div>
        <Skeleton className='w-60 h-5' />
      </div>
    </div>
  )
}

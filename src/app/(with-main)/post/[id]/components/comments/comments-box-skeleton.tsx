import { Skeleton } from '@/components/ui/skeleton'

export function CommentsBoxSkeleton() {
  return (
    <div className='flex flex-col gap-12 border border-border rounded-2xl p-6'>
      <div className='flex flex-col gap-5 h-[350px] overflow-y-auto'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <Skeleton className='w-8 h-8 rounded-full' />
              <Skeleton className='w-20 h-5' />
            </div>
            <div className='flex flex-col gap-3'>
              <Skeleton className='h-9 rounded-3xl w-36 sm:w-64' />
              <Skeleton className='w-16 h-3' />
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-5 sm:flex-row sm:gap-3 w-full'>
        <div className='flex flex-1 flex-shrink-0 items-center gap-4'>
          <Skeleton className='w-6 h-6 rounded-full' />
          <Skeleton className='w-full h-24 rounded-md' />
        </div>
        <Skeleton className='w-16 h-6 self-center sm:self-start' />
      </div>
    </div>
  )
}

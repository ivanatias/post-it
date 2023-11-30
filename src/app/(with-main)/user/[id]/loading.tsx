import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='flex flex-col items-center gap-5'>
      <Skeleton className='w-[150px] h-[150px] rounded-full' />
      <Skeleton className='w-28 h-5' />
    </div>
  )
}

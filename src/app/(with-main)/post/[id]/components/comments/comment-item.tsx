import { UserAvatar } from '@/components/user-avatar'
import { Timeago } from '@/components/time-ago'
import { Trash } from 'lucide-react'
import { type OptimisticComment } from '../../hooks/use-comments'

export function CommentItem({
  comment,
  deleteComment,
  isOwnComment
}: {
  comment: OptimisticComment
  deleteComment: (formData: FormData) => Promise<void>
  isOwnComment: boolean
}) {
  const { _key: key, comment: text, postedBy, createdAt, sending } = comment

  return (
    <li className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <UserAvatar userName={postedBy.userName} imageUrl={postedBy.image} />
        <p className='text-xs lg:text-sm font-bold'>{postedBy.userTag}</p>
        {isOwnComment && (
          <form action={deleteComment}>
            <input type='hidden' name='commentKey' value={key} />
            <button
              className='disabled:opacity-70 disabled:cursor-not-allowed'
              type='submit'
              aria-label='Delete comment'
              disabled={sending}
            >
              <Trash className='w-4 h-4 text-red-500' />
            </button>
          </form>
        )}
      </div>
      <div className='flex flex-col gap-3'>
        <div
          className={`
            bg-slate-800 text-white text-xs lg:text-sm rounded-3xl p-3 w-fit min-w-[60px]
            ${sending === true ? 'animate-pulse' : ''}
          `}
        >
          {text}
        </div>
        <time className='text-xs text-muted-foreground'>
          <Timeago date={new Date(createdAt)} />
        </time>
      </div>
    </li>
  )
}

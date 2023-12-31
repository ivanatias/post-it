'use client'

import { SubmitCommentButton } from './submit-btn'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Trash } from 'lucide-react'
import { useComments, type UseComments } from '../../hooks/use-comments'
import { formatTimeago } from '@/lib/utils'

type CommentsBoxProps = UseComments

export function CommentsBox({ comments, loggedInUser }: CommentsBoxProps) {
  const {
    optimisticComments,
    isPendingDelete,
    postID,
    commentFormAction,
    deleteComment,
    commentsBoxRef,
    commentsFormRef,
    commentsInputRef
  } = useComments({ comments, loggedInUser })

  return (
    <section className='flex flex-col gap-12 border border-border rounded-2xl p-6'>
      {optimisticComments.length === 0 ? (
        <p className='text-muted-foreground text-xs lg:text-sm'>
          There are no comments, be the first to comment something!
        </p>
      ) : (
        <ul
          ref={commentsBoxRef}
          className='flex flex-col gap-5 max-h-[500px] overflow-y-auto'
        >
          {optimisticComments.map(item => (
            <li key={item._key} className='flex flex-col gap-4'>
              <div className='flex items-center gap-2'>
                <Avatar className='w-8 h-8'>
                  <AvatarImage
                    className='object-cover'
                    src={item.postedBy.image}
                  />
                  <AvatarFallback>
                    <span className='text-xs'>{item.postedBy.userName}</span>
                  </AvatarFallback>
                </Avatar>
                <p className='text-xs lg:text-sm font-bold'>
                  {item.postedBy.userTag}
                </p>
                {item.postedBy._id === loggedInUser.id && (
                  <button
                    onClick={() => {
                      deleteComment({
                        commentKey: item._key,
                        postID: postID as string
                      })
                    }}
                    aria-label='Delete comment'
                    disabled={item.sending || isPendingDelete}
                    className='disabled:opacity-70 disabled:cursor-not-allowed'
                  >
                    <Trash className='w-4 h-4 text-red-500' />
                  </button>
                )}
              </div>
              <div className='flex flex-col gap-3'>
                <div
                  className={`bg-slate-800 text-white text-xs lg:text-sm rounded-3xl p-3 w-fit min-w-[60px]
                    ${item.sending ? 'animate-pulse' : ''}
                  `}
                >
                  {item.comment}
                </div>
                <time className='text-xs text-muted-foreground'>
                  {formatTimeago(new Date(item.createdAt).getTime())}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
      <form
        className='flex flex-col gap-5 sm:flex-row sm:gap-3 w-full'
        ref={commentsFormRef}
        action={commentFormAction}
      >
        <div className='flex flex-1 flex-shrink-0 items-center gap-4'>
          <Avatar className='w-6 h-6'>
            <AvatarImage className='object-cover' src={loggedInUser.image} />
            <AvatarFallback>
              <span className='text-xs'>{loggedInUser.fullUsername}</span>
            </AvatarFallback>
          </Avatar>
          <Textarea
            ref={commentsInputRef}
            name='comment'
            placeholder='Add a comment'
            defaultValue=''
          />
        </div>
        <SubmitCommentButton />
      </form>
    </section>
  )
}

'use client'

import { CommentItem } from './comment-item'
import { SubmitButton } from '@/components/submit-btn'
import { UserAvatar } from '@/components/user-avatar'
import { Textarea } from '@/components/ui/textarea'
import { useComments, type UseComments } from '../../hooks/use-comments'

type CommentsBoxProps = UseComments

export function CommentsBox({ comments, loggedInUser }: CommentsBoxProps) {
  const {
    optimisticComments,
    addComment,
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
          {optimisticComments.map(comment => (
            <CommentItem
              key={comment._key}
              comment={comment}
              deleteComment={deleteComment}
              isOwnComment={comment.postedBy._id === loggedInUser.id}
            />
          ))}
        </ul>
      )}
      <form
        className='flex flex-col gap-5 sm:flex-row sm:gap-3 w-full'
        ref={commentsFormRef}
        action={addComment}
      >
        <div className='flex flex-1 flex-shrink-0 items-center gap-4'>
          <UserAvatar
            userName={loggedInUser.fullUsername}
            imageUrl={loggedInUser.image}
          />
          <Textarea
            ref={commentsInputRef}
            name='comment'
            placeholder='Add a comment'
            defaultValue=''
          />
        </div>
        <SubmitButton idleText='Add comment' pendingText='Adding comment...' />
      </form>
    </section>
  )
}

import { Suspense } from 'react'
import { Comments } from '@/app/(with-main)/post/[id]/components/comments'
import { CommentsBoxSkeleton } from '@/app/(with-main)/post/[id]/components/comments/comments-box-skeleton'

export default function CommentsParallel({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams?: { update: string }
}) {
  return (
    /*
    The solution below to update comments when a user deletes a comment 
    is not optimal and is just a workaround while the bug described
    here: https://github.com/vercel/next.js/issues/54173 
    regarding parallel + intercepting routes and revalidation methods 
    such as router.refresh() and revalidatePath() gets solved.
    */
    <Suspense key={searchParams?.update} fallback={<CommentsBoxSkeleton />}>
      <Comments postID={params.id} />
    </Suspense>
  )
}

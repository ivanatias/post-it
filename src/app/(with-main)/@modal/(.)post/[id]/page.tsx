import { Suspense } from 'react'
import { PostDetailsPageContent } from '@/app/(with-main)/post/[id]/components/page-content'
import { PostPageSkeleton } from '@/app/(with-main)/post/[id]/components/page-content-skeleton'
import { Comments } from '@/app/(with-main)/post/[id]/components/comments'
import { Modal } from '@/components/modal'

export default function PostPageModal({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: Record<string, string>
}) {
  return (
    <Modal>
      <div className='flex flex-col gap-6 px-6 py-10'>
        <Suspense fallback={<PostPageSkeleton />}>
          <PostDetailsPageContent postID={params.id} />
        </Suspense>
        {/*
          The solution below to update comments when a user deletes a comment 
          is not optimal and is just a workaround while the bug described
          here: https://github.com/vercel/next.js/issues/54173 
          regarding parallel + intercepting routes and revalidation methods 
          such as router.refresh() and revalidatePath() is not solved.
        */}
        <Suspense
          key={searchParams.update}
          fallback={<p>Loading comments...</p>}
        >
          <Comments postID={params.id} />
        </Suspense>
      </div>
    </Modal>
  )
}

import { Suspense } from 'react'
import { PostDetailsPageContent } from '@/app/(with-main)/post/[id]/components/page-content'
import { PostPageSkeleton } from '@/app/(with-main)/post/[id]/components/page-content-skeleton'
import { Comments } from '@/app/(with-main)/post/[id]/components/comments'
import { Modal } from '@/components/modal'

export default function PostPageModal({ params }: { params: { id: string } }) {
  return (
    <Modal>
      <div className='flex flex-col gap-6 px-6 py-10'>
        <Suspense fallback={<PostPageSkeleton />}>
          <PostDetailsPageContent postID={params.id} />
        </Suspense>
        <Suspense fallback={<p>Loading comments...</p>}>
          <Comments postID={params.id} />
        </Suspense>
      </div>
    </Modal>
  )
}

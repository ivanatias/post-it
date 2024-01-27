import { Comments } from '@/app/(with-main)/post/[id]/components/comments'

export default function CommentsParallel({
  params
}: {
  params: { id: string }
}) {
  return <Comments postID={params.id} />
}

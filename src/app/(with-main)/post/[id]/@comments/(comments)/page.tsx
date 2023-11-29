import { Comments } from '../../components/comments'

export default function CommentsParallel({
  params
}: {
  params: { id: string }
}) {
  return <Comments postID={params.id} />
}

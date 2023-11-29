import { PostDetailsPageContent } from '@/app/(with-main)/post/[id]/components/page-content'

export default function PostPageModal({ params }: { params: { id: string } }) {
  return <PostDetailsPageContent isModal postID={params.id} />
}

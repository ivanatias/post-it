import { PostDetailsPageContent } from './components/page-content'

export default function PostPage({ params }: { params: { id: string } }) {
  return <PostDetailsPageContent postID={params.id} />
}

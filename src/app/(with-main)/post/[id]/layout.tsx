export default function PostDetailsPageLayout({
  children,
  comments
}: {
  children: React.ReactNode
  comments: React.ReactNode
}) {
  return (
    <section className='flex flex-col gap-6 max-w-5xl mx-auto'>
      {children}
      {comments}
    </section>
  )
}

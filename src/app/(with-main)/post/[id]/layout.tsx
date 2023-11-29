export default function PostDetailsPageLayout({
  children,
  comments
}: {
  children: React.ReactNode
  comments: React.ReactNode
}) {
  return (
    <section className='flex flex-col gap-6'>
      {children}
      <div className='px-10'>{comments}</div>
    </section>
  )
}

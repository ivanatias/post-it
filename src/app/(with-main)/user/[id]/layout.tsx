export default function UserProfilePageLayout({
  children,
  coverImage,
  likedByUser,
  postsByUser
}: {
  children: React.ReactNode
  coverImage: React.ReactNode
  likedByUser: React.ReactNode
  postsByUser: React.ReactNode
}) {
  return (
    <section className='flex flex-col w-full gap-12'>
      {coverImage}
      {children}
      {postsByUser}
      {likedByUser}
    </section>
  )
}

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className='h-screen grid place-content-center'>{children}</section>
  )
}

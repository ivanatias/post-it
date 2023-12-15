import { Modal } from '@/components/modal'

export default function PostPageModalLayout({
  children,
  comments
}: {
  children: React.ReactNode
  comments: React.ReactNode
}) {
  return (
    <Modal>
      <section className='flex flex-col gap-6 py-8 px-4 lg:px-8 bg-background'>
        {children}
        {comments}
      </section>
    </Modal>
  )
}

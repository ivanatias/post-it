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
      <section className='flex flex-col gap-6 p-10'>
        {children}
        {comments}
      </section>
    </Modal>
  )
}

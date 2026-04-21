import { useEffect } from 'react'
import { useInvoiceStore } from '@/store/useInvoiceStore'
import InvoiceForm from './InvoiceForm'

export default function InvoiceDrawer() {
  const { isDrawerOpen, editingInvoiceId, closeDrawer } = useInvoiceStore()

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isDrawerOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closeDrawer])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-30 bg-black/50
          transition-opacity duration-300
          ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer panel
          Mobile:  full screen (left-0, w-full), slides from under top nav
          Tablet:  fixed width, sits completely under top nav (top-[72px])
          Desktop: panel slides from under sidebar (left-0, max-w-[719px])
      */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={editingInvoiceId ? `Edit invoice #${editingInvoiceId}` : 'New Invoice'}
        className={`
          fixed z-40 bg-white dark:bg-[#141625]
          flex flex-col
          transition-transform duration-300 ease-in-out

          top-0 left-0 w-full h-full rounded-none rounded-br-[20px]
          sm:top-[72px] sm:w-[616px] sm:h-[calc(100%-72px)] sm:rounded-r-[20px]
          lg:top-0 lg:w-auto lg:max-w-[719px] lg:min-w-[719px] lg:h-full

          ${isDrawerOpen ? 'translate-x-0' : '-translate-x-[120%]'}
        `}
      >
        <InvoiceForm />
      </div>
    </>
  )
}

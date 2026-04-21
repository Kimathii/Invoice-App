import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useInvoiceStore } from '@/store/useInvoiceStore'
import StatusBadge from '@/components/ui/StatusBadge'
import Button from '@/components/ui/Button'
import DeleteModal from '@/components/invoice/DeleteModal'
import { ChevronLeftIcon } from '@/components/icons'
import { formatDate, formatCurrency } from '@/utils'

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { getInvoiceById, deleteInvoice, markAsPaid, openDrawer } = useInvoiceStore()
  const invoice = getInvoiceById(id ?? '')

  if (!invoice) {
    return (
      <div className="mx-auto max-w-[730px] px-6 py-8 lg:py-[72px]">
        <Link to="/" className="inline-flex items-center gap-4 text-h3-variant font-bold text-text-primary dark:text-white hover:text-text-muted transition-colors">
          <ChevronLeftIcon /> Go back
        </Link>
        <p className="mt-8 text-body text-text-muted">Invoice not found.</p>
      </div>
    )
  }

  const handleDelete = () => { deleteInvoice(invoice.id); navigate('/') }
  const handleMarkAsPaid = () => markAsPaid(invoice.id)
  const handleEdit = () => openDrawer(invoice.id)

  return (
    <div className="mx-auto w-full max-w-[730px] px-6 py-8 md:px-12 lg:px-0 lg:py-[72px]">

      {/* Go back */}
      <Link
        to="/"
        className="inline-flex items-center gap-4 text-h3-variant font-bold text-text-primary dark:text-white hover:text-text-muted dark:hover:text-text-muted transition-colors mb-8"
      >
        <ChevronLeftIcon /> Go back
      </Link>

      {/* ── Status bar (desktop has action buttons here) ── */}
      <div className="flex items-center justify-between rounded-md bg-white dark:bg-dark px-6 sm:px-8 py-5 shadow-card mb-4 sm:mb-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <span className="text-body text-text-muted dark:text-[#DFE3FA]">Status</span>
          <StatusBadge status={invoice.status} />
        </div>
        {/* Desktop action buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <ActionButtons status={invoice.status} onEdit={handleEdit} onDelete={() => setShowDeleteModal(true)} onMarkAsPaid={handleMarkAsPaid} />
        </div>
      </div>

      {/* ── Main invoice card ── */}
      <div className="rounded-md bg-white dark:bg-dark px-6 sm:px-8 py-8 sm:py-10 shadow-card">

        {/* Top — ID + sender address */}
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between mb-8 sm:mb-[42px]">
          <div>
            <p className="text-h3-variant font-bold text-text-primary dark:text-white mb-1">
              <span className="text-text-muted">#</span>{invoice.id}
            </p>
            <p className="text-body text-text-muted dark:text-[#DFE3FA]">{invoice.description}</p>
          </div>
          <address className="not-italic text-body text-text-muted dark:text-[#DFE3FA] sm:text-right leading-[18px]">
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </address>
        </div>

        {/* Info grid — 2 col mobile, 3 col desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-[42px]">
          {/* Dates */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <div>
              <p className="text-body text-text-muted dark:text-[#DFE3FA] mb-2 sm:mb-3">Invoice Date</p>
              <p className="text-h3 font-bold text-text-primary dark:text-white">{formatDate(invoice.createdAt)}</p>
            </div>
            <div>
              <p className="text-body text-text-muted dark:text-[#DFE3FA] mb-2 sm:mb-3">Payment Due</p>
              <p className="text-h3 font-bold text-text-primary dark:text-white">{formatDate(invoice.paymentDue)}</p>
            </div>
          </div>

          {/* Bill To */}
          <div>
            <p className="text-body text-text-muted dark:text-[#DFE3FA] mb-2 sm:mb-3">Bill To</p>
            <p className="text-h3 font-bold text-text-primary dark:text-white mb-2">{invoice.clientName}</p>
            <address className="not-italic text-body text-text-muted dark:text-[#DFE3FA] leading-[18px]">
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </address>
          </div>

          {/* Sent To — full width on mobile bottom, 3rd col desktop */}
          <div className="col-span-2 sm:col-span-1">
            <p className="text-body text-text-muted dark:text-[#DFE3FA] mb-2 sm:mb-3">Sent To</p>
            <p className="text-h3 font-bold text-text-primary dark:text-white break-all">{invoice.clientEmail}</p>
          </div>
        </div>

        {/* Items table */}
        <div className="rounded-md overflow-hidden">
          <div className="bg-background-light dark:bg-[#252945] px-6 sm:px-8 pt-6 sm:pt-8 pb-6">
            {/* Desktop headers */}
            <div className="hidden sm:grid grid-cols-[1fr_80px_100px_100px] gap-4 mb-6">
              <p className="text-body text-text-muted dark:text-[#DFE3FA]">Item Name</p>
              <p className="text-body text-text-muted dark:text-[#DFE3FA] text-center">QTY.</p>
              <p className="text-body text-text-muted dark:text-[#DFE3FA] text-right">Price</p>
              <p className="text-body text-text-muted dark:text-[#DFE3FA] text-right">Total</p>
            </div>

            <div className="flex flex-col gap-5 sm:gap-6">
              {invoice.items.map(item => (
                <div key={item.id}>
                  {/* Mobile item layout */}
                  <div className="flex items-center justify-between sm:hidden">
                    <div>
                      <p className="text-h3-variant font-bold text-text-primary dark:text-white mb-1">{item.name}</p>
                      <p className="text-h3-variant font-bold text-text-muted dark:text-[#DFE3FA]">
                        {item.quantity} x {formatCurrency(item.price)}
                      </p>
                    </div>
                    <p className="text-h3-variant font-bold text-text-primary dark:text-white">{formatCurrency(item.total)}</p>
                  </div>

                  {/* Desktop item layout */}
                  <div className="hidden sm:grid grid-cols-[1fr_80px_100px_100px] gap-4 items-center">
                    <p className="text-h3-variant font-bold text-text-primary dark:text-white">{item.name}</p>
                    <p className="text-h3-variant font-bold text-text-muted dark:text-[#DFE3FA] text-center">{item.quantity}</p>
                    <p className="text-h3-variant font-bold text-text-muted dark:text-[#DFE3FA] text-right">{formatCurrency(item.price)}</p>
                    <p className="text-h3-variant font-bold text-text-primary dark:text-white text-right">{formatCurrency(item.total)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amount Due footer */}
          <div className="bg-[#373B53] dark:bg-[#0C0E16] px-6 sm:px-8 py-6 flex items-center justify-between rounded-b-md">
            <p className="text-body text-white">
              <span className="sm:hidden">Grand Total</span>
              <span className="hidden sm:inline">Amount Due</span>
            </p>
            <p className="text-[20px] sm:text-h2 font-bold text-white">{formatCurrency(invoice.total)}</p>
          </div>
        </div>
      </div>

      {/* ── Mobile action buttons — end of scroll ── */}
      <div className="sm:hidden mt-6 flex items-center justify-end gap-2">
        <ActionButtons status={invoice.status} onEdit={handleEdit} onDelete={() => setShowDeleteModal(true)} onMarkAsPaid={handleMarkAsPaid} />
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        invoiceId={invoice.id}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

function ActionButtons({ status, onEdit, onDelete, onMarkAsPaid }: {
  status: string; onEdit: () => void; onDelete: () => void; onMarkAsPaid: () => void
}) {
  return (
    <>
      {(status === 'draft' || status === 'pending') && (
        <Button variant="secondary" onClick={onEdit}>Edit</Button>
      )}
      <Button variant="danger" onClick={onDelete}>Delete</Button>
      {status === 'pending' && (
        <Button variant="primary" onClick={onMarkAsPaid}>Mark as Paid</Button>
      )}
    </>
  )
}

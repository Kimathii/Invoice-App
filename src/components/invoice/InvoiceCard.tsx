import { useNavigate } from 'react-router-dom'
import type { Invoice } from '@/types/invoice'
import StatusBadge from '@/components/ui/StatusBadge'
import { ChevronRightIcon } from '@/components/icons'
import { formatDate, formatCurrency } from '@/utils'

interface InvoiceCardProps {
  invoice: Invoice
}

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/invoices/${invoice.id}`)}
      className="w-full text-left rounded-md bg-white dark:bg-dark border border-transparent hover:border-primary px-6 py-4 shadow-card transition-all duration-200 cursor-pointer"
      aria-label={`View invoice #${invoice.id}`}
    >
      {/* ── Mobile layout ── */}
      <div className="flex flex-col gap-4 sm:hidden">
        <div className="flex items-center justify-between">
          <span className="text-h3-variant font-bold text-text-primary dark:text-white">
            <span className="text-text-muted">#</span>{invoice.id}
          </span>
          <span className="text-body text-text-muted dark:text-[#DFE3FA]">
            {invoice.clientName}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-body text-text-muted dark:text-[#DFE3FA]">
              Due {formatDate(invoice.paymentDue)}
            </span>
            <span className="text-h3 font-bold text-text-primary dark:text-white">
              {formatCurrency(invoice.total)}
            </span>
          </div>
          <StatusBadge status={invoice.status} />
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden sm:grid w-full items-center grid-cols-[110px_1fr_1fr_1fr_130px_20px] gap-4 py-2">
        <span className="text-h3-variant font-bold text-text-primary dark:text-white">
          <span className="text-text-muted">#</span>{invoice.id}
        </span>
        <span className="text-body text-text-muted dark:text-[#DFE3FA]">
          Due {formatDate(invoice.paymentDue)}
        </span>
        <span className="text-body text-text-muted dark:text-[#DFE3FA]">
          {invoice.clientName}
        </span>
        <span className="text-right text-h3 font-bold text-text-primary dark:text-white">
          {formatCurrency(invoice.total)}
        </span>
        <StatusBadge status={invoice.status} />
        <ChevronRightIcon className="justify-self-end" />
      </div>
    </button>
  )
}

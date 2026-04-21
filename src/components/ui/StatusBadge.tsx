import type { InvoiceStatus } from '@/types/invoice'

interface StatusBadgeProps {
  status: InvoiceStatus
}

const statusConfig: Record<
  InvoiceStatus,
  { label: string; dot: string; text: string; bg: string }
> = {
  paid: {
    label: 'Paid',
    dot: 'bg-status-paid-text',
    text: 'text-status-paid-text',
    bg: 'bg-status-paid-bg',
  },
  pending: {
    label: 'Pending',
    dot: 'bg-status-pending-text',
    text: 'text-status-pending-text',
    bg: 'bg-status-pending-bg',
  },
  draft: {
    label: 'Draft',
    dot: 'bg-status-draft-text dark:bg-status-draft-text-dark',
    text: 'text-status-draft-text dark:text-status-draft-text-dark',
    bg: 'bg-status-draft-bg dark:bg-[#DFE3FA1A]',
  },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <div
      className={`
        inline-flex items-center gap-2
        px-4 py-[14px] rounded-md
        w-[104px] justify-center
        ${config.bg}
      `}
    >
      <span className={`h-2 w-2 rounded-full ${config.dot}`} />
      <span className={`text-body-variant font-bold capitalize ${config.text}`}>
        {config.label}
      </span>
    </div>
  )
}

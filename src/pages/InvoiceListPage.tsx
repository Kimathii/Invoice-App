import { useInvoiceStore } from '@/store/useInvoiceStore'
import InvoiceCard from '@/components/invoice/InvoiceCard'
import EmptyState from '@/components/invoice/EmptyState'
import FilterDropdown from '@/components/invoice/FilterDropdown'
import Button from '@/components/ui/Button'
import { PlusIcon } from '@/components/icons'

export default function InvoiceListPage() {
  const { getFilteredInvoices, invoices, filter, openDrawer } = useInvoiceStore()
  const filtered = getFilteredInvoices()

  const subtitle = () => {
    if (invoices.length === 0) return 'No invoices'
    if (filter === 'all') return `There are ${invoices.length} total invoice${invoices.length !== 1 ? 's' : ''}`
    return `There are ${filtered.length} ${filter} invoice${filtered.length !== 1 ? 's' : ''}`
  }

  return (
    <div className="mx-auto w-full max-w-[730px] px-6 py-8 md:px-12 lg:px-0 lg:py-[72px]">

      {/* ── Header ── */}
      <div className="mb-8 lg:mb-[65px] flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] lg:text-h1 font-bold text-text-primary dark:text-white leading-tight tracking-tight">
            Invoices
          </h1>
          <p className="mt-1 text-body text-text-muted dark:text-[#DFE3FA]">
            <span className="hidden sm:inline">{subtitle()}</span>
            <span className="sm:hidden">{invoices.length} invoice{invoices.length !== 1 ? 's' : ''}</span>
          </p>
        </div>

        <div className="flex items-center gap-4 lg:gap-10">
          <FilterDropdown />

          <Button
            variant="primary"
            onClick={() => openDrawer()}
            className="flex items-center gap-2 lg:gap-4 !pl-2 !pr-3 lg:!pr-4"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shrink-0">
              <PlusIcon />
            </span>
            <span className="hidden sm:inline font-bold">New Invoice</span>
            <span className="sm:hidden font-bold">New</span>
          </Button>
        </div>
      </div>

      {/* ── List or Empty State ── */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="flex flex-col gap-4" role="list">
          {filtered.map(invoice => (
            <li key={invoice.id}>
              <InvoiceCard invoice={invoice} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

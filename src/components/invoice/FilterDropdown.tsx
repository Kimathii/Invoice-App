import { ChevronDownIcon } from '@/components/icons'
import { useState, useRef, useEffect } from 'react'
import { useInvoiceStore } from '@/store/useInvoiceStore'
import type { FilterStatus } from '@/types/invoice'

const OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
]

export default function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { filter, setFilter } = useInvoiceStore()
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const handleToggle = (value: FilterStatus) => {
    setFilter(filter === value ? 'all' : value)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-3 font-bold text-h3-variant text-text-primary dark:text-white hover:text-text-muted dark:hover:text-text-muted transition-colors"
      >
        <span className="hidden sm:inline">Filter by status</span>
        <span className="sm:hidden">Filter</span>
        <ChevronDownIcon className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 z-50 w-[192px] rounded-md bg-white dark:bg-[#252945] p-6 shadow-dropdown"
        >
          <ul className="flex flex-col gap-4">
            {OPTIONS.map(option => (
              <li key={option.value}>
                <label className="flex cursor-pointer items-center gap-[13px] group">
                  <div
                    className={`
                      flex h-4 w-4 shrink-0 items-center justify-center rounded-sm transition-colors
                      ${
                        filter === option.value
                          ? 'bg-primary'
                          : 'bg-background-light dark:bg-dark border border-transparent group-hover:border-primary'
                      }
                    `}
                  >
                    {filter === option.value && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={filter === option.value}
                    onChange={() => handleToggle(option.value)}
                    aria-label={option.label}
                  />
                  <span className="text-h3-variant text-text-primary dark:text-white capitalize">
                    {option.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}


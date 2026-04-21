import { ChevronDownIcon } from '@/components/icons'
import { useState, useRef, useEffect } from 'react'

interface Option {
  value: number | string
  label: string
}

interface SelectFieldProps {
  label: string
  id: string
  value: number | string
  options: Option[]
  onChange: (value: number | string) => void
  error?: string
}

export default function SelectField({ label, id, value, options, onChange, error }: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const selected = options.find(o => o.value === value)

  return (
    <div className="flex flex-col gap-[10px]" ref={ref}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className={`text-body ${error ? 'text-danger' : 'text-text-muted dark:text-text-secondary'}`}
        >
          {label}
        </label>
        {error && <span className="text-body text-danger">{error}</span>}
      </div>

      <div className="relative">
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(o => !o)}
          className={`
            flex h-12 w-full items-center justify-between rounded-sm border px-4
            text-h3-variant font-bold text-text-primary dark:text-white
            bg-white dark:bg-dark
            outline-none transition-colors duration-200
            ${error
              ? 'border-danger'
              : isOpen
                ? 'border-primary'
                : 'border-border dark:border-[#252945] hover:border-primary dark:hover:border-primary'
            }
          `}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{selected?.label ?? 'Select'}</span>
          <ChevronDownIcon className={`transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <ul
            role="listbox"
            className="absolute top-[calc(100%+8px)] left-0 z-50 w-full rounded-md bg-white dark:bg-[#252945] shadow-dropdown overflow-hidden"
          >
            {options.map(opt => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => { onChange(opt.value); setIsOpen(false) }}
                className={`
                  px-6 py-4 text-h3-variant font-bold cursor-pointer
                  border-b border-border dark:border-[#1E2139] last:border-0
                  transition-colors duration-150
                  ${opt.value === value
                    ? 'text-primary'
                    : 'text-text-primary dark:text-white hover:text-primary dark:hover:text-primary'
                  }
                `}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}


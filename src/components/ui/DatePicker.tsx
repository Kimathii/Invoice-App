import { useState, useRef, useEffect } from 'react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isToday } from 'date-fns'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'

interface DatePickerProps {
  label: string
  value: string // ISO string
  onChange: (iso: string) => void
  error?: string
  id: string
}

export default function DatePicker({ label, value, onChange, error, id }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => value ? new Date(value) : new Date())
  const selected = value ? new Date(value) : null
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

  const handleSelect = (date: Date) => {
    onChange(date.toISOString())
    setIsOpen(false)
  }

  // Build calendar grid
  const buildDays = () => {
    const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 })
    const days: Date[] = []
    let cur = start
    while (cur <= end) {
      days.push(cur)
      cur = addDays(cur, 1)
    }
    return days
  }

  const days = buildDays()
  const displayValue = selected ? format(selected, 'd MMM yyyy') : ''

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
            outline-none transition-colors duration-200 text-left
            ${error
              ? 'border-danger'
              : isOpen
                ? 'border-primary'
                : 'border-border dark:border-[#252945] hover:border-primary dark:hover:border-primary'
            }
          `}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span>{displayValue || 'Select date'}</span>
          <CalendarIcon />
        </button>

        {/* Calendar dropdown */}
        {isOpen && (
          <div className="absolute top-[calc(100%+8px)] left-0 z-50 w-[284px] rounded-md bg-white dark:bg-[#252945] shadow-dropdown p-6">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={() => setViewDate(d => subMonths(d, 1))}
                className="text-text-muted hover:text-primary dark:text-[#DFE3FA] dark:hover:text-primary transition-colors p-1"
                aria-label="Previous month"
              >
                <ChevronLeftIcon />
              </button>
              <span className="text-h3-variant font-bold text-text-primary dark:text-white">
                {format(viewDate, 'MMM yyyy')}
              </span>
              <button
                type="button"
                onClick={() => setViewDate(d => addMonths(d, 1))}
                className="text-text-muted hover:text-primary dark:text-[#DFE3FA] dark:hover:text-primary transition-colors p-1"
                aria-label="Next month"
              >
                <ChevronRightIcon />
              </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 mb-3">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                <span key={d} className="text-center text-[10px] font-bold text-text-muted dark:text-[#DFE3FA]">
                  {d}
                </span>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-y-1">
              {days.map((day, i) => {
                const isSelected = selected ? isSameDay(day, selected) : false
                const isCurrentMonth = isSameMonth(day, viewDate)
                const isTodayDate = isToday(day)

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(day)}
                    className={`
                      flex h-8 w-8 mx-auto items-center justify-center rounded-full
                      text-body-variant font-bold transition-colors duration-150
                      ${isSelected
                        ? 'bg-primary text-white'
                        : isCurrentMonth
                          ? 'text-text-primary dark:text-white hover:text-primary dark:hover:text-primary'
                          : 'text-text-muted opacity-30 cursor-default pointer-events-none'
                      }
                      ${isTodayDate && !isSelected ? 'ring-1 ring-primary' : ''}
                    `}
                    disabled={!isCurrentMonth}
                    aria-label={format(day, 'EEEE, MMMM d, yyyy')}
                    aria-pressed={isSelected}
                  >
                    {format(day, 'd')}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


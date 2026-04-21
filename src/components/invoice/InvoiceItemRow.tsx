import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { InvoiceFormValues } from '@/utils/invoiceSchema'
import FormField from '@/components/ui/FormField'
import { TrashIcon } from '@/components/icons'

interface InvoiceItemRowProps {
  field: { id: string }
  index: number
  register: UseFormRegister<InvoiceFormValues>
  errors: FieldErrors<InvoiceFormValues>
  quantity: number
  price: number
  onRemove: () => void
}

export default function InvoiceItemRow({
  field,
  index,
  register,
  errors,
  quantity,
  price,
  onRemove,
}: InvoiceItemRowProps) {
  const total = quantity * price

  return (
    <div key={field.id} className="flex flex-col gap-4 sm:grid sm:grid-cols-[1fr_64px_100px_80px_18px] sm:items-end sm:gap-4">
      {/* Mobile label */}
      <div className="sm:hidden">
        <FormField
          id={`items.${index}.name`}
          label="Item Name"
          error={errors.items?.[index]?.name?.message}
          {...register(`items.${index}.name`)}
        />
      </div>

      {/* Desktop name (no label) */}
      <div className="hidden sm:block">
        <input
          className={`
            h-12 w-full rounded-sm border px-4
            text-h3-variant font-bold text-text-primary dark:text-white
            bg-white dark:bg-dark outline-none transition-colors
            ${errors.items?.[index]?.name
              ? 'border-danger'
              : 'border-border dark:border-[#252945] focus:border-primary dark:focus:border-primary'
            }
          `}
          aria-label="Item name"
          {...register(`items.${index}.name`)}
        />
      </div>

      <div className="grid grid-cols-[64px_1fr_80px_18px] gap-4 sm:contents">
        {/* Qty */}
        <div>
          <label className="sm:hidden text-body text-text-muted dark:text-[#DFE3FA] block mb-[10px]">Qty.</label>
          <input
            type="number"
            min="1"
            className={`
              h-12 w-full rounded-sm border px-3 text-center
              text-h3-variant font-bold text-text-primary dark:text-white
              bg-white dark:bg-dark outline-none transition-colors
              ${errors.items?.[index]?.quantity
                ? 'border-danger'
                : 'border-border dark:border-[#252945] focus:border-primary dark:focus:border-primary'
              }
            `}
            aria-label="Quantity"
            {...register(`items.${index}.quantity`, { valueAsNumber: true })}
          />
        </div>

        {/* Price */}
        <div>
          <label className="sm:hidden text-body text-text-muted dark:text-[#DFE3FA] block mb-[10px]">Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className={`
              h-12 w-full rounded-sm border px-4
              text-h3-variant font-bold text-text-primary dark:text-white
              bg-white dark:bg-dark outline-none transition-colors
              ${errors.items?.[index]?.price
                ? 'border-danger'
                : 'border-border dark:border-[#252945] focus:border-primary dark:focus:border-primary'
              }
            `}
            aria-label="Price"
            {...register(`items.${index}.price`, { valueAsNumber: true })}
          />
        </div>

        {/* Total */}
        <div className="flex flex-col">
          <label className="sm:hidden text-body text-text-muted dark:text-[#DFE3FA] block mb-[10px]">Total</label>
          <div className="flex h-12 items-center">
            <span className="text-h3-variant font-bold text-text-muted dark:text-[#DFE3FA]">
              {total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Delete */}
        <div className="flex items-end pb-3">
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove item ${index + 1}`}
            className="text-text-muted hover:text-danger transition-colors"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
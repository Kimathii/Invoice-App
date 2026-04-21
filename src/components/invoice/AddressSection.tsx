import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { InvoiceFormValues } from '@/utils/invoiceSchema'
import FormField from '@/components/ui/FormField'

interface AddressSectionProps {
  title: string
  prefix: 'senderAddress' | 'clientAddress'
  register: UseFormRegister<InvoiceFormValues>
  errors: FieldErrors<InvoiceFormValues>
}

export default function AddressSection({ title, prefix, register, errors }: AddressSectionProps) {
  return (
    <section>
      <p className="mb-6 text-body-variant font-bold text-primary">{title}</p>
      <div className="flex flex-col gap-6">
        <FormField
          id={`${prefix}Street`}
          label="Street Address"
          error={errors[prefix]?.street?.message}
          {...register(`${prefix}.street`)}
        />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          <FormField
            id={`${prefix}City`}
            label="City"
            error={errors[prefix]?.city?.message}
            {...register(`${prefix}.city`)}
          />
          <FormField
            id={`${prefix}PostCode`}
            label="Post Code"
            error={errors[prefix]?.postCode?.message}
            {...register(`${prefix}.postCode`)}
          />
          <div className="col-span-2 sm:col-span-1">
            <FormField
              id={`${prefix}Country`}
              label="Country"
              error={errors[prefix]?.country?.message}
              {...register(`${prefix}.country`)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
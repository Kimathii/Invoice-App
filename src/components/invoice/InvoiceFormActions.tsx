import Button from '@/components/ui/Button'

interface InvoiceFormActionsProps {
  isEditing: boolean
  onDiscard: () => void
  onSaveAsDraft?: () => void
  onSubmit: () => void
}

export default function InvoiceFormActions({
  isEditing,
  onDiscard,
  onSaveAsDraft,
  onSubmit,
}: InvoiceFormActionsProps) {
  return (
    <div className={`
      relative mt-auto flex shrink-0 items-center gap-2 bg-white px-6 py-6 dark:bg-[#141625] sm:px-10 lg:pl-[159px] lg:pr-[56px]
      rounded-br-[20px] lg:rounded-br-none lg:rounded-r-[20px]
      ${isEditing ? 'justify-end' : 'justify-between'}
    `}>
      {/* Subtle shadow pointing upwards to signify it's floating above content */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[64px] -translate-y-full bg-gradient-to-t from-white/100 to-transparent dark:from-[#141625]/100" />

      {isEditing ? (
        <>
          <Button type="button" variant="secondary" onClick={onDiscard}>Cancel</Button>
          <Button type="submit" variant="primary" onClick={onSubmit}>Save Changes</Button>
        </>
      ) : (
        <>
          <Button type="button" variant="secondary" onClick={onDiscard}>Discard</Button>
          <div className="flex gap-2">
            <Button type="button" variant="dark" onClick={onSaveAsDraft}>Save as Draft</Button>
            <Button type="submit" variant="primary" onClick={onSubmit}>Save &amp; Send</Button>
          </div>
        </>
      )}
    </div>
  )
}
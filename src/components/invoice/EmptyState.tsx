export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-[136px] px-6 text-center">
      <img
        src="/images/empty.png"
        alt="No invoices illustration"
        width={242}
        height={200}
        className="mb-10"
      />
      <h2 className="mb-4 text-h2 font-bold text-text-primary dark:text-white">
        There is nothing here
      </h2>
     <p className="max-w-[220px] text-body text-text-muted dark:text-[#DFE3FA]">
        Create an invoice by clicking the
        <br />
        <strong className="font-bold text-text-primary dark:text-white">New Invoice</strong>{' '}
        button and get started
      </p>
    </div>
  )
}
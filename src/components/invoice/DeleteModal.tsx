import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

interface DeleteModalProps {
  isOpen: boolean
  invoiceId: string
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteModal({ isOpen, invoiceId, onClose, onConfirm }: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-3 text-h2 font-bold text-text-primary dark:text-white">
        Confirm Deletion
      </h2>
      <p className="mb-8 text-body text-text-muted dark:text-[#DFE3FA] leading-relaxed">
        Are you sure you want to delete invoice{' '}
        <span className="font-bold text-text-primary dark:text-white">#{invoiceId}</span>?
        This action cannot be undone.
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}

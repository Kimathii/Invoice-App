import { useInvoiceStore } from '@/store/useInvoiceStore'

export const EMPTY_ITEM = () => ({
  id: crypto.randomUUID(),
  name: '',
  quantity: 1,
  price: 0,
  total: 0,
})

export function buildDefaults(invoice?: ReturnType<typeof useInvoiceStore.getState>['invoices'][0]) {
  if (invoice) {
    return {
      description: invoice.description,
      paymentTerms: invoice.paymentTerms,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      createdAt: invoice.createdAt,
      senderAddress: invoice.senderAddress,
      clientAddress: invoice.clientAddress,
      items: invoice.items,
    }
  }
  return {
    description: '',
    paymentTerms: 30,
    clientName: '',
    clientEmail: '',
    createdAt: new Date().toISOString(),
    senderAddress: { street: '', city: '', postCode: '', country: '' },
    clientAddress: { street: '', city: '', postCode: '', country: '' },
    items: [EMPTY_ITEM()],
  }
}
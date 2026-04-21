import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Invoice, InvoiceStatus, FilterStatus } from '@/types/invoice'
import { generateId, calculatePaymentDue, calculateTotal } from '@/utils'

interface InvoiceStore {
  invoices: Invoice[]
  filter: FilterStatus
  isDrawerOpen: boolean
  editingInvoiceId: string | null
  addInvoice: (data: Omit<Invoice, 'id' | 'createdAt' | 'paymentDue' | 'total' | 'status'>, status: InvoiceStatus) => void
  updateInvoice: (id: string, data: Omit<Invoice, 'id' | 'createdAt' | 'paymentDue' | 'total' | 'status'>) => void
  deleteInvoice: (id: string) => void
  markAsPaid: (id: string) => void
  setFilter: (filter: FilterStatus) => void
  openDrawer: (invoiceId?: string) => void
  closeDrawer: () => void
  getFilteredInvoices: () => Invoice[]
  getInvoiceById: (id: string) => Invoice | undefined
  seedData: () => void
}

const SEED_INVOICES: Invoice[] = [
  { id: 'RT3080', createdAt: '2021-08-18T00:00:00.000Z', paymentDue: '2021-08-19T00:00:00.000Z', description: 'Re-branding', paymentTerms: 1, clientName: 'Jensen Huang', clientEmail: 'jensenh@mail.com', status: 'paid', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' }, clientAddress: { street: '106 Kendell Street', city: 'Sharrington', postCode: 'NR24 5WQ', country: 'United Kingdom' }, items: [{ id: '1', name: 'Brand Guidelines', quantity: 1, price: 1800.90, total: 1800.90 }], total: 1800.90 },
  { id: 'XM9141', createdAt: '2021-08-21T00:00:00.000Z', paymentDue: '2021-09-20T00:00:00.000Z', description: 'Graphic Design', paymentTerms: 30, clientName: 'Alex Grim', clientEmail: 'alexgrim@mail.com', status: 'pending', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' }, clientAddress: { street: '84 Church Way', city: 'Bradford', postCode: 'BD1 9PB', country: 'United Kingdom' }, items: [{ id: '2', name: 'Banner Design', quantity: 1, price: 156.00, total: 156.00 }, { id: '3', name: 'Email Design', quantity: 2, price: 200.00, total: 400.00 }], total: 556.00 },
  { id: 'RG0314', createdAt: '2021-09-24T00:00:00.000Z', paymentDue: '2021-10-01T00:00:00.000Z', description: 'Website Redesign', paymentTerms: 7, clientName: 'John Morrison', clientEmail: 'jm@myco.com', status: 'paid', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' }, clientAddress: { street: '79 Dover Road', city: 'Westhall', postCode: 'IP19 3PF', country: 'United Kingdom' }, items: [{ id: '4', name: 'Website Redesign', quantity: 1, price: 14002.33, total: 14002.33 }], total: 14002.33 },
  { id: 'RT2080', createdAt: '2021-10-11T00:00:00.000Z', paymentDue: '2021-10-12T00:00:00.000Z', description: 'Logo Concept', paymentTerms: 1, clientName: 'Alysa Werner', clientEmail: 'alysa@email.co.uk', status: 'pending', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' }, clientAddress: { street: '63 Warwick Road', city: 'Carlisle', postCode: 'CA20 2TN', country: 'United Kingdom' }, items: [{ id: '5', name: 'Logo Sketches', quantity: 1, price: 102.04, total: 102.04 }], total: 102.04 },
  { id: 'AA1449', createdAt: '2021-10-07T00:00:00.000Z', paymentDue: '2021-10-14T00:00:00.000Z', description: 'Re-branding', paymentTerms: 7, clientName: 'Mellisa Clarke', clientEmail: 'mellisa.clarke@example.com', status: 'pending', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' }, clientAddress: { street: '46 Abbey Row', city: 'Cambridge', postCode: 'CB5 6EG', country: 'United Kingdom' }, items: [{ id: '6', name: 'New Logo', quantity: 1, price: 1532.33, total: 1532.33 }, { id: '7', name: 'Brand Guidelines', quantity: 1, price: 2500.00, total: 2500.00 }], total: 4032.33 },
  { id: 'TY9141', createdAt: '2021-10-01T00:00:00.000Z', paymentDue: '2021-10-31T00:00:00.000Z', description: 'Landing Page Design', paymentTerms: 30, clientName: 'Thomas Wayne', clientEmail: 'thomas@dc.com', status: 'pending', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' }, clientAddress: { street: '3 Gotham Drive', city: 'Gotham', postCode: 'GT1 1DB', country: 'United Kingdom' }, items: [{ id: '8', name: 'Landing Page Design', quantity: 1, price: 6155.91, total: 6155.91 }], total: 6155.91 },
  { id: 'FV2353', createdAt: '2021-11-05T00:00:00.000Z', paymentDue: '2021-11-12T00:00:00.000Z', description: 'Logo Re-design', paymentTerms: 7, clientName: 'Anita Wainwright', clientEmail: 'anita.wainwright@gmail.com', status: 'draft', senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' }, clientAddress: { street: '', city: '', postCode: '', country: '' }, items: [{ id: '9', name: 'Logo Re-design', quantity: 1, price: 3102.04, total: 3102.04 }], total: 3102.04 },
]

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set, get) => ({
      invoices: [],
      filter: 'all',
      isDrawerOpen: false,
      editingInvoiceId: null,

      addInvoice: (data, status) => {
        const createdAt = new Date().toISOString()
        const newInvoice: Invoice = { ...data, id: generateId(), createdAt, paymentDue: calculatePaymentDue(createdAt, data.paymentTerms), total: calculateTotal(data.items), status }
        set(state => ({ invoices: [newInvoice, ...state.invoices] }))
      },

      updateInvoice: (id, data) => {
        set(state => ({ invoices: state.invoices.map(inv => inv.id === id ? { ...inv, ...data, paymentDue: calculatePaymentDue(inv.createdAt, data.paymentTerms), total: calculateTotal(data.items) } : inv) }))
      },

      deleteInvoice: (id) => set(state => ({ invoices: state.invoices.filter(inv => inv.id !== id) })),

      markAsPaid: (id) => set(state => ({ invoices: state.invoices.map(inv => inv.id === id ? { ...inv, status: 'paid' } : inv) })),

      setFilter: (filter) => set({ filter }),

      openDrawer: (invoiceId) => set({ isDrawerOpen: true, editingInvoiceId: invoiceId ?? null }),

      closeDrawer: () => set({ isDrawerOpen: false, editingInvoiceId: null }),

      getFilteredInvoices: () => {
        const { invoices, filter } = get()
        if (filter === 'all') return invoices
        return invoices.filter(inv => inv.status === filter)
      },

      getInvoiceById: (id) => get().invoices.find(inv => inv.id === id),

      seedData: () => {
        if (get().invoices.length > 0) return
        set({ invoices: SEED_INVOICES })
      },
    }),
    { name: 'invoice-app-storage' }
  )
)

export type InvoiceStatus = 'draft' | 'pending' | 'paid'

export interface Address {
  street: string
  city: string
  postCode: string
  country: string
}

export interface InvoiceItem {
  id: string
  name: string
  quantity: number
  price: number
  total: number
}

export interface Invoice {
  id: string            // e.g. "RT3080"
  createdAt: string     // ISO date string
  paymentDue: string    // ISO date string
  description: string
  paymentTerms: number  // 1 | 7 | 14 | 30
  clientName: string
  clientEmail: string
  status: InvoiceStatus
  senderAddress: Address
  clientAddress: Address
  items: InvoiceItem[]
  total: number
}

// Form data — excludes auto-generated fields
export type InvoiceFormData = Omit<Invoice, 'id' | 'createdAt' | 'paymentDue' | 'total'>

export type FilterStatus = 'all' | InvoiceStatus

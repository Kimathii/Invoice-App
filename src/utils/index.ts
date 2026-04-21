// Generates IDs like "RT3080"
export function generateId(): string {
  const letters = Array.from({ length: 2 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join('')
  const numbers = String(Math.floor(Math.random() * 9000) + 1000)
  return `${letters}${numbers}`
}

// Formats ISO string to "DD MMM YYYY" e.g. "21 Aug 2021"
export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// Calculates payment due date from creation date + payment terms (days)
export function calculatePaymentDue(createdAt: string, paymentTerms: number): string {
  const date = new Date(createdAt)
  date.setDate(date.getDate() + paymentTerms)
  return date.toISOString()
}

// Formats number to GBP currency string e.g. "£ 1,800.90"
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(amount)
}

// Calculates total from invoice items
export function calculateTotal(items: { quantity: number; price: number }[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0)
}

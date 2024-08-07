import { InvoiceOrbit, Item } from '../schema/invoice-orbit'

const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const calculateItemTotal = (item: Item): number => {
  return item.quantity * item.price
}

const calculateTotal = (items: Item[]): number => {
  return items.reduce((acc, item) => acc + calculateItemTotal(item), 0)
}

const calculateDueDate = (createdAt: Date, paymentTerms: number): Date => {
  return addDays(createdAt, paymentTerms)
}

const updateInvoiceFields = (
  invoice: InvoiceOrbit,
  updates: Partial<InvoiceOrbit>
): void => {
  Object.assign(invoice, updates)

  if (updates.items) {
    // Update total for each item
    invoice.items = updates.items.map((item) => ({
      ...item,
      total: calculateItemTotal(item),
    }))

    // Update total for the entire invoice
    invoice.total = calculateTotal(invoice.items)
  }

  if (updates.createdAt || updates.paymentTerms) {
    invoice.paymentDue = calculateDueDate(
      updates.createdAt || invoice.createdAt,
      updates.paymentTerms || invoice.paymentTerms
    )
  }
}

export {
  calculateTotal,
  calculateDueDate,
  calculateItemTotal,
  updateInvoiceFields,
}

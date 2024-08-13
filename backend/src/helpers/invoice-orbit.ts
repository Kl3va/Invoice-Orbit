import { InvoiceOrbit, Item } from '../schema/invoice-orbit'

const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const calculateItemTotal = (item: Item) => {
  return item.quantity * item.price
}

const calculateTotal = (items: Item[]) => {
  const total = items.reduce(
    (sum, item) => sum + (item.total || calculateItemTotal(item)),
    0
  )
  return total
}

const calculateDueDate = (createdAt: Date, paymentTerms: number): Date => {
  return addDays(createdAt, paymentTerms)
}

export { calculateTotal, calculateDueDate, calculateItemTotal }

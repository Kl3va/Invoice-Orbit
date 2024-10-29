import { InvoiceOrbit, Item, InvoiceDocument } from '../schema/invoice-orbit'
import { z } from 'zod'

const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const calculateItemTotal = (item: Item) => {
  return item.quantity * item.price
}

const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + calculateItemTotal(item), 0)
}

const calculateDueDate = (createdAt: Date, paymentTerms: number): Date => {
  return addDays(createdAt, paymentTerms)
}

// Separate function to handle the invoice update logic
const processInvoiceUpdate = (
  body: Partial<InvoiceOrbit>,
  existingInvoice: InvoiceDocument
): Partial<InvoiceOrbit> => {
  // Start with existing invoice data
  const updatedInvoiceData: Partial<InvoiceOrbit> = {
    ...existingInvoice.toObject(),
  }

  // Update fields from the body
  Object.keys(body).forEach((key) => {
    const typedKey = key as keyof InvoiceOrbit

    if (typedKey === 'items' && body.items) {
      // Always recalculate totals when items are updated, regardless of whether
      // a total was provided in the body
      updateItems(updatedInvoiceData, body.items)
    } else if (typedKey === 'createdAt' || typedKey === 'paymentTerms') {
      updatePaymentDetails(updatedInvoiceData, body, typedKey, existingInvoice)
    } else if (typedKey !== 'total') {
      // Ignore total field from frontend
      if (body[typedKey] !== undefined) {
        ;(updatedInvoiceData[typedKey] as any) = body[typedKey]
      }
    }
  })

  // If items were not updated but exist in the invoice, recalculate totals anyway
  if (!body.items && updatedInvoiceData.items) {
    updatedInvoiceData.total = calculateTotal(updatedInvoiceData.items)
  }

  return updatedInvoiceData
}

// Helper function to update items and total
const updateItems = (
  invoiceData: Partial<InvoiceOrbit>,
  items: Item[]
): void => {
  // Always recalculate item totals and invoice total
  const newItems = items.map((item) => ({
    ...item,
    total: calculateItemTotal(item), // Recalculate regardless of whether total was provided
  }))
  invoiceData.items = newItems
  invoiceData.total = calculateTotal(newItems) // Always recalculate the total
}

// Helper function to update payment details
const updatePaymentDetails = (
  invoiceData: Partial<InvoiceOrbit>,
  body: Partial<InvoiceOrbit>,
  field: 'createdAt' | 'paymentTerms',
  existingInvoice: InvoiceDocument
): void => {
  const newCreatedAt =
    field === 'createdAt' && body.createdAt
      ? new Date(body.createdAt)
      : existingInvoice.createdAt

  const newPaymentTerms =
    field === 'paymentTerms' && body.paymentTerms !== undefined
      ? body.paymentTerms
      : existingInvoice.paymentTerms

  invoiceData.paymentDue = calculateDueDate(newCreatedAt, newPaymentTerms)
  if (field === 'createdAt' && body.createdAt) {
    invoiceData.createdAt = newCreatedAt
  } else if (field === 'paymentTerms' && body.paymentTerms !== undefined) {
    invoiceData.paymentTerms = newPaymentTerms
  }
}
//VALIDATION SCHEMA
const ItemDataSchema = z.object({
  name: z
    .string()
    .min(1, 'Item name is required')
    .max(30, 'Item name must be at most 30 characters long'),
  quantity: z
    .number()
    .positive({ message: 'Quantity must be positive' })
    .max(100000),
  price: z.number().positive({ message: 'Price must be positive' }),
})

const AddressDataSchema = z.object({
  street: z.string().min(1, 'Street name is required'),
  city: z.string().min(1, 'City name is required'),
  postCode: z
    .string()
    .min(1, 'PostCode is required')
    .max(11, 'PostCode must be at most 11 characters long'),
  country: z
    .string()
    .min(1, 'Country is required')
    .max(50, 'Country must be at most 50 characters long'),
})

const InvoiceDataSchema = z.object({
  createdAt: z.string().datetime('Invalid date format'),
  paymentTerms: z
    .number()
    .int()
    .positive({ message: 'PaymentTerms must be positive' }),
  status: z.enum(['pending', 'paid', 'draft']),
  description: z.string().min(1, 'Description is required'),
  clientName: z
    .string()
    .min(1, 'Client name is required')
    .max(50, 'Client name must be at most 50 characters long'),
  clientEmail: z.string().email('Invalid email format'),
  senderAddress: AddressDataSchema,
  clientAddress: AddressDataSchema,
  currency: z.enum(['NGN', 'USD', 'GBP', 'EUR']),
  items: z.array(ItemDataSchema).min(1, 'At least one item is required'),
})

export {
  calculateTotal,
  calculateDueDate,
  calculateItemTotal,
  InvoiceDataSchema,
  processInvoiceUpdate,
}

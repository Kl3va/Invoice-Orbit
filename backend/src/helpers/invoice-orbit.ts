import { InvoiceOrbit, Item } from '../schema/invoice-orbit'
import { z } from 'zod'

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
}

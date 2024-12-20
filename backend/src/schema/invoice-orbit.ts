import mongoose, { Document, Types } from 'mongoose'

interface Address {
  street: string
  city: string
  postCode: string
  country: string
}

interface Item {
  name: string
  quantity: number
  price: number
  total: number
}

interface InvoiceOrbit {
  userId: string
  createdAt: Date
  paymentDue: Date
  description: string
  paymentTerms: number
  clientName: string
  clientEmail: string
  status: 'paid' | 'pending' | 'draft'
  senderAddress: Address
  clientAddress: Address
  items: Item[]
  currency: 'NGN' | 'USD' | 'GBP' | 'EUR'
  total: number
  //_id: string
}

interface InvoiceDocument extends Document<Types.ObjectId>, InvoiceOrbit {}

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
)

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { _id: false }
)

const invoiceOrbitSchema = new mongoose.Schema<InvoiceDocument>({
  userId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  paymentDue: { type: Date, required: true },
  description: { type: String, required: true },
  paymentTerms: { type: Number, required: true },
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  currency: {
    type: String,
    enum: ['NGN', 'USD', 'GBP', 'EUR'],
    default: 'GBP',
  },
  status: {
    type: String,
    enum: ['paid', 'pending', 'draft'],
    default: 'pending',
  },
  senderAddress: { type: addressSchema, required: true },
  clientAddress: { type: addressSchema, required: true },
  items: { type: [itemSchema], required: true },
  total: { type: Number, required: true },
})

const InvoiceOrbitModel = mongoose.model<InvoiceDocument>(
  'InvoiceOrbit',
  invoiceOrbitSchema
)

export { InvoiceOrbit, InvoiceOrbitModel, Item, InvoiceDocument }

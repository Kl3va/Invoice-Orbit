export interface Address {
  street: string
  city: string
  postCode: string
  country: string
}

export interface Item {
  name: string
  quantity: number
  price: number
  total?: number
}

export interface InvoiceOrbit {
  userId: string
  createdAt: string
  paymentDue?: string
  description: string
  paymentTerms: number
  clientName: string
  clientEmail: string
  status: 'paid' | 'pending' | 'draft'
  senderAddress: Address
  clientAddress: Address
  items: Item[]
  currency: 'NGN' | 'USD' | 'GBP' | 'EUR'
  total?: number
  _id?: string
}

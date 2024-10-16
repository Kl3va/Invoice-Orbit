import { InvoiceOrbit } from 'types/invoiceTypes'

export const validateInvoice = (invoice: InvoiceOrbit) => {
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Check if required fields are not empty
  if (!invoice.clientName.trim()) return false
  if (!invoice.clientEmail.trim() || !emailRegex.test(invoice.clientEmail))
    return false
  if (!invoice.senderAddress.street.trim()) return false
  if (!invoice.senderAddress.city.trim()) return false
  if (!invoice.senderAddress.postCode.trim()) return false
  if (!invoice.senderAddress.country.trim()) return false
  if (!invoice.clientAddress.street.trim()) return false
  if (!invoice.clientAddress.city.trim()) return false
  if (!invoice.clientAddress.postCode.trim()) return false
  if (!invoice.clientAddress.country.trim()) return false
  if (!invoice.description.trim()) return false

  // Ensure at least one item is added
  if (invoice.items.length === 0) return false

  // Validate each item
  for (const item of invoice.items) {
    if (!item.name.trim()) return false
    if (typeof item.quantity !== 'number' || item.quantity <= 0) return false
    if (typeof item.price !== 'number' || item.price <= 0) return false
  }

  // Check if payment terms are valid
  if (invoice.paymentTerms <= 0) return false

  return true
}

import { Response, Request, NextFunction } from 'express'
import mongoose from 'mongoose'
import { RequireAuthProp } from '@clerk/clerk-sdk-node'
import { StatusCodes } from 'http-status-codes'
import { InvoiceOrbitModel, Item, InvoiceOrbit } from '../schema/invoice-orbit'
import {
  calculateDueDate,
  calculateItemTotal,
  calculateTotal,
} from '../helpers/invoice-orbit'

//Get All Invoices for user
const getAllInvoices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.query
    const userId = (req as RequireAuthProp<Request>).auth.userId

    //Filter Initialization
    let filter: any = { userId: userId }

    // Check if status query parameter is provided
    if (status) {
      if (['pending', 'paid', 'draft'].includes(status as string)) {
        filter.status = status
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Invalid status value!' })
      }
    }

    //Find Invoices
    const invoices = await InvoiceOrbitModel.find(filter).sort('createdAt')
    res.status(StatusCodes.OK).json({ invoices, count: invoices.length })
  } catch (err) {
    next(err)
  }
}

//Get Single Invoice
const getInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id: invoiceId },
    } = req
    const userId = (req as RequireAuthProp<Request>).auth.userId

    const invoice = await InvoiceOrbitModel.findOne({ _id: invoiceId, userId })
    if (!invoice) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No invoice with id ${invoiceId}` })
    }

    res.status(StatusCodes.OK).json({ invoice })
  } catch (err) {
    next(err)
  }
}

//Create An Invoice
const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { createdAt, paymentTerms, items, ...otherFields } = req.body
    const userId = (req as RequireAuthProp<Request>).auth.userId

    // Calculate each total for items
    const itemsWithTotals = items.map((item: Item) => ({
      ...item,
      total: calculateItemTotal(item),
    }))

    // calculate the total
    const total = calculateTotal(itemsWithTotals)

    const paymentDue = calculateDueDate(new Date(createdAt), paymentTerms)

    const invoice = new InvoiceOrbitModel({
      userId,
      createdAt,
      paymentTerms,
      paymentDue,
      items: itemsWithTotals,
      total,
      ...otherFields,
    })

    await invoice.save()

    res.status(StatusCodes.CREATED).json({ invoice })
  } catch (err) {
    next(err)
  }
}

// //Delete Invoice
const deleteInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id: invoiceId },
    } = req
    const userId = (req as RequireAuthProp<Request>).auth.userId
    const invoice = await InvoiceOrbitModel.findByIdAndDelete({
      _id: invoiceId,
      userId,
    })
    if (!invoice) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No invoice with id: ${invoiceId}!` })
    }

    res.status(StatusCodes.NO_CONTENT).send()
  } catch (err) {
    next(err)
  }
}

const updateInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id: invoiceId },
      body,
    } = req
    const userId = (req as RequireAuthProp<Request>).auth.userId

    // Find the existing invoice
    const existingInvoice = await InvoiceOrbitModel.findOne({
      _id: invoiceId,
      userId,
    })
    if (!existingInvoice) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No invoice with id ${invoiceId}` })
    }

    // Function for partial update of Invoice
    const updateField = (key: keyof InvoiceOrbit, value: any) => {
      if (key === 'items') {
        const itemsWithTotals = (value as Item[]).map((item: Item) => ({
          ...item,
          total: calculateItemTotal(item),
        }))
        existingInvoice.items = itemsWithTotals
        existingInvoice.total = calculateTotal(itemsWithTotals)
      } else if (key === 'createdAt' || key === 'paymentTerms') {
        const newCreatedAt =
          key === 'createdAt'
            ? new Date(value as string)
            : existingInvoice.createdAt
        const newPaymentTerms =
          key === 'paymentTerms'
            ? (value as number)
            : existingInvoice.paymentTerms
        existingInvoice.paymentDue = calculateDueDate(
          newCreatedAt,
          newPaymentTerms
        )
        ;(existingInvoice as any)[key] = value
      } else {
        ;(existingInvoice as any)[key] = value
      }
    }

    // Handle partial updates
    ;(Object.keys(body) as Array<keyof InvoiceOrbit>).forEach((key) => {
      updateField(key, body[key])
    })

    // Save the updated invoice
    const updatedInvoice = await existingInvoice.save()

    res.status(StatusCodes.OK).json({ invoice: updatedInvoice })
  } catch (err) {
    next(err)
  }
}

export {
  getAllInvoices,
  getInvoice,
  createInvoice,
  deleteInvoice,
  updateInvoice,
}

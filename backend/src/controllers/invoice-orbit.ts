import { Response, Request, NextFunction } from 'express'
import { RequireAuthProp } from '@clerk/clerk-sdk-node'
import { StatusCodes } from 'http-status-codes'
import { InvoiceOrbitModel, Item } from '../schema/invoice-orbit'
import {
  calculateDueDate,
  calculateItemTotal,
  calculateTotal,
  updateInvoiceFields,
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

    //Calculate each total for items
    const itemsWithTotals = items.map((item: Item) => ({
      ...item,
      total: calculateItemTotal(item),
    }))

    //calculate the total
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
    res.status(StatusCodes.OK).json({ invoice })
  } catch (err) {
    next(err)
  }
}

// //Update Invoice by Id
const updateInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id: invoiceId },
    } = req
    const userId = (req as RequireAuthProp<Request>).auth.userId
    const existingInvoice = await InvoiceOrbitModel.findOne({
      _id: invoiceId,
      userId,
    })
    if (!existingInvoice) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No invoice with id ${invoiceId}` })
    }

    updateInvoiceFields(existingInvoice, req.body)

    const updatedInvoice = await existingInvoice.save()
    res.status(StatusCodes.OK).json({ invoice: updatedInvoice })
  } catch (err) {
    next(err)
  }
}

// //Delete Invoice
const deleteInvoice = async (
  res: Response,
  req: Request,
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

    res.status(StatusCodes.OK).json({ invoice })
  } catch (err) {
    next(err)
  }
}

export {
  getAllInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
}

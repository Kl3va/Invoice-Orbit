import { Response, Request, NextFunction } from 'express'
//import { RequireAuthProp } from '@clerk/clerk-sdk-node'
import { AuthObject } from '@clerk/express'
import { StatusCodes } from 'http-status-codes'
import { InvoiceOrbitModel, Item, InvoiceOrbit } from '../schema/invoice-orbit'
import {
  calculateDueDate,
  calculateItemTotal,
  calculateTotal,
  InvoiceDataSchema,
  processInvoiceUpdate,
} from '../utils/invoiceFormatter'

//Get All Invoices for user
const getAllInvoices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.query
    // const userId = (req as RequireAuthProp<Request>).auth.userId
    const userId = (req as Request & { auth: AuthObject }).auth.userId
    // const userId = req.auth.userId

    //Filter Initialization
    let filter: any = { userId: userId }

    // Check if status query parameter is provided
    if (status && Array.isArray(status) && status.length > 0) {
      const validStatuses = status.filter((s) =>
        ['pending', 'paid', 'draft'].includes(s as string)
      )

      if (validStatuses.length > 0) {
        filter.status = { $in: validStatuses }
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Invalid status value(s)!' })
      }
    }

    //Find Invoices
    const invoices = await InvoiceOrbitModel.find(filter).sort('-createdAt')
    res.status(StatusCodes.OK).json({ invoices })
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
    const userId = (req as Request & { auth: AuthObject }).auth.userId

    const invoice = await InvoiceOrbitModel.findOne({ _id: invoiceId, userId })
    if (!invoice) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No invoice with id: ${invoiceId}` })
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
    const validatedData = await InvoiceDataSchema.parseAsync(req.body)
    const { createdAt, paymentTerms, items, ...otherFields } = validatedData
    const userId = (req as Request & { auth: AuthObject }).auth.userId

    // Calculate each total for items
    const itemsWithTotals = items.map((item: Omit<Item, 'total'>) => ({
      ...item,
      total: item.quantity * item.price,
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
      total: total,
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
    const userId = (req as Request & { auth: AuthObject }).auth.userId
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

//Update Invoice
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
    const userId = (req as Request & { auth: AuthObject }).auth.userId

    // Validate the input data
    await InvoiceDataSchema.partial().parseAsync(body)

    // Find the existing invoice
    const existingInvoice = await InvoiceOrbitModel.findOne({
      _id: invoiceId,
      userId,
    })
    if (!existingInvoice) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No invoice with id: ${invoiceId}` })
    }

    // Process the update data
    const updatedInvoiceData = processInvoiceUpdate(body, existingInvoice)

    // Update the invoice with the new data
    const updatedInvoice = await InvoiceOrbitModel.findOneAndUpdate(
      { _id: invoiceId, userId },
      updatedInvoiceData,
      { new: true, runValidators: true }
    )

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

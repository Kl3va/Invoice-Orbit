import { Response, Request, NextFunction } from 'express'
import { RequireAuthProp } from '@clerk/clerk-sdk-node'
import { StatusCodes } from 'http-status-codes'
import { InvoiceOrbitModel, Item } from '../schema/invoice-orbit'

//Get All Invoices for user
const getAllInvoices = async (req: Request, res: Response) => {
  try {
    const { status } = req.query
    const userId = (req as RequireAuthProp<Request>).auth.userId

    //Filter Initialization
    let filter: any = { userId: userId }

    if (status && ['pending', 'paid', 'draft'].includes(status as string)) {
      filter.status = status
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Invalid status value!' })
    }

    //Find Invoices
    const invoices = await InvoiceOrbitModel.find(filter).sort('createdAt')
    res.status(StatusCodes.OK).json({ invoices, count: invoices.length })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Something went wrong, try again later!!' })
  }
}

//Get Single Invoice
// const getInvoice = async (req: Request, res: Response) => {
//   try {
//     const {
//       params: { id: invoiceId },
//     } = req
//     const userId = req.auth?.userId

//     const invoice = await InvoiceOrbitModel.findOne({ _id: invoiceId, userId })
//     if (!invoice) {
//       res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ msg: `No invoice with id ${invoiceId}` })
//     }

//     res.status(StatusCodes.OK).json({ invoice })
//   } catch (error) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: 'Something went wrong, try again later!!' })
//   }
// }

//Create An Invoice
const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.userId = (req as RequireAuthProp<Request>).auth.userId

    //calculate the total
    const total = req.body.items.reduce(
      (acc: number, item: Item) => acc + item.quantity * item.price,
      0
    )

    const invoice = new InvoiceOrbitModel({ ...req.body, total: total })
    await invoice.save()
    res.status(StatusCodes.OK).json({ invoice })
  } catch (err) {
    next(err)
  }
}

// //Update Invoice by Id
// const updateInvoice = async (req: Request, res: Response) => {
//   try {
//     const {
//       params: { id: invoiceId },
//     } = req
//     const userId = req.auth?.userId
//     const invoice = await InvoiceOrbitModel.findByIdAndUpdate(
//       { _id: invoiceId, userId },
//       req.body,
//       { new: true, runValidators: true }
//     )
//     if (!invoice) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ msg: `No invoice with id ${invoiceId}` })
//     }

//     res.status(StatusCodes.OK).json({ invoice })
//   } catch (error) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: 'Something went wrong, try again later!!' })
//   }
// }

// //Delete Invoice
// const deleteInvoice = async (res: Response, req: Request) => {
//   try {
//     const {
//       params: { id: invoiceId },
//     } = req
//     const userId = req.auth?.userId
//     const invoice = await InvoiceOrbitModel.findByIdAndDelete({
//       _id: invoiceId,
//       userId,
//     })
//     if (!invoice) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ msg: `No invoice with id: ${invoiceId}!` })
//     }

//     res.status(StatusCodes.OK).json({ invoice })
//   } catch (error) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: 'Something went wrong, try again later!!' })
//   }
// }

export {
  getAllInvoices,
  // getInvoice,
  createInvoice,
  // updateInvoice,
  // deleteInvoice,
}

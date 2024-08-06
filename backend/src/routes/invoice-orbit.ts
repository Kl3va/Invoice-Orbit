import express from 'express'
// import { InvoiceOrbitModel } from '../schema/invoice-orbit'
const router = express.Router()
import {
  getAllInvoices,
  // getInvoice,
  createInvoice,
  // updateInvoice,
  // deleteInvoice,
} from '../controllers/invoice-orbit'

router.route('/').get(getAllInvoices).post(createInvoice)

//router.route('/:id').get(getInvoice).patch(updateInvoice).delete(deleteInvoice)

// //Get all the Invoices for a particular User(userId)
// router.get(
//   '/getAllInvoicesByUserID/:userId',
//   async (req: Request, res: Response) => {
//     try {
//       const { userId } = req.params
//       const { status } = req.query

//       // Initialize filter with userId
//       let filter: any = { userId: userId }

//       // Add status to filter if provided
//       if (status && ['paid', 'pending', 'draft'].includes(status as string)) {
//         filter.status = status
//       } else if (status) {
//         return res.status(400).send('Invalid status value')
//       }

//       const invoices = await InvoiceOrbitModel.find(filter)

//       if (invoices.length === 0) {
//         return res.status(404).send('No records found for the user.')
//       }

//       res.status(200).send(invoices)
//     } catch (error) {
//       res.status(500).send(error)
//     }
//   }
// )

// //Post a new created Invoice to the database
// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const newInvoiceBody = req.body
//     const newInvoice = new InvoiceOrbitModel(newInvoiceBody)
//     const generatedInvoice = await newInvoice.save()

//     res.status(200).send(generatedInvoice)
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

// //Update specific Invoice in the database
// router.put('/:id', async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params
//     const newInvoiceBody = req.body
//     const invoice = await InvoiceOrbitModel.findByIdAndUpdate(
//       id,
//       newInvoiceBody,
//       { new: true }
//     )

//     if (!invoice) return res.status(404).send()

//     res.status(200).send(invoice)
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

// //Delete specific Invoice in the database
// router.delete('/:id', async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params
//     const invoice = await InvoiceOrbitModel.findByIdAndDelete(id)

//     if (!invoice) return res.status(404).send()

//     res.status(200).send(invoice)
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

export default router

import express from 'express'
const router = express.Router()
import { getAnalytics } from '../controllers/invoiceAnalytics'
import {
  getAllInvoices,
  getInvoice,
  createInvoice,
  deleteInvoice,
  updateInvoice,
} from '../controllers/invoice-orbit'

router.route('/').get(getAllInvoices).post(createInvoice)

router.route('/:id').get(getInvoice).patch(updateInvoice).delete(deleteInvoice)

router.route('/analytics').get(getAnalytics)

export default router

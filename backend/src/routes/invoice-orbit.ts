import express from 'express'
const router = express.Router()
import {
  getAllInvoices,
  getInvoice,
  createInvoice,
  deleteInvoice,
  updateInvoice,
} from '../controllers/invoice-orbit'

router.route('/').get(getAllInvoices).post(createInvoice)

router.route('/:id').get(getInvoice).patch(updateInvoice).delete(deleteInvoice)

export default router

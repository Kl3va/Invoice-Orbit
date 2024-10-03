import { createSlice } from '@reduxjs/toolkit'
import { emptyInvoice, mockInvoiceData } from 'data/mockData'
import { InvoiceOrbit } from 'types/invoiceTypes'

export interface InvoiceState {
  isFormOpen: boolean
  isEditing: boolean
  invoiceForm: InvoiceOrbit
}

const initialState: InvoiceState = {
  isFormOpen: false,
  isEditing: false,
  invoiceForm: emptyInvoice,
}

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    openNewInvoiceForm: (state) => {
      state.isFormOpen = true
      state.isEditing = false
      state.invoiceForm = emptyInvoice
    },
    openEditInvoiceForm: (state) => {
      state.isFormOpen = true
      state.isEditing = true
      state.invoiceForm = mockInvoiceData
    },
    closeInvoiceForm: (state) => {
      state.isFormOpen = false
      state.isEditing = false
      state.invoiceForm = emptyInvoice
    },
  },
})

export const { openEditInvoiceForm, openNewInvoiceForm, closeInvoiceForm } =
  invoiceSlice.actions

export default invoiceSlice.reducer

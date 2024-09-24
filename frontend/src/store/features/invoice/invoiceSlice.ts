import { createSlice } from '@reduxjs/toolkit'

export interface InvoiceState {
  isFormOpen: boolean
  isEditing: boolean
}

const initialState: InvoiceState = {
  isFormOpen: false,
  isEditing: false,
}

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    openNewInvoiceForm: (state) => {
      state.isFormOpen = true
      state.isEditing = false
    },
    openEditInvoiceForm: (state) => {
      state.isFormOpen = true
      state.isEditing = true
    },
    closeInvoiceForm: (state) => {
      state.isFormOpen = false
      state.isEditing = false
    },
  },
})

export const { openEditInvoiceForm, openNewInvoiceForm, closeInvoiceForm } =
  invoiceSlice.actions

export default invoiceSlice.reducer

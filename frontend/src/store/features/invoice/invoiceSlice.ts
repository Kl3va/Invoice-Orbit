import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { emptyInvoice } from 'data/mockData'
import { InvoiceOrbit } from 'types/invoiceTypes'

//Utils
import {
  apiCallWithErrorHandling,
  handleApiError,
  getHeaders,
} from 'utils/apiSimplify'

//Local Host
const API_URL = 'http://localhost:3001/api/v1/invoices'

export interface InvoiceState {
  invoices: InvoiceOrbit[]
  currentInvoice: InvoiceOrbit | null
  isLoading: boolean
  isFormOpen: boolean
  isEditing: boolean
  isCacheValid: boolean
  invoiceForm: InvoiceOrbit
}

const initialState: InvoiceState = {
  invoices: [],
  currentInvoice: null,
  isLoading: false,
  isFormOpen: false,
  isEditing: false,
  isCacheValid: false,
  invoiceForm: emptyInvoice,
}

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchAll',
  async (token: string, { getState, rejectWithValue }) => {
    const { invoice } = getState() as { invoice: InvoiceState }

    if (invoice.isCacheValid && invoice.invoices.length > 0) {
      return invoice.invoices
    }

    try {
      const headers = getHeaders(token)
      const response = await apiCallWithErrorHandling((instance) =>
        instance.get(API_URL, { headers })
      )
      return response
    } catch (error) {
      rejectWithValue(handleApiError(error))
    }
  }
)

export const fetchInvoiceWithId = createAsyncThunk(
  'invoices/fetchOne',
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
    try {
      const headers = getHeaders(token)
      const response = await apiCallWithErrorHandling((instance) =>
        instance.get(`${API_URL}/${id}`, { headers })
      )
      return response
    } catch (error) {
      rejectWithValue(handleApiError(error))
    }
  }
)

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
      if (state.currentInvoice) {
        state.isFormOpen = true
        state.isEditing = true
        state.invoiceForm = state.currentInvoice
      }
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

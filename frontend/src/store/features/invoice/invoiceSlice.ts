import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { emptyInvoice } from 'data/mockData'
import { InvoiceOrbit } from 'types/invoiceTypes'

//Utils
import {
  apiCallWithErrorHandling,
  handleApiError,
  getHeaders,
  ApiError,
} from 'utils/apiSimplify'

//Local Host
const API_URL = 'http://localhost:3001/api/v1/invoices'

export interface InvoiceState {
  invoices: InvoiceOrbit[]
  currentInvoice: InvoiceOrbit | null
  status: {
    fetchingAll: boolean
    fetchingOne: boolean
    creating: boolean
    updating: boolean
    deleting: boolean
  }
  isFormOpen: boolean
  isEditing: boolean
  isCacheValid: boolean
  invoiceForm: InvoiceOrbit
}

const initialState: InvoiceState = {
  invoices: [],
  currentInvoice: null,
  status: {
    fetchingAll: false,
    fetchingOne: false,
    creating: false,
    updating: false,
    deleting: false,
  },
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
      const response = await apiCallWithErrorHandling<InvoiceOrbit[]>(
        (instance) => instance.get(API_URL, { headers })
      )
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  }
)

export const fetchInvoiceWithId = createAsyncThunk(
  'invoices/fetchOne',
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
    try {
      const headers = getHeaders(token)
      const response = await apiCallWithErrorHandling<InvoiceOrbit>(
        (instance) => instance.get(`${API_URL}/${id}`, { headers })
      )
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  }
)

export const createInvoice = createAsyncThunk(
  'invoices/createInvoice',
  async (
    {
      token,
      invoiceData,
    }: { token: string; invoiceData: Partial<InvoiceOrbit> },
    { rejectWithValue }
  ) => {
    try {
      const headers = getHeaders(token)
      const response = await apiCallWithErrorHandling<InvoiceOrbit>(
        (instance) => instance.post(API_URL, invoiceData, { headers })
      )
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  }
)

export const updateInvoice = createAsyncThunk(
  'invoices/update',
  async (
    { token, invoice }: { token: string; invoice: Partial<InvoiceOrbit> },
    { rejectWithValue }
  ) => {
    try {
      const { _id: id, ...invoiceData } = invoice
      const headers = getHeaders(token)
      const response = await apiCallWithErrorHandling<InvoiceOrbit>(
        (instance) => instance.put(`${API_URL}/${id}`, invoiceData, { headers })
      )
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  }
)

export const deleteInvoice = createAsyncThunk(
  'invoices/delete',
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
    try {
      const headers = getHeaders(token)
      const response = apiCallWithErrorHandling((instance) =>
        instance.delete(`${API_URL}/${id}`, { headers })
      )
      return (await response).data
    } catch (error) {
      return rejectWithValue(handleApiError(error))
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
  extraReducers: (builder) => {
    builder
      //fetching all invoices
      .addCase(fetchInvoices.pending, (state) => {
        state.status.fetchingAll = true
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status.fetchingAll = false
        state.invoices = action.payload
        state.isCacheValid = true
      })
      .addCase(fetchInvoices.rejected, (state) => {
        state.status.fetchingAll = false
      })
      //fetching one invoice
      .addCase(fetchInvoiceWithId.pending, (state) => {
        state.status.fetchingOne = true
      })
      .addCase(fetchInvoiceWithId.fulfilled, (state, action) => {
        state.status.fetchingOne = false
        state.currentInvoice = action.payload
      })
      .addCase(fetchInvoiceWithId.rejected, (state) => {
        state.status.fetchingOne = false
      })
      //Creating an invoice
      .addCase(createInvoice.pending, (state) => {
        state.status.creating = true
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.status.creating = false
        state.invoices.push(action.payload)
        state.invoices.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        state.isCacheValid = false
      })
      .addCase(createInvoice.rejected, (state) => {
        state.status.creating = false
      })
      //Updating an invoice
      .addCase(updateInvoice.pending, (state) => {
        state.status.updating = true
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.status.updating = false
        state.currentInvoice = action.payload
        state.isCacheValid = false
      })
      .addCase(updateInvoice.rejected, (state) => {
        state.status.updating = false
      })
      //Deleting an invoice
      .addCase(deleteInvoice.pending, (state) => {
        state.status.deleting = true
      })
      .addCase(deleteInvoice.fulfilled, (state) => {
        state.status.deleting = false
        state.isCacheValid = false
      })
      .addCase(deleteInvoice.rejected, (state) => {
        state.status.deleting = false
      })
  },
})

export const { openEditInvoiceForm, openNewInvoiceForm, closeInvoiceForm } =
  invoiceSlice.actions

export default invoiceSlice.reducer

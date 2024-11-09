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
//const API_URL = 'http://localhost:3001/api/v1/invoices'
const API_URL = import.meta.env.VITE_API_URL

export interface InvoiceState {
  invoices: InvoiceOrbit[]
  currentInvoice: InvoiceOrbit | null
  status: {
    fetchingAll: boolean
    fetchingOne: boolean
    creating: 'draft' | 'pending' | null
    updating: boolean
    deleting: boolean
    fetchOneError: null | string
  }
  selectedStatus: string[]
  lastFetchedStatus: string[]
  isFormOpen: boolean
  isEditing: boolean
  isCacheValid: boolean
  invoiceForm: InvoiceOrbit
}

interface FetchInvoicesResponse {
  invoices: InvoiceOrbit[]
  fetchedStatus: string[]
}

const initialState: InvoiceState = {
  invoices: [],
  currentInvoice: null,
  status: {
    fetchingAll: false,
    fetchingOne: false,
    creating: null,
    updating: false,
    deleting: false,
    fetchOneError: null,
  },
  selectedStatus: [],
  lastFetchedStatus: [],
  isFormOpen: false,
  isEditing: false,
  isCacheValid: false,
  invoiceForm: emptyInvoice,
}

//Fetch All Invoices
export const fetchInvoices = createAsyncThunk<
  FetchInvoicesResponse,
  string,
  { state: { invoice: InvoiceState } }
>('invoices/fetchAll', async (token: string, { getState, rejectWithValue }) => {
  const { invoice } = getState() as { invoice: InvoiceState }

  // Skip cache if selectedStatus has changed
  const lastFetchedStatus = invoice.lastFetchedStatus || []
  const currentStatus = invoice.selectedStatus
  const statusHasChanged =
    lastFetchedStatus.length !== currentStatus.length ||
    lastFetchedStatus.some((status) => !currentStatus.includes(status))

  if (
    invoice.isCacheValid &&
    invoice.invoices.length > 0 &&
    !statusHasChanged
  ) {
    return {
      invoices: invoice.invoices,
      fetchedStatus: lastFetchedStatus,
    }
  }

  try {
    const headers = getHeaders(token)
    const response = await apiCallWithErrorHandling<{
      invoices: InvoiceOrbit[]
    }>((instance) =>
      instance.get(API_URL, {
        headers,
        params: { status: invoice.selectedStatus },
      })
    )
    return {
      invoices: response.data.invoices,
      fetchedStatus: invoice.selectedStatus,
    }
  } catch (error) {
    return rejectWithValue(handleApiError(error))
  }
})

//Fetch Invoice With Id
export const fetchInvoiceWithId = createAsyncThunk<
  InvoiceOrbit, // Fulfilled response type (Invoice)
  { token: string; id: string }, // Argument type
  { rejectValue: ApiError } // Rejected response type (Error)
>(
  'invoices/fetchOne',
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
    try {
      const headers = getHeaders(token)
      const response = await apiCallWithErrorHandling<{
        invoice: InvoiceOrbit
      }>((instance) => instance.get(`${API_URL}/${id}`, { headers }))
      return response.data.invoice
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  }
)

//Create Invoice
export const createInvoice = createAsyncThunk(
  'invoices/createInvoice',
  async (
    { token, invoice }: { token: string; invoice: Partial<InvoiceOrbit> },
    { rejectWithValue }
  ) => {
    try {
      const headers = getHeaders(token)
      const response = await apiCallWithErrorHandling<{
        invoice: InvoiceOrbit
      }>((instance) => instance.post(API_URL, invoice, { headers }))
      return response.data.invoice
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  }
)

//Update Invoice
export const updateInvoice = createAsyncThunk(
  'invoices/update',
  async (
    { token, invoice }: { token: string; invoice: Partial<InvoiceOrbit> },
    { rejectWithValue }
  ) => {
    try {
      const { _id: id, ...invoiceData } = invoice
      const headers = getHeaders(token)
      const response = await apiCallWithErrorHandling<{
        invoice: InvoiceOrbit
      }>((instance) =>
        instance.patch(`${API_URL}/${id}`, invoiceData, { headers })
      )
      return response.data.invoice
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  }
)

//Delete Invoice
export const deleteInvoice = createAsyncThunk(
  'invoices/delete',
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
    try {
      const headers = getHeaders(token)
      const response = await apiCallWithErrorHandling((instance) =>
        instance.delete(`${API_URL}/${id}`, { headers })
      )
      return response.data
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
    clearFetchOneError: (state) => {
      state.status.fetchOneError = null
    },
    updateStatus: (state, action: PayloadAction<string[]>) => {
      state.selectedStatus = action.payload
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
        state.invoices = action.payload.invoices
        state.lastFetchedStatus = action.payload.fetchedStatus
        state.isCacheValid = true
      })
      .addCase(fetchInvoices.rejected, (state) => {
        state.status.fetchingAll = false
      })
      //fetching one invoice
      .addCase(fetchInvoiceWithId.pending, (state) => {
        state.status.fetchingOne = true
        state.status.fetchOneError = null
      })
      .addCase(fetchInvoiceWithId.fulfilled, (state, action) => {
        state.status.fetchingOne = false
        state.status.fetchOneError = null
        state.currentInvoice = action.payload
      })
      .addCase(fetchInvoiceWithId.rejected, (state, action) => {
        state.status.fetchingOne = false
        state.status.fetchOneError =
          action.payload?.message ?? 'Sorry, an error occured!'
        state.currentInvoice = null
      })
      //Creating an invoice
      .addCase(createInvoice.pending, (state, action) => {
        const invoiceStatus = action.meta.arg.invoice.status
        if (invoiceStatus === 'draft' || invoiceStatus === 'pending') {
          state.status.creating = invoiceStatus
        } else {
          state.status.creating = null // Reset or leave creating as null for other statuses
        }
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.status.creating = null
        state.invoices.unshift(action.payload)
        state.isCacheValid = false
      })
      .addCase(createInvoice.rejected, (state) => {
        state.status.creating = null
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
        state.currentInvoice = null
      })
      .addCase(deleteInvoice.rejected, (state) => {
        state.status.deleting = false
      })
  },
})

export const {
  openEditInvoiceForm,
  openNewInvoiceForm,
  closeInvoiceForm,
  updateStatus,
  clearFetchOneError,
} = invoiceSlice.actions

export default invoiceSlice.reducer

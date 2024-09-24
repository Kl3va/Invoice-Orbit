import { configureStore } from '@reduxjs/toolkit'

import invoiceReducer, {
  InvoiceState,
} from 'store/features/invoice/invoiceSlice'
import modalReducer, { ModalProp } from 'store/features/modal/modalSlice'

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    modal: modalReducer,
  },
})

export type RootState = {
  invoice: InvoiceState
  modal: ModalProp
}

//export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

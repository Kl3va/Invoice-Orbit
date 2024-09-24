import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ModalProp {
  isFilterStatusOpen: boolean
  isConfirmDeleteOpen: boolean
  alert: { show: boolean; message: string; type: string }
}

const initialState: ModalProp = {
  isFilterStatusOpen: false,
  isConfirmDeleteOpen: false,
  alert: { show: false, message: '', type: '' },
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    controlFilterStatusModal: (state, action: PayloadAction<boolean>) => {
      state.isFilterStatusOpen = action.payload
    },
    controlConfirmDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.isConfirmDeleteOpen = action.payload
    },
    controlAlertModal: (state, action: PayloadAction<ModalProp['alert']>) => {
      state.alert = action.payload
    },
  },
})

export const {
  controlConfirmDeleteModal,
  controlFilterStatusModal,
  controlAlertModal,
} = modalSlice.actions

export default modalSlice.reducer

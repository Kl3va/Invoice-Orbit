import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  controlConfirmDeleteModal,
  controlFilterStatusModal,
} from 'store/features/modal/modalSlice'
import { closeInvoiceForm } from 'store/features/invoice/invoiceSlice'

export const BackgroundBlur = styled.aside<{
  confirm?: boolean
}>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.35);
  z-index: ${({ confirm }) => (confirm ? 120 : 98)};
  display: block;
`

const ConfirmationBg = () => {
  const dispatch = useAppDispatch()

  const { isConfirmDeleteOpen } = useAppSelector((state) => state.modal)

  const closeAllModals = () => {
    dispatch(closeInvoiceForm())
    dispatch(controlConfirmDeleteModal(false))
    dispatch(controlFilterStatusModal(false))
  }

  return (
    <BackgroundBlur
      confirm={isConfirmDeleteOpen}
      onClick={closeAllModals}
    ></BackgroundBlur>
  )
}

export default ConfirmationBg

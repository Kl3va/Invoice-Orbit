import { useAppDispatch } from 'store/hooks'
import { controlAlertModal } from 'store/features/modal/modalSlice'

export const useAlert = () => {
  const dispatch = useAppDispatch()

  const showAlert = (message: string, type: 'success' | 'failure') => {
    dispatch(controlAlertModal({ show: true, message, type }))
  }
  return showAlert
}

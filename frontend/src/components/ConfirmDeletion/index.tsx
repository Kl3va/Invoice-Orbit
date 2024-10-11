import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
//Redux
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { deleteInvoice } from 'store/features/invoice/invoiceSlice'
import { controlConfirmDeleteModal } from 'store/features/modal/modalSlice'

//ClerkDev
import { useAuth } from '@clerk/clerk-react'

//Custom Hooks
import { useAlert } from 'hooks/useAlert'

//Utils
import { handleApiError } from 'utils/apiSimplify'

//Styling
import { ConfirmDeletionContainer } from 'components/ConfirmDeletion/ConfirmDeletionStyles'

const ConfirmDeletion = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const showAlert = useAlert()

  const { currentInvoice, status } = useAppSelector((state) => state.invoice)

  const closeConfirmationModal = () => {
    dispatch(controlConfirmDeleteModal(false))
  }

  const deleteCurrentInvoice = async () => {
    const id = currentInvoice?._id
    try {
      const token = await getToken()
      if (!token || !id) {
        showAlert('Authentication failed', 'failure')
        return
      }
      await dispatch(deleteInvoice({ token, id })).unwrap()
      showAlert(`Invoice ${id} Deleted Successfully!`, 'success')
      closeConfirmationModal()
      navigate('/')
    } catch (error) {
      const apiError = handleApiError(error)
      showAlert(apiError?.message, 'failure')
    }
  }

  return (
    <ConfirmDeletionContainer role='dialog' aria-modal='true'>
      <h3>Confirm Deletion</h3>
      <p>
        {`Are you sure you want to delete invoice ${currentInvoice?._id}? This action cannot be
        undone.`}
      </p>
      <div>
        <button onClick={closeConfirmationModal}>Cancel</button>
        <button onClick={deleteCurrentInvoice} disabled={status.deleting}>
          {status.deleting ? (
            <ClipLoader size={24} color='var(--color-font-normal)' />
          ) : (
            'Delete'
          )}
        </button>
      </div>
    </ConfirmDeletionContainer>
  )
}

export default ConfirmDeletion

import { useAppDispatch } from 'store/hooks'
import { controlConfirmDeleteModal } from 'store/features/modal/modalSlice'

//Styling
import { ConfirmDeletionContainer } from 'components/ConfirmDeletion/ConfirmDeletionStyles'

const ConfirmDeletion = () => {
  const dispatch = useAppDispatch()

  const closeConfirmationModal = () =>
    dispatch(controlConfirmDeleteModal(false))

  return (
    <ConfirmDeletionContainer role='dialog' aria-modal='true'>
      <h3>Confirm Deletion</h3>
      <p>
        Are you sure you want to delete invoice #XM9141? This action cannot be
        undone.
      </p>
      <div>
        <button onClick={closeConfirmationModal}>Cancel</button>
        <button>Delete</button>
      </div>
    </ConfirmDeletionContainer>
  )
}

export default ConfirmDeletion

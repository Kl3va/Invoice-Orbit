import { Outlet } from 'react-router-dom'
//COMPONENTS
import ConfirmationBg from 'components/Background/ConfirmationBg'
import MainFormTemplate from 'components/Main-Form/MainFormTemplate'
import Alert from 'components/Alert'

//REDUX
import { useAppSelector } from 'store/hooks'

const Layout = () => {
  const { isConfirmDeleteOpen } = useAppSelector((state) => state.modal)
  const { isFormOpen } = useAppSelector((state) => state.invoice)
  return (
    <>
      <Outlet />
      <MainFormTemplate />
      <Alert />
      {(isFormOpen || isConfirmDeleteOpen) && <ConfirmationBg />}
    </>
  )
}

export default Layout

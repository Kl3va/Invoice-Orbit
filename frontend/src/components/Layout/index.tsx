import { Outlet } from 'react-router-dom'
import ConfirmationBg from 'components/Background/ConfirmationBg'
import MainFormTemplate from 'components/Main-Form/MainFormTemplate'

const Layout = () => {
  return (
    <>
      <Outlet />
      <MainFormTemplate />
      <ConfirmationBg />
    </>
  )
}

export default Layout

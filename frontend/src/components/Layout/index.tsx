import { Outlet } from 'react-router-dom'
import MainFormTemplate from 'components/Main-Form/MainFormTemplate'

const Layout = () => {
  return (
    <>
      <Outlet />
      <MainFormTemplate />
    </>
  )
}

export default Layout

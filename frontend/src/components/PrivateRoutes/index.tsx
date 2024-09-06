import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const PrivateRoute = () => {
  const { user } = useUser()
  return user ? <Outlet /> : <Navigate to='/auth' />
}

export default PrivateRoute

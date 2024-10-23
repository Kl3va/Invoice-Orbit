import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const PrivateRoute = () => {
  const { user, isLoaded } = useUser()
  const location = useLocation()

  if (!isLoaded) {
    return null
  }

  if (!user) {
    return (
      <Navigate
        to='/auth'
        state={{ from: location.pathname + location.search }}
        replace
      />
    )
  }

  return <Outlet />
}

export default PrivateRoute

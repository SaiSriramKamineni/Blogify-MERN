import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute() {
  const { user } = useSelector((state) => state.auth)

  return !user ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute

import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const ProtectedRoute = () => {

const { token } = useAuthStore()

console.log("token", token)


  if (!token) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoute

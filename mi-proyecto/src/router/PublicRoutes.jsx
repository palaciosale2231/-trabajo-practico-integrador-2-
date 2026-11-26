import { Navigate, Outlet } from 'react-router'

function PublicRoutes() {
  const isLogged = localStorage.getItem('isLogged') === 'true'

  return isLogged ? <Navigate replace to="/" /> : <Outlet />
}

export default PublicRoutes

import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

function AppRouter() {
  const isLogged = localStorage.getItem('isLogged') === 'true'

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<HomePage />} index />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
        </Route>
        <Route
          element={<Navigate replace to={isLogged ? '/' : '/login'} />}
          path="*"
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { getApiErrorMessage, getApiUrl } from '../config/api'

function Navbar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleLogout = async () => {
    setErrorMessage('')
    setIsLoggingOut(true)

    try {
      const response = await fetch(getApiUrl('auth/logout'), {
        method: 'POST',
        credentials: 'include',
      })
      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(
          getApiErrorMessage(
            response.status,
            responseData,
            'No se pudo cerrar la sesión.',
          ),
        )
      }

      localStorage.removeItem('isLogged')
      navigate('/login', {
        state: {
          successMessage:
            responseData.message || 'Sesión cerrada correctamente.',
        },
      })
    } catch (requestError) {
      setErrorMessage(
        requestError.message || 'No se pudo conectar con el servidor.',
      )
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="border-b border-white/10 bg-slate-950/80">
      {errorMessage && (
        <p
          className="mx-auto max-w-6xl px-5 pt-4 text-sm text-rose-200 sm:px-8"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8"
      >
        <Link className="text-sm font-bold tracking-[0.2em] text-white" to="/">
          BITÁCORA
        </Link>
        <div className="flex items-center gap-5">
          <Link
            className="text-sm font-medium text-slate-300 transition hover:text-white"
            to="/"
          >
            Inicio
          </Link>
          <button
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-300/50 hover:text-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoggingOut}
            onClick={handleLogout}
            type="button"
          >
            {isLoggingOut ? 'Cerrando...' : 'Cerrar sesión'}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

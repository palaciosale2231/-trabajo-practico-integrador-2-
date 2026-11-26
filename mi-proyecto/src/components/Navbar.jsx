import { Link, useNavigate } from 'react-router'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isLogged')
    navigate('/login')
  }

  return (
    <header className="border-b border-white/10 bg-slate-950/80">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          className="text-sm font-bold tracking-[0.2em] text-white"
          to="/"
        >
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
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-300/50 hover:text-emerald-200"
            onClick={handleLogout}
            type="button"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

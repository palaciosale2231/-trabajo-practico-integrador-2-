import { Link } from 'react-router'
import useForm from '../hooks/useForm'

const INITIAL_VALUES = {
  email: '',
  password: '',
}

function LoginPage() {
  const { formData, handleInputChange } = useForm(INITIAL_VALUES)

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-7 shadow-2xl shadow-black/30 sm:p-9">
        <Link
          to="/"
          className="text-sm font-semibold tracking-wide text-emerald-300"
        >
          BITÁCORA
        </Link>
        <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
          Qué bueno tenerte de vuelta
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Inicia sesión
        </h1>
        <p className="mt-3 leading-6 text-slate-400">
          Ingresa tus datos para volver a tus lecturas favoritas.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-200">
            Correo electrónico
            <input
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300"
              name="email"
              onChange={handleInputChange}
              placeholder="tu@correo.com"
              required
              type="email"
              value={formData.email}
            />
          </label>
          <label className="block text-sm font-medium text-slate-200">
            Contraseña
            <input
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300"
              name="password"
              onChange={handleInputChange}
              placeholder="Tu contraseña"
              required
              type="password"
              value={formData.password}
            />
          </label>
          <button
            className="w-full rounded-xl bg-emerald-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            type="submit"
          >
            Ingresar
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-400">
          ¿Todavía no tienes cuenta?{' '}
          <Link
            className="font-semibold text-emerald-300 hover:text-emerald-200"
            to="/register"
          >
            Regístrate
          </Link>
        </p>
      </section>
    </main>
  )
}

export default LoginPage

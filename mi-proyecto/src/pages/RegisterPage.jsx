import { useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import useForm from '../hooks/useForm'
import {
  getApiErrorMessage,
  getApiUrl,
  getValidationErrors,
} from '../config/api'

const INITIAL_VALUES = {
  username: '',
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  biography: '',
  avatar_url: '',
  birth_date: '',
}

const INPUT_FIELDS = [
  { name: 'username', label: 'Nombre de usuario', type: 'text', required: true },
  { name: 'email', label: 'Correo electrónico', type: 'email', required: true },
  { name: 'password', label: 'Contraseña', type: 'password', required: true },
  { name: 'first_name', label: 'Nombre', type: 'text', required: true },
  { name: 'last_name', label: 'Apellido', type: 'text', required: true },
  { name: 'avatar_url', label: 'URL de avatar', type: 'url' },
  { name: 'birth_date', label: 'Fecha de nacimiento', type: 'date' },
]

function RegisterPage() {
  const { formData, handleInputChange, handleReset } = useForm(INITIAL_VALUES)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setValidationErrors([])
    setIsLoading(true)

    try {
      const response = await fetch(getApiUrl('auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })
      const responseData = await response.json()

      if (!response.ok) {
        if (response.status === 400) {
          setValidationErrors(getValidationErrors(responseData))
          throw new Error('Revisa los datos ingresados.')
        }

        throw new Error(
          getApiErrorMessage(
            response.status,
            responseData,
            'No se pudo crear la cuenta.',
          ),
        )
      }

      handleReset()
      navigate('/login', {
        state: {
          successMessage:
            responseData.message || 'Tu cuenta se creó correctamente.',
        },
      })
    } catch (requestError) {
      setErrorMessage(
        requestError.message || 'No se pudo conectar con el servidor.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <section className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900/80 p-7 shadow-2xl shadow-black/30 sm:p-9">
        <Link
          to="/"
          className="text-sm font-semibold tracking-wide text-emerald-300"
        >
          BITÁCORA
        </Link>
        <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
          Una comunidad de lectores
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Crea tu cuenta
        </h1>
        <p className="mt-3 leading-6 text-slate-400">
          Comparte tus ideas y descubre nuevas historias.
        </p>

        {errorMessage && (
          <p
            className="mt-6 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
        {validationErrors.length > 0 && (
          <ul
            className="mt-4 space-y-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
            role="alert"
          >
            {validationErrors.map((error) => (
              <li key={error.id}>{error.message}</li>
            ))}
          </ul>
        )}

        <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
          {INPUT_FIELDS.map((field) => (
            <label
              className="block text-sm font-medium text-slate-200"
              htmlFor={field.name}
              key={field.name}
            >
              {field.label}
              <input
                autoComplete={
                  field.name === 'password' ? 'new-password' : field.name
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300"
                id={field.name}
                name={field.name}
                onChange={handleInputChange}
                minLength={field.name === 'username' ? 3 : undefined}
                required={field.required}
                type={field.type}
                value={formData[field.name]}
              />
            </label>
          ))}
          <label
            className="block text-sm font-medium text-slate-200 sm:col-span-2"
            htmlFor="biography"
          >
            Sobre ti
            <textarea
              className="mt-2 min-h-24 w-full resize-y rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300"
              id="biography"
              name="biography"
              onChange={handleInputChange}
              placeholder="Cuéntanos qué te gusta leer..."
              value={formData.biography}
            />
          </label>
          <button
            className="rounded-xl bg-emerald-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-400">
          ¿Ya tienes cuenta?{' '}
          <Link
            className="font-semibold text-emerald-300 hover:text-emerald-200"
            to="/login"
          >
            Inicia sesión
          </Link>
        </p>
      </section>
    </main>
  )
}

export default RegisterPage

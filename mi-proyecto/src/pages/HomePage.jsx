import { useLocation } from 'react-router'
import useFetch from '../hooks/useFetch'
import { getApiUrl } from '../config/api'

function HomePage() {
  const { data, isLoading, error } = useFetch(getApiUrl('articles'))
  const location = useLocation()
  const articles = Array.isArray(data)
    ? data
    : Array.isArray(data?.articles)
      ? data.articles
      : []

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-16 sm:px-8 lg:pt-24">
      <section className="mb-14 max-w-3xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
          Ideas para leer despacio
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Una bitácora de historias, ideas y descubrimientos.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Artículos de nuestra comunidad, reunidos en un espacio para aprender y
          compartir.
        </p>
        {location.state?.successMessage && (
          <p
            className="mt-6 rounded-xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100"
            role="status"
          >
            {location.state.successMessage}
          </p>
        )}
      </section>

      <section aria-labelledby="articles-heading">
        <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-sm text-slate-400">Explora la comunidad</p>
            <h2
              id="articles-heading"
              className="mt-1 text-2xl font-semibold text-white"
            >
              Últimos artículos
            </h2>
          </div>
          <span className="hidden text-sm text-slate-500 sm:block">
            Lecturas seleccionadas
          </span>
        </div>

        {isLoading && (
          <p
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center text-slate-300"
            role="status"
          >
            Cargando artículos...
          </p>
        )}

        {error && (
          <p
            className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-5 py-4 text-rose-200"
            role="alert"
          >
            {error}
          </p>
        )}

        {!isLoading && !error && articles.length === 0 && (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center text-slate-300">
            Todavía no hay artículos publicados. Vuelve pronto para descubrir
            nuevas historias.
          </p>
        )}

        {!isLoading && !error && articles.length > 0 && (
          <ul className="grid gap-5 md:grid-cols-2">
            {articles.map((article) => (
              <li
                key={article.id}
                className="group rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-emerald-300/40 hover:bg-slate-900"
              >
                <p className="text-sm font-medium text-emerald-300">
                  {article.author?.username ||
                    article.author?.alias ||
                    (typeof article.author === 'string'
                      ? article.author
                      : 'Comunidad')}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white transition group-hover:text-emerald-100">
                  {article.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {article.excerpt || 'Este artículo todavía no tiene resumen.'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default HomePage

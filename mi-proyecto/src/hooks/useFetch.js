import { useCallback, useEffect, useState } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = useCallback(
    async (signal) => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(url, {
          credentials: 'include',
          signal,
        })
        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(
            response.status === 500
              ? 'Ocurrió un error interno. Inténtalo nuevamente.'
              : responseData.message || 'No se pudieron cargar los datos.',
          )
        }

        setData(responseData)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'No se pudo conectar con el servidor.')
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false)
        }
      }
    },
    [url],
  )

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller.signal)

    return () => controller.abort()
  }, [fetchData])

  return { data, isLoading, error }
}

export default useFetch

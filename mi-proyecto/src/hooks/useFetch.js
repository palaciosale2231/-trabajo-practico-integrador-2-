import { useCallback, useEffect, useState } from 'react'
import { getApiErrorMessage } from '../config/api'

function useFetch(url) {
  const [requestState, setRequestState] = useState({
    url,
    data: null,
    isLoading: true,
    error: '',
  })

  const fetchData = useCallback(
    async (signal) => {
      let responseData = null
      let requestError = ''
      try {
        const response = await fetch(url, {
          credentials: 'include',
          signal,
        })
        const parsedData = await response.json()

        if (!response.ok) {
          throw new Error(
            getApiErrorMessage(
              response.status,
              parsedData,
              'No se pudieron cargar los datos.',
            ),
          )
        }
        responseData = parsedData
      } catch (caughtError) {
        if (caughtError.name !== 'AbortError') {
          requestError =
            caughtError.message || 'No se pudo conectar con el servidor.'
        }
      } finally {
        if (!signal.aborted) {
          setRequestState({
            url,
            data: requestError ? null : responseData,
            isLoading: false,
            error: requestError,
          })
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

  const isCurrentRequest = requestState.url === url

  return {
    data: isCurrentRequest ? requestState.data : null,
    isLoading: !isCurrentRequest || requestState.isLoading,
    error: isCurrentRequest ? requestState.error : '',
  }
}

export default useFetch

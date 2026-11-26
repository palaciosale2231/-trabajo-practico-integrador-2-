const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
).replace(/\/+$/, '')

export function getApiUrl(path) {
  return `${API_BASE_URL}/${path.replace(/^\/+/, '')}`
}

export function getApiErrorMessage(status, responseData, fallback) {
  if (status === 401) {
    return 'Credenciales incorrectas o sesión inexistente.'
  }

  if (status === 403) {
    return 'No tienes permisos para realizar esta operación.'
  }

  if (status >= 500) {
    return 'Ocurrió un error interno. Inténtalo nuevamente.'
  }

  return responseData?.message || fallback
}

export function getValidationErrors(responseData) {
  if (Array.isArray(responseData?.errors)) {
    return responseData.errors.map((error, index) => ({
      id: `${error.path || error.param || 'validacion'}-${error.msg || index}`,
      message: error.msg || error.message || 'Revisa este campo.',
    }))
  }

  if (responseData?.message) {
    return [{ id: 'response-message', message: responseData.message }]
  }

  return []
}

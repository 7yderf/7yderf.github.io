import { ref } from 'vue'

interface ErrorDetail {
  detail: string
  status: number | undefined
}

// Forma esperada de errores de API tipo axios (err.response.data.*).
// Si el proyecto usa $fetch/ofetch en vez de axios, el shape de error difiere
// (ofetch expone el body en err.data, no err.response.data) — ajustar entonces.
interface ApiErrorLike {
  message?: string
  status?: number
  response?: {
    status?: number
    data?: {
      message?: string
      errors?: Record<string, string>
      error?: { message?: string }
    }
  }
}

export function useErrorHandler() {
  const { alertWithImage } = useAlerts()
  const errors = ref<ErrorDetail | null>(null)

  function handleError(err: unknown) {
    const e = err as ApiErrorLike
    const status = e?.response?.status ?? e?.status

    if (status === 401 || status === 403) {
      alertWithImage('clock', 'No autorizado', 'La sesión ha expirado', 10000)
      return null
    }

    if (status === 500) {
      alertWithImage('server', 'Error en el servidor', 'Intente más tarde', 3000)
      return null
    }

    const apiErrors = e?.response?.data?.errors
    let detail =
      e?.response?.data?.error?.message ||
      e?.response?.data?.message ||
      'Error desconocido'

    if (apiErrors && Object.keys(apiErrors).length > 0) {
      detail = Object.values(apiErrors).join('\n')
    }

    const errorDetail: ErrorDetail = { detail, status }
    errors.value = errorDetail
    return errorDetail
  }

  return { handleError, errors }
}

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

export interface ApiError {
  message: string
  status?: number
  [key: string]: any
}

const getHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${token}`,
})

const createAxiosInstanceWithTimeout = () => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)

  const instance = axios.create({
    signal: controller.signal,
  })

  return { instance, timeoutId }
}

const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message: string }>
    if (axiosError.code === 'ERR_CANCELED') {
      return { message: 'Request timed out. Please try again.' }
    }
    if (axiosError.message === 'Network Error') {
      return {
        message: 'Network error. Please check your internet connection.',
      }
    }
    if (axiosError.response) {
      return {
        message: axiosError.response.data?.message || axiosError.message,
        status: axiosError.response.status,
      }
    }
    return {
      message: axiosError.message || 'An error occurred with the request',
    }
  }
  if (error instanceof Error) {
    return { message: error.message }
  }
  return { message: 'An unknown error occurred' }
}

const apiCallWithErrorHandling = async <T>(
  apiCall: (instance: AxiosInstance) => Promise<AxiosResponse<T>>
): Promise<AxiosResponse<T>> => {
  const { instance, timeoutId } = createAxiosInstanceWithTimeout()
  try {
    const result = await apiCall(instance)
    clearTimeout(timeoutId)
    return result
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export {
  createAxiosInstanceWithTimeout,
  apiCallWithErrorHandling,
  handleApiError,
  getHeaders,
}

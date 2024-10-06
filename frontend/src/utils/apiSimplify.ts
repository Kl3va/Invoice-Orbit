import axios, { AxiosInstance, AxiosResponse } from 'axios'

export interface ApiError {
  message: string
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
    if (error.code === 'ERR_CANCELED') {
      return { message: 'Request timed out' }
    }
    return error.response?.data || { message: error.message }
  }
  return { message: 'An unknown error occured!' }
}

const apiCallWithErrorHandling = async <T>(
  apiCall: (instance: AxiosInstance) => Promise<AxiosResponse<T>>
): Promise<AxiosResponse<T>> => {
  const { instance, timeoutId } = createAxiosInstanceWithTimeout()
  try {
    const result = await apiCall(instance)
    clearTimeout(timeoutId)
    return result
  } finally {
    clearTimeout(timeoutId)
  }
}

export {
  createAxiosInstanceWithTimeout,
  apiCallWithErrorHandling,
  handleApiError,
  getHeaders,
}

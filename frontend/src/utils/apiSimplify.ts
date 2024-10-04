import axios, { AxiosInstance } from 'axios'

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

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ERR_CANCELED') {
      return { message: 'Request timed out' }
    }
    return error.response?.data
  }
  return { message: 'An unknown error occured!' }
}

const apiCallWithErrorHandling = async <T>(
  apiCall: (instance: AxiosInstance) => Promise<T>
) => {
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

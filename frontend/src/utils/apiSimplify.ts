import axios, { AxiosInstance } from 'axios'

const createAxiosInstanceWithTimeout = () => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)

  const instance = axios.create({
    signal: controller.signal,
  })

  return { instance, timeoutId }
}

const apiCallWithErrorHandling = async () => {}

export { createAxiosInstanceWithTimeout, apiCallWithErrorHandling }

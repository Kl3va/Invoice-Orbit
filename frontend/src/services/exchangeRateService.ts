import { handleApiError, apiCallWithErrorHandling } from 'utils/apiSimplify'

const EXCHANGE_RATE_APIKEY =
  process.env.REACT_APP_EXCHANGE_RATE_API_KEY ?? 'key'
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 //7days

export interface ExchangeRates {
  [key: string]: number
}

interface ExchangeApiResponse {
  conversion_rates: ExchangeRates
  time_last_update_utc: string
}

interface CachedRates {
  rates: ExchangeRates
  timestamp: number
}

const CACHE_KEY = 'exchangeRates'

const getStoredRates = (): CachedRates | null => {
  const stored = localStorage.getItem(CACHE_KEY)
  return stored ? JSON.parse(stored) : null
}

const storeRates = (rates: ExchangeRates) => {
  const cacheData: CachedRates = {
    rates,
    timestamp: Date.now(),
  }
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
}

const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION
}

const exchangeRates = {
  async fetchExchangeRates(): Promise<ExchangeRates> {
    const cacheData = getStoredRates()
    if (cacheData && isCacheValid(cacheData.timestamp)) {
      return cacheData.rates
    }

    try {
      const response = await apiCallWithErrorHandling<ExchangeApiResponse>(
        (instance) =>
          instance.get(
            `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_APIKEY}/latest/USD`
          )
      )
      const rates = response.data.conversion_rates
      storeRates(rates)
      return rates
    } catch (error) {
      throw handleApiError(error)
    }
  },

  convertToUSD(
    amount: number,
    fromCurrency: string,
    rates: ExchangeRates
  ): number {
    if (fromCurrency === 'USD') return amount
    if (!rates[fromCurrency]) {
      console.warn(`No exchange rate found for ${fromCurrency}`)
      return amount
    }
    return amount / rates[fromCurrency]
  },

  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(amount)
  },
}

export { exchangeRates }

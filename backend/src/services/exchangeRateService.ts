import { logger } from '../utils/logger'
import axios from 'axios'
import NodeCache from 'node-cache'

const CACHE_DURATION = 7 * 24 * 24 * 60

const cache = new NodeCache({
  stdTTL: CACHE_DURATION,
  checkperiod: 86400,
})

const CACHE_KEY = 'exchangeRates'
const EXCHANGE_RATE_APIKEY = process.env.EXCHANGE_RATE_API_KEY || 'key'

interface ExchangeRates {
  [key: string]: number
}

interface ExchangeApiResponse {
  conversion_rates: ExchangeRates
  time_last_update_utc: string
}

class ExchangeRateService {
  private async fetchFreshRates(): Promise<ExchangeRates> {
    try {
      const response = await axios.get<ExchangeApiResponse>(
        `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_APIKEY}/latest/USD`
      )

      const rates = response.data.conversion_rates
      cache.set(CACHE_KEY, rates)
      logger.info('Fresh exchange rates fetched and cached')
      return rates
    } catch (error) {
      logger.error('Error fetching exchange rates:', error)
      throw new Error('Failed to fetch exchange rates')
    }
  }

  async getRates(): Promise<ExchangeRates> {
    try {
      const cacheData = cache.get<ExchangeRates>(CACHE_KEY)
      if (cacheData) {
        logger.info('Using cached rates')
        return cacheData
      }
      return await this.fetchFreshRates()
    } catch (error) {
      const expiredRates = cache.get<ExchangeRates>(CACHE_KEY)
      if (expiredRates) {
        logger.warn('Using expired rates due to fetch error')
        return expiredRates
      }

      throw error
    }
  }

  convertToUSD(
    amount: number,
    fromCurrency: string,
    rates: ExchangeRates
  ): number {
    if (fromCurrency === 'USD') return amount
    if (!rates[fromCurrency]) {
      logger.warn(`No exchange rate found for ${fromCurrency}`)
      throw new Error(`Unsupported currency: ${fromCurrency}`)
    }
    return amount / rates[fromCurrency]
  }

  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(amount)
  }

  clearCache(): void {
    cache.del(CACHE_KEY)
    logger.info('Exchange rates cache cleared')
  }

  getCacheStats(): {
    hasCache: boolean
    timeToExpiry: number | undefined
  } {
    const ttl = cache.getTtl(CACHE_KEY)
    return {
      hasCache: cache.has(CACHE_KEY),
      timeToExpiry: ttl ? ttl - Date.now() : undefined,
    }
  }
}

export const exchangeRateService = new ExchangeRateService()

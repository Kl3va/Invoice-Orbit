import { Response, Request, NextFunction } from 'express'
import { AuthObject } from '@clerk/express'
import { StatusCodes } from 'http-status-codes'
import { InvoiceOrbitModel, Item, InvoiceOrbit } from '../schema/invoice-orbit'
import { exchangeRateService } from '../services/exchangeRateService'
import { logger } from '../utils/logger'
import { AnalyticsResponse } from '../types'

const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as Request & { auth: AuthObject }).auth.userId

    //Fetch all invoices for user
    const invoices = await InvoiceOrbitModel.find({ userId }).sort('-createdAt')

    // Get exchange rates (will use cache if available)
    const rates = await exchangeRateService.getRates()
    const cacheStats = exchangeRateService.getCacheStats()

    //Process pending invoices
    const pendingInvoices = invoices
      .filter((invoice) => invoice.status === 'pending')
      .map((invoice) => {
        try {
          return {
            client: invoice.clientName,
            pendingAmount: exchangeRateService.convertToUSD(
              invoice.total,
              invoice.currency,
              rates
            ),
            originalAmount: invoice.total,
            originalCurrency: invoice.currency,
          }
        } catch (error) {
          logger.warn(
            `Currency conversion failed for invoice ${invoice._id}:`,
            error
          )
          return null
        }
      })
      .filter(
        (invoice): invoice is NonNullable<typeof invoice> => invoice !== null
      )
      .sort((a, b) => b.pendingAmount - a.pendingAmount)

    //Process revenue by month
    const revenueByMonth = invoices
      .filter((invoice) => invoice.status === 'paid')
      .reduce((acc, invoice) => {
        const month = new Date(invoice.createdAt).toLocaleString('default', {
          month: 'short',
        })
        try {
          const amountInUSD = exchangeRateService.convertToUSD(
            invoice.total,
            invoice.currency,
            rates
          )

          const existingMonth = acc.find((item) => item.month === month)
          if (existingMonth) {
            existingMonth.revenue += amountInUSD
          } else {
            acc.push({ month, revenue: amountInUSD })
          }
        } catch (error) {
          logger.warn(
            `Currency conversion failed for invoice ${invoice._id}:`,
            error
          )
        }
        return acc
      }, [] as { month: string; revenue: number }[])
      .sort((a, b) => {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]
        return months.indexOf(a.month) - months.indexOf(b.month)
      })

    // Process status distribution
    const statusDistribution = invoices.reduce((acc, invoice) => {
      acc[invoice.status] = (acc[invoice.status] || 0) + 1
      return acc
    }, {} as { [key: string]: number })

    const statusData = Object.entries(statusDistribution).map(
      ([name, value]) => ({ name, value })
    )

    const analytics: AnalyticsResponse = {
      pendingInvoices,
      revenueByMonth,
      statusDistribution: statusData,
      metadata: {
        lastUpdated: new Date().toISOString(),
        baseCurrency: 'USD',
        exchangeRatesStatus: cacheStats.hasCache ? 'cached' : 'fresh',
      },
    }

    res.status(StatusCodes.OK).json(analytics)
  } catch (error) {
    logger.error('Analytics generation failed:', error)
    next(error)
  }
}

export { getAnalytics }

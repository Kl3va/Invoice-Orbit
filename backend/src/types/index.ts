export interface AnalyticsResponse {
  pendingInvoices: {
    client: string
    pendingAmount: number
    originalAmount: string
    // originalCurrency: string
  }[]
  revenueByMonth: {
    month: string
    revenue: number
  }[]
  statusDistribution: {
    name: string
    value: number
  }[]
  // metadata: {
  //   lastUpdated: string
  //   baseCurrency: string
  //   exchangeRatesStatus: string
  // }
}

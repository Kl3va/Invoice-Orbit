export interface AnalyticsResponse {
  pendingInvoices: {
    client: string
    pendingAmount: number
    originalAmount: string
  }[]
  revenueByMonth: {
    month: string
    revenue: number
  }[]
  statusDistribution: {
    name: string
    value: number
  }[]
}

import { useEffect, useState } from 'react'
import {
  getHeaders,
  apiCallWithErrorHandling,
  ApiError,
} from 'utils/apiSimplify'
import { useAuth } from '@clerk/clerk-react'
import { LoadingSpinnerWrapper } from 'pages/invoice-details/InvoiceDetailsPageStyles'
import { ClipLoader } from 'react-spinners'
import { useAlert } from 'hooks/useAlert'
import { pieColors } from 'data/mockData'
import { formatCurrency } from 'utils/invoiceFormatter'

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'

import {
  AnalyticsContainer,
  AnalyticsMain,
  CardsWrapper,
  CardContent,
  Card,
  CardHeading,
  NoDataHeading,
} from 'pages/analytics/AnalyticsStyles'

const API_URL = import.meta.env.VITE_API_URL

const Analytics = () => {
  const { getToken } = useAuth()
  const showAlert = useAlert()
  const [analyticsData, setAnalyticsData] = useState<{
    pendingInvoices: []
    revenueByMonth: []
    statusDistribution: []
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken()

        if (!token) {
          showAlert('Authentication Failed!', 'failure')
          return
        }
        const headers = getHeaders(token)
        const response = await apiCallWithErrorHandling((instance) =>
          instance.get(`${API_URL}/analytics`, {
            headers,
          })
        )
        setAnalyticsData(response.data)
      } catch (error) {
        const apiError = error as ApiError
        showAlert(apiError.message, 'failure')
        setError(apiError.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [getToken])

  // Custom tooltip for the bar chart
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div>
          <p>{label}</p>
          <p>USD: {formatCurrency(data.pendingAmount)}</p>
          <p>Original: {data.originalAmount}</p>
        </div>
      )
    }
    return null
  }

  // Custom tooltip for the line chart
  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div>
          <p>{label}</p>
          <p>Revenue: {formatCurrency(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <LoadingSpinnerWrapper>
        <ClipLoader size={78} color='var(--color-accent-100)' />
      </LoadingSpinnerWrapper>
    )
  }

  if (error !== null) {
    return <NoDataHeading>{error}</NoDataHeading>
  }

  if (!analyticsData) {
    return <NoDataHeading>No Data Found!</NoDataHeading>
  }

  return (
    <AnalyticsMain>
      <AnalyticsContainer>
        <h1>Analytics Board</h1>
        <p>All amounts are converted to USD for comparison</p>
        <CardsWrapper>
          <Card>
            <CardHeading>Pending Invoices by Client</CardHeading>
            {analyticsData.pendingInvoices.length === 0 ? (
              <h3>No pending invoices available</h3>
            ) : (
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart data={analyticsData.pendingInvoices}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='client' />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Legend />
                    <Bar
                      dataKey='pendingAmount'
                      fill='var(--color-accent-100)'
                      name='Pending Amount (USD)'
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            )}
          </Card>

          <Card>
            <CardHeading>Revenue Trend</CardHeading>
            {analyticsData.revenueByMonth.length === 0 ? (
              <h3>No revenue generated!</h3>
            ) : (
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <LineChart data={analyticsData.revenueByMonth}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='month' />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip content={<CustomLineTooltip />} />
                    <Legend />
                    <Line
                      type='monotone'
                      dataKey='revenue'
                      stroke='var(--color-accent-100)'
                      name='Revenue (USD)'
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            )}
          </Card>

          <Card>
            <CardHeading>Invoice Status Distribution</CardHeading>

            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    dataKey='value'
                    data={analyticsData.statusDistribution}
                    fill='var(--color-accent-100)'
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {analyticsData.statusDistribution.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </CardsWrapper>
      </AnalyticsContainer>
    </AnalyticsMain>
  )
}

export default Analytics

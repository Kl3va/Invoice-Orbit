import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { ApiError } from 'utils/apiSimplify'
import { ClipLoader } from 'react-spinners'
import { LoadingSpinnerWrapper } from 'pages/invoice-details/InvoiceDetailsPageStyles'
import {
  updateStatus,
  fetchInvoices,
} from 'store/features/invoice/invoiceSlice'
import { useAlert } from 'hooks/useAlert'

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
} from 'recharts'

import {
  AnalyticsContainer,
  AnalyticsMain,
  CardsWrapper,
  CardContent,
  Card,
  CardHeading,
} from 'pages/analytics/AnalyticsStyles'

// const pendingInvoicesData = [
//   { client: 'Client A', pendingAmount: 5000 },
//   { client: 'Client B', pendingAmount: 3500 },
//   { client: 'Client C', pendingAmount: 7200 },
//   { client: 'Client D', pendingAmount: 2800 },
//   { client: 'Client E', pendingAmount: 6100 },
// ]

// const lineData = [
//   { month: 'Jan', revenue: 4000 },
//   { month: 'Feb', revenue: 3000 },
//   { month: 'Mar', revenue: 2000 },
//   { month: 'Apr', revenue: 2780 },
//   { month: 'May', revenue: 1890 },
//   { month: 'Jun', revenue: 2390 },
// ]

// const pieData = [
//   { name: 'paid', value: 400 },
//   { name: 'pending', value: 300 },
//   { name: 'draft', value: 200 },
// ]

const Analytics = () => {
  const { getToken } = useAuth()
  const showAlert = useAlert()
  const dispatch = useAppDispatch()
  const { invoices, lastFetchedStatus, status } = useAppSelector(
    (state) => state.invoice
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken()
        // Update status in the redux state
        if (lastFetchedStatus.length > 0) {
          dispatch(updateStatus([]))
        }

        // Pass the token to the fetchInvoices action
        if (token) {
          await dispatch(fetchInvoices(token)).unwrap()
        }
      } catch (error) {
        const apiError = error as ApiError
        showAlert(apiError.message, 'failure')
      }
    }

    fetchData()
  }, [dispatch, getToken])

  const pendingInvoicesData = invoices
    .filter((invoice) => invoice.status === 'pending')
    .map((invoice) => ({
      client: invoice.clientName,
      pendingAmount: invoice.total,
    }))

  const getRevenueData = () => {
    const paidInvoices = invoices.filter((invoice) => invoice.status === 'paid')
    const monthlyRevenue: { [key: string]: number } = {}

    paidInvoices.forEach((invoice) => {
      const month = new Date(invoice.createdAt).toLocaleString('default', {
        month: 'short',
      })
      monthlyRevenue[month] =
        (monthlyRevenue[month] || 0) + (invoice.total ?? 0)
    })

    return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      month,
      revenue,
    }))
  }

  const getPieData = () => {
    const statusCount = invoices.reduce((acc, invoice) => {
      acc[invoice.status] = (acc[invoice.status] || 0) + 1
      return acc
    }, {} as { [key: string]: number })

    return Object.entries(statusCount).map(([name, value]) => ({
      name,
      value,
    }))
  }

  const revenueData = getRevenueData()
  const pieData = getPieData()

  if (status.fetchingAll)
    return (
      <LoadingSpinnerWrapper>
        <ClipLoader size={78} color='var(--color-accent-100)' />
      </LoadingSpinnerWrapper>
    )

  if (invoices.length === 0) return <h1>No Data Found</h1>

  return (
    <AnalyticsMain>
      <AnalyticsContainer>
        <h1>Analytics Board</h1>
        <CardsWrapper>
          <Card>
            <CardHeading>Pending Invoices by Client</CardHeading>

            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={pendingInvoicesData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='client' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey='pendingAmount'
                    fill='var(--color-accent-100)'
                    name='Pending Status'
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeading>Revenue Trend</CardHeading>

            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='revenue'
                    stroke='var(--color-accent-100)'
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeading>Invoice Status Distribution</CardHeading>

            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie dataKey='value' data={pieData} fill='#8884d8' label />
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

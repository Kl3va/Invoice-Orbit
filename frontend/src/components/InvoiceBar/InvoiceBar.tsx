import {
  StatusContainer,
  InvoiceRectangle,
  InvoiceID,
  InvoiceDueDate,
  InvoiceName,
  InvoicePrice,
} from 'components/InvoiceBar/InvoiceBarStyles'
import { Link } from 'react-router-dom'

//Utils
import {
  sliceStr,
  formatDueDate,
  formatLargeNumber,
  currencyLocale,
} from 'utils/invoiceFormatter'

interface InvoiceBarProps {
  paymentDue: string
  clientName: string
  currency: 'USD' | 'EUR' | 'NGN' | 'GBP'
  status: 'paid' | 'pending' | 'draft'
  total?: number
  _id?: string
}

const InvoiceBar = ({
  paymentDue,
  currency,
  clientName,
  status,
  total,
  _id: id,
}: InvoiceBarProps) => {
  return (
    <Link to={`/invoices/${id}`}>
      <InvoiceRectangle>
        <InvoiceID>
          <span>#</span>
          {id !== undefined && sliceStr(id, true)}
        </InvoiceID>

        <InvoiceDueDate>{formatDueDate(paymentDue)}</InvoiceDueDate>

        <InvoiceName>{sliceStr(clientName)}</InvoiceName>

        <InvoicePrice>
          {total !== undefined &&
            formatLargeNumber(total, currencyLocale[currency], currency, false)}
        </InvoicePrice>

        <StatusContainer $status={status}>
          <span></span>
          <h3>{status}</h3>
        </StatusContainer>

        <svg width='7' height='10' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M1 1l4 4-4 4'
            stroke='#7C5DFA'
            strokeWidth='2'
            fill='none'
            fillRule='evenodd'
          />
        </svg>
      </InvoiceRectangle>
    </Link>
  )
}

export default InvoiceBar

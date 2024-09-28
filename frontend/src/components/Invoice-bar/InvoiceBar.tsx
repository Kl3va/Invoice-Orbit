import {
  StatusContainer,
  InvoiceRectangle,
  InvoiceID,
  InvoiceDueDate,
  InvoiceName,
  InvoicePrice,
} from 'components/Invoice-bar/InvoiceBarStyles'
import { Link } from 'react-router-dom'

//Helpers
import {
  sliceStr,
  formatDueDate,
  formatLargeNumber,
  currencyLocale,
} from 'helpers'

interface InvoiceBarProps {
  paymentDue: string
  clientName: string
  currency: string
  status: 'paid' | 'pending' | 'draft'
  total: number
  _id: string
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
    <Link to={`/invoice/${id}`}>
      <InvoiceRectangle>
        <InvoiceID>
          <span>#</span>
          {sliceStr(id, true)}
        </InvoiceID>

        <InvoiceDueDate>{formatDueDate(paymentDue)}</InvoiceDueDate>

        <InvoiceName>{sliceStr(clientName)}</InvoiceName>

        <InvoicePrice>
          {formatLargeNumber(
            total,
            currencyLocale[currency as keyof typeof currencyLocale],
            currency,
            false
          )}
        </InvoicePrice>

        <StatusContainer status={status}>
          <span></span>
          <h4>{status}</h4>
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

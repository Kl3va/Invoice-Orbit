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
import { sliceStr, formatNumber } from 'helpers'

const InvoiceBar = () => {
  return (
    <Link to={'/invoices'}>
      <InvoiceRectangle>
        <InvoiceID>
          <span>#</span>RT3080
        </InvoiceID>

        <InvoiceDueDate>Due 19 Aug 2021£</InvoiceDueDate>

        <InvoiceName>{sliceStr('Jensen Huang')}</InvoiceName>

        <InvoicePrice>{`£ ${formatNumber(187900678.9)}`}</InvoicePrice>

        <StatusContainer>
          <span></span>
          <h4>Pending</h4>
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

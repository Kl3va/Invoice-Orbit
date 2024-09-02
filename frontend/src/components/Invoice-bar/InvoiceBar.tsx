import {
  StatusContainer,
  InvoiceRectangle,
  InvoiceID,
  InvoiceDueDate,
  InvoiceName,
  InvoicePrice,
} from 'components/Invoice-bar/InvoiceBarStyles'
import { Link } from 'react-router-dom'

const InvoiceBar = () => {
  return (
    <Link to={'/invoices'}>
      <InvoiceRectangle>
        <InvoiceID>
          <span>#</span>RT3080
        </InvoiceID>

        <InvoiceDueDate>Due 19 Aug 2021</InvoiceDueDate>

        <InvoiceName>Jensen Huang</InvoiceName>

        <InvoicePrice>£ 1,800.90</InvoicePrice>

        <StatusContainer>
          <span></span>
          <h4>Paid</h4>
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

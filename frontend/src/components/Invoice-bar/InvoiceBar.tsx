import {
  InvoiceRectangle,
  InvoiceRectanglePri,
  InvoiceRectangleSec,
  StatusContainer,
} from 'components/Invoice-bar/InvoiceBarStyles'
import { Link } from 'react-router-dom'

const InvoiceBar = () => {
  return (
    <Link to={'/'}>
      <InvoiceRectangle>
        <InvoiceRectanglePri>
          <h3>
            <span>#</span>RT3080
          </h3>
          <div>
            <p>Due 19 Aug 2021</p>
            <p>£ 1,800.90</p>
          </div>
        </InvoiceRectanglePri>

        <InvoiceRectangleSec>
          <p>Jensen Huang</p>
          <StatusContainer>
            <span></span>
            <h4>Paid</h4>
          </StatusContainer>
        </InvoiceRectangleSec>
      </InvoiceRectangle>
    </Link>
  )
}

export default InvoiceBar

import { LoadingSpinnerWrapper } from 'pages/invoice-details/InvoiceDetailsPageStyles'
import { ClipLoader } from 'react-spinners'

const CenteredSpinner = () => {
  return (
    <LoadingSpinnerWrapper>
      <ClipLoader size={78} color='var(--color-accent-100)' />
    </LoadingSpinnerWrapper>
  )
}

export default CenteredSpinner

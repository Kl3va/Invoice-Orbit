import { useEffect } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { controlFilterStatusModal } from 'store/features/modal/modalSlice'
import { ApiError } from 'utils/apiSimplify'
import {
  openNewInvoiceForm,
  updateStatus,
  fetchInvoices,
  closeInvoiceForm,
} from 'store/features/invoice/invoiceSlice'
import { useAlert } from 'hooks/useAlert'

//Components
import InvoiceBar from 'components/InvoiceBar/InvoiceBar'
import FilterInputs from 'components/FilterInputs'
import { SkeletonInvoiceBarList } from 'components/SkeletonInvoiceBar'
import Illustration from 'components/Illustration'

//Styling
import {
  HomePageMain,
  MainHeaderContainer,
  HomeSecondaryContainer,
  InvoiceHeading,
  FilterContainer,
  NewInvoiceBtn,
  InvoiceBarsWrapper,
  SecondarySectionSticky,
  FilterSvg,
  FilteringWrapper,
} from 'pages/home/HomeStyles'

const Homepage = () => {
  const { user } = useUser()
  const { getToken } = useAuth()
  const showAlert = useAlert()
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  const { isFilterStatusOpen } = useAppSelector((state) => state.modal)
  const { invoices, status } = useAppSelector((state) => state.invoice)

  const handleFilterStatus = () =>
    dispatch(controlFilterStatusModal(!isFilterStatusOpen))

  const openFormBar = () => {
    dispatch(openNewInvoiceForm())
    dispatch(controlFilterStatusModal(false))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token asynchronously
        const token = await getToken()

        // Get status from search params
        const statusParam = searchParams.get('status')
        const filters = statusParam ? statusParam.split(',') : []

        // Update status in the redux state
        dispatch(updateStatus(filters))

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

    return () => {
      dispatch(closeInvoiceForm())
    }
  }, [searchParams, dispatch, getToken])

  return (
    <HomePageMain>
      <section>
        <MainHeaderContainer>
          <p>{`Hi, ${user?.firstName}`}</p>
        </MainHeaderContainer>
      </section>

      <SecondarySectionSticky>
        <HomeSecondaryContainer>
          <InvoiceHeading>
            <h1>Invoices</h1>
            <p>{`There are ${invoices.length} total Invoices.`}</p>
          </InvoiceHeading>

          <FilteringWrapper>
            <FilterContainer onClick={handleFilterStatus}>
              <p>
                Filter <span>by status</span>
              </p>
              <span>
                <FilterSvg
                  width='11'
                  height='7'
                  xmlns='http://www.w3.org/2000/svg'
                  $shown={isFilterStatusOpen}
                >
                  <path
                    d='M1 1l4.228 4.228L9.456 1'
                    stroke='#7C5DFA'
                    strokeWidth='2'
                    fill='none'
                    fillRule='evenodd'
                  />
                </FilterSvg>
              </span>
            </FilterContainer>
            {isFilterStatusOpen && <FilterInputs />}
          </FilteringWrapper>

          <NewInvoiceBtn onClick={openFormBar} disabled={status.fetchingAll}>
            <span>
              <svg width='11' height='11' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z'
                  fill='#7C5DFA'
                  fillRule='nonzero'
                />
              </svg>
            </span>
            <p>
              New <span>Invoice</span>
            </p>
          </NewInvoiceBtn>
        </HomeSecondaryContainer>
      </SecondarySectionSticky>

      <section>
        <InvoiceBarsWrapper>
          {status.fetchingAll ? (
            <SkeletonInvoiceBarList count={5} />
          ) : invoices.length === 0 ? (
            <Illustration />
          ) : (
            // Map through actual invoices when they exist
            invoices.map((data, index) => {
              const { paymentDue, _id, total, clientName, status, currency } =
                data as Required<typeof data>

              return (
                <InvoiceBar
                  key={index}
                  {...{
                    paymentDue,
                    _id,
                    total,
                    clientName,
                    status,
                    currency,
                  }}
                />
              )
            })
          )}
        </InvoiceBarsWrapper>
      </section>
    </HomePageMain>
  )
}

export default Homepage

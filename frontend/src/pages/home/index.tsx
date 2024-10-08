import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  controlFilterStatusModal,
  // controlAlertModal,
} from 'store/features/modal/modalSlice'
import { openNewInvoiceForm } from 'store/features/invoice/invoiceSlice'

//import { ClipLoader } from 'react-spinners'

//MockData
import { mockDataArray } from 'data/mockData'

//Components
import InvoiceBar from 'components/Invoice-bar/InvoiceBar'
import FilterInputs from 'components/FilterInputs'
//import { SkeletonInvoiceBarList } from 'components/SkeletonInvoiceBar'
//import Illustration from 'components/Illustration'

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
  const dispatch = useAppDispatch()

  const { isFilterStatusOpen } = useAppSelector((state) => state.modal)
  const { selectedStatus } = useAppSelector((state) => state.invoice)

  const handleFilterStatus = () =>
    dispatch(controlFilterStatusModal(!isFilterStatusOpen))

  const openFormBar = () => {
    dispatch(openNewInvoiceForm())
    dispatch(controlFilterStatusModal(false))
  }

  useEffect(() => {
    console.log(`selectedStatus in Homepage`, selectedStatus)
  }, [selectedStatus])

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
            <p>{`There are ${mockDataArray.length} total Invoices.`}</p>
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
              {/* <FilterInputs /> */}
            </FilterContainer>
            {isFilterStatusOpen && <FilterInputs />}
          </FilteringWrapper>

          <NewInvoiceBtn onClick={openFormBar}>
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
          {/* Invoices from API */}
          {mockDataArray.map((data, index) => {
            const { paymentDue, _id, total, clientName, status, currency } =
              data

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
          })}

          {/* <InvoiceBar />
          <InvoiceBar />
          <InvoiceBar />
          <InvoiceBar />
          <InvoiceBar />
          <InvoiceBar />
          <InvoiceBar /> */}

          {/* Skeleton UI for loading state */}
          {/* <SkeletonInvoiceBarList count={5} /> */}

          {/* ILLustration */}
          {/* <Illustration /> */}
        </InvoiceBarsWrapper>
      </section>
    </HomePageMain>
  )
}

export default Homepage

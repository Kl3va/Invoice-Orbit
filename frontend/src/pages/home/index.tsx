import { useUser } from '@clerk/clerk-react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { controlFilterStatusModal } from 'store/features/modal/modalSlice'
//import { ClipLoader } from 'react-spinners'

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
} from 'pages/home/HomeStyles'

const Homepage = () => {
  const { user } = useUser()
  const dispatch = useAppDispatch()

  const { isFilterStatusOpen } = useAppSelector((state) => state.modal)

  const handleFilterStatus = () => dispatch(controlFilterStatusModal())

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
            <p>There are 123 total Invoices</p>
          </InvoiceHeading>

          <FilterContainer onClick={handleFilterStatus}>
            <p>
              Filter <span>by status</span>
            </p>
            <span>
              <FilterSvg
                width='11'
                height='7'
                xmlns='http://www.w3.org/2000/svg'
                shown={isFilterStatusOpen}
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
            {isFilterStatusOpen && <FilterInputs />}
          </FilterContainer>

          <NewInvoiceBtn>
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
          <InvoiceBar />
          <InvoiceBar />
          <InvoiceBar />
          <InvoiceBar />
          <InvoiceBar />
          <InvoiceBar />
          <InvoiceBar />
          <InvoiceBar />

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

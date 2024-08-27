import { useUser } from '@clerk/clerk-react'
import {
  HomePageMain,
  MainHeaderContainer,
  HomeSecondaryContainer,
  InvoiceHeading,
  FilterContainer,
  NewInvoiceBtn,
  IllustrationWrapper,
} from 'pages/home/HomeStyles'
import IllustrationEmpty from 'assets/illustration-empty.svg'

const Homepage = () => {
  const { user } = useUser()

  return (
    <HomePageMain>
      <section>
        <MainHeaderContainer>
          <h1>{`Hi, ${user?.firstName}`}</h1>
        </MainHeaderContainer>
      </section>

      <section>
        <HomeSecondaryContainer>
          <InvoiceHeading>
            <h2>Invoices</h2>
            <p>No Invoices</p>
          </InvoiceHeading>

          <FilterContainer>
            <p>
              Filter <span>by status</span>
            </p>
            <span>
              <svg width='11' height='7' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M1 1l4.228 4.228L9.456 1'
                  stroke='#7C5DFA'
                  stroke-width='2'
                  fill='none'
                  fill-rule='evenodd'
                />
              </svg>
            </span>
          </FilterContainer>

          <NewInvoiceBtn>
            <span>
              <svg width='11' height='11' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z'
                  fill='#7C5DFA'
                  fill-rule='nonzero'
                />
              </svg>
            </span>
            <p>
              New <span>Invoice</span>
            </p>
          </NewInvoiceBtn>
        </HomeSecondaryContainer>
      </section>

      <section>
        <IllustrationWrapper>
          <img src={IllustrationEmpty} alt='illustration for no invoice' />
          <h2>There is nothing here</h2>
          <p>
            Create an invoice by clicking the{' '}
            <b>
              New <span>Invoice</span>
            </b>{' '}
            button and get started
          </p>
        </IllustrationWrapper>
      </section>
    </HomePageMain>
  )
}

export default Homepage

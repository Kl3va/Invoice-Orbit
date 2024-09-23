//COMPONENTS
import GobackButton from 'components/GobackButton/GobackButton'
import ConfirmDeletion from 'components/ConfirmDeletion'

//Custom Hook
import useWindow from 'hooks/useWindow'

//STYLES
import { StatusContainer } from 'components/Invoice-bar/InvoiceBarStyles'

import {
  BasicInfoPrimary,
  BasicInfoSecondary,
  ButtonsGroup,
  UserAddressWrapper,
  DescriptionWrapper,
  DetailsPrimary,
  DetailsSecondary,
  GobackWrapper,
  StatusBar,
  BasicInfoWrapper,
  BillToWrapper,
  ItemsContainer,
  ItemsDetailsContainer,
  ItemsDetailsHeadingWrapper,
  ItemsDetailsWrapper,
  GrandTotalWrapper,
  StickySection,
  PaymentDueWrapper,
  SentToWrapper,
  DetailPageMain,
} from 'pages/invoice-details/InvoiceDetailsPageStyles'

const InvoiceDetailsPage = () => {
  const windowWidth = useWindow()

  return (
    <DetailPageMain>
      {/* <ConfirmDeletion /> */}
      <section>
        <GobackWrapper>
          <GobackButton />
        </GobackWrapper>
      </section>

      <StickySection>
        <DetailsSecondary>
          <StatusBar>
            <h2>Status</h2>
            <StatusContainer>
              <span></span>
              <h4>Pending</h4>
            </StatusContainer>
          </StatusBar>

          <ButtonsGroup>
            <button>Edit</button>
            <button>Delete</button>
            <button>Mark as paid</button>
          </ButtonsGroup>
        </DetailsSecondary>
      </StickySection>

      <section>
        <DetailsPrimary>
          <BasicInfoWrapper>
            <BasicInfoSecondary>
              <DescriptionWrapper>
                <p>
                  <span>#</span>XM9141
                </p>
                <p>Graphic design</p>
              </DescriptionWrapper>
              <UserAddressWrapper>
                <p>19 Union Terrace</p>
                <p>London</p>
                <p>E1 3EZ</p>
                <p>United Kingdom</p>
              </UserAddressWrapper>
            </BasicInfoSecondary>
            <BasicInfoPrimary>
              <div>
                <h2>Invoice Date</h2>
                <p>21 Aug 2021</p>
              </div>
              <BillToWrapper>
                <div>
                  <h2>Bill To</h2>
                  <p>Alex Grin</p>
                </div>
                <div>
                  <p>84 Church Way</p>
                  <p>Bradford</p>
                  <p>BD1 9PB</p>
                  <p>United Kingdom</p>
                </div>
              </BillToWrapper>
              <PaymentDueWrapper>
                <h2>Payment Due</h2>
                <p>20 Sep 2021</p>
              </PaymentDueWrapper>
              <SentToWrapper>
                <h2>Sent to</h2>
                <p>alexgrim@mail.com</p>
              </SentToWrapper>
            </BasicInfoPrimary>
          </BasicInfoWrapper>

          <ItemsContainer>
            <ItemsDetailsContainer>
              <ItemsDetailsHeadingWrapper>
                <h2>Item Name</h2>
                <h2>QTY.</h2>
                <h2>Price</h2>
                <h2>Total</h2>
              </ItemsDetailsHeadingWrapper>
              <ItemsDetailsWrapper>
                <p>Banner Design</p>
                <p>1 x £156.00</p>
                <p>1,000,000</p>
                <p>£156.00</p>
                <p>£156.00</p>
              </ItemsDetailsWrapper>
              <ItemsDetailsWrapper>
                <p>Email Design</p>
                <p>2 x £ 200.00</p>
                <p>2</p>
                <p>£ 200.00</p>
                <p>£ 400.00</p>
              </ItemsDetailsWrapper>
            </ItemsDetailsContainer>
            <GrandTotalWrapper>
              <h2>{windowWidth >= 400 ? 'Amount Due' : 'Grand Total'}</h2>
              <p>£ 556.00</p>
            </GrandTotalWrapper>
          </ItemsContainer>
        </DetailsPrimary>
      </section>
    </DetailPageMain>
  )
}

export default InvoiceDetailsPage

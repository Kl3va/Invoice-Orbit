//Redux
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { controlConfirmDeleteModal } from 'store/features/modal/modalSlice'
import { openEditInvoiceForm } from 'store/features/invoice/invoiceSlice'

//COMPONENTS
import GobackButton from 'components/GobackButton/GobackButton'
//import { ClipLoader } from 'react-spinners'
import ConfirmDeletion from 'components/ConfirmDeletion'

//Custom Hook
import useWindow from 'hooks/useWindowWidth'

//Helper Functions
import { formatLargeNumber, currencyLocale } from 'utils/invoiceFormatter'

//Mock Data
import { mockInvoiceData } from 'data/mockData'

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
  const dispatch = useAppDispatch()

  const { isConfirmDeleteOpen } = useAppSelector((state) => state.modal)

  const openConfirmationModal = () => dispatch(controlConfirmDeleteModal(true))

  const openEditFormBar = () => {
    dispatch(openEditInvoiceForm())
  }

  return (
    <DetailPageMain>
      {/* <ConfirmDeletion /> */}
      {isConfirmDeleteOpen && <ConfirmDeletion />}
      <section>
        <GobackWrapper>
          <GobackButton />
        </GobackWrapper>
      </section>

      <StickySection>
        <DetailsSecondary>
          <StatusBar>
            <h2>Status</h2>
            <StatusContainer $status={mockInvoiceData.status}>
              <span></span>
              <h4>{mockInvoiceData.status}</h4>
            </StatusContainer>
          </StatusBar>

          <ButtonsGroup>
            <button onClick={openEditFormBar}>Edit</button>
            <button onClick={openConfirmationModal}>Delete</button>
            <button>Mark as paid</button>
          </ButtonsGroup>
        </DetailsSecondary>
      </StickySection>

      {/* LOADING STATE BEFORE RENDERING DETAILS */}
      {/* <ClipLoader size={78} color='var(--color-accent-100)' /> */}

      <section>
        <DetailsPrimary>
          <BasicInfoWrapper>
            <BasicInfoSecondary>
              <DescriptionWrapper>
                <p>
                  <span>#</span>
                  {mockInvoiceData._id}
                </p>
                <p>{mockInvoiceData.description}</p>
              </DescriptionWrapper>
              <UserAddressWrapper>
                <p>{mockInvoiceData.senderAddress.street}</p>
                <p>{mockInvoiceData.senderAddress.city}</p>
                <p>{mockInvoiceData.senderAddress.postCode}</p>
                <p>{mockInvoiceData.senderAddress.country}</p>
              </UserAddressWrapper>
            </BasicInfoSecondary>
            <BasicInfoPrimary>
              <div>
                <h2>Invoice Date</h2>
                <p>{mockInvoiceData.createdAt}</p>
              </div>
              <BillToWrapper>
                <div>
                  <h2>Bill To</h2>
                  <p>{mockInvoiceData.clientName}</p>
                </div>
                <div>
                  <p>{mockInvoiceData.clientAddress.street}</p>
                  <p>{mockInvoiceData.clientAddress.city}</p>
                  <p>{mockInvoiceData.clientAddress.postCode}</p>
                  <p>{mockInvoiceData.clientAddress.country}</p>
                </div>
              </BillToWrapper>
              <PaymentDueWrapper>
                <h2>Payment Due</h2>
                <p>{mockInvoiceData.paymentDue}</p>
              </PaymentDueWrapper>
              <SentToWrapper>
                <h2>Sent to</h2>
                <p>{mockInvoiceData.clientEmail}</p>
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
              {mockInvoiceData.items.map((item, index) => {
                return (
                  <ItemsDetailsWrapper key={index}>
                    <p>{item.name}</p>
                    <p>
                      {`${item.quantity} x ${formatLargeNumber(
                        item.price,
                        currencyLocale[mockInvoiceData.currency],
                        mockInvoiceData.currency
                      )}`}
                    </p>
                    <p>{item.quantity}</p>
                    <p>
                      {formatLargeNumber(
                        item.price,
                        currencyLocale[mockInvoiceData.currency],
                        mockInvoiceData.currency
                      )}
                    </p>
                    <p>
                      {formatLargeNumber(
                        item.total,
                        currencyLocale[mockInvoiceData.currency],
                        mockInvoiceData.currency
                      )}
                    </p>
                  </ItemsDetailsWrapper>
                )
              })}

              {/* <ItemsDetailsWrapper>
                <p>Email Design</p>
                <p>2 x £ 200.00</p>
                <p>2</p>
                <p>£ 200.00</p>
                <p>£ 400.00</p>
              </ItemsDetailsWrapper> */}
            </ItemsDetailsContainer>
            <GrandTotalWrapper>
              <h2>{windowWidth >= 400 ? 'Amount Due' : 'Grand Total'}</h2>
              <p>
                {formatLargeNumber(
                  mockInvoiceData.total ?? 0,
                  currencyLocale[mockInvoiceData.currency],
                  mockInvoiceData.currency
                )}
              </p>
            </GrandTotalWrapper>
          </ItemsContainer>
        </DetailsPrimary>
      </section>
    </DetailPageMain>
  )
}

export default InvoiceDetailsPage

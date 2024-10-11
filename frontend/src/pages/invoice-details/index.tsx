import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
//Redux
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { controlConfirmDeleteModal } from 'store/features/modal/modalSlice'
import {
  openEditInvoiceForm,
  fetchInvoiceWithId,
  updateInvoice,
} from 'store/features/invoice/invoiceSlice'

//Clerk
import { useAuth } from '@clerk/clerk-react'

//Types
import { InvoiceOrbit } from 'types/invoiceTypes'

//COMPONENTS
import GobackButton from 'components/GobackButton/GobackButton'
import { ClipLoader } from 'react-spinners'
import ConfirmDeletion from 'components/ConfirmDeletion'

//Custom Hook
import useWindow from 'hooks/useWindowWidth'
import { useAlert } from 'hooks/useAlert'

//Helper Functions
import { formatLargeNumber, currencyLocale } from 'utils/invoiceFormatter'
import { handleApiError } from 'utils/apiSimplify'

//Mock Data
//import { mockInvoiceData } from 'data/mockData'

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
  LoadingSpinnerWrapper,
} from 'pages/invoice-details/InvoiceDetailsPageStyles'

const InvoiceDetailsPage = () => {
  const windowWidth = useWindow()
  const { id } = useParams()
  const showAlert = useAlert()
  const { getToken } = useAuth()
  const dispatch = useAppDispatch()

  const { isConfirmDeleteOpen } = useAppSelector((state) => state.modal)
  const { status, currentInvoice } = useAppSelector((state) => state.invoice)

  const openConfirmationModal = () => dispatch(controlConfirmDeleteModal(true))

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token asynchronously
        const token = await getToken()

        // Pass the token to the fetchInvoices action
        if (token && id) {
          // await dispatch(fetchInvoiceWithId({token, id})).unwrap()
        }
      } catch (error) {
        const apiError = handleApiError(error)
        showAlert(apiError?.message, 'failure')
      }
    }

    fetchData()
  }, [id, dispatch, getToken])

  const openEditFormBar = () => {
    dispatch(openEditInvoiceForm())
  }

  //Update Invoice status to paid
  const updateStatusToPaid = async () => {
    const invoice: Partial<InvoiceOrbit> = {
      _id: currentInvoice?._id,
      status: 'paid' as const,
    }

    try {
      const token = await getToken()
      if (!token) {
        showAlert('Authentication failed', 'failure')
        return
      }

      await dispatch(updateInvoice({ token, invoice })).unwrap()
      showAlert('Invoice Updated Successfully!', 'success')
    } catch (error) {
      const apiError = handleApiError(error)
      showAlert(apiError?.message, 'failure')
    }
  }

  return (
    <DetailPageMain>
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
            <StatusContainer $status={currentInvoice?.status ?? 'pending'}>
              <span></span>
              <h4>{currentInvoice?.status}</h4>
            </StatusContainer>
          </StatusBar>

          <ButtonsGroup>
            <button onClick={openEditFormBar}>Edit</button>
            <button
              onClick={openConfirmationModal}
              disabled={status.fetchingOne}
            >
              Delete
            </button>
            <button
              onClick={updateStatusToPaid}
              disabled={
                status.fetchingOne ||
                status.updating ||
                currentInvoice?.status === 'paid'
              }
            >
              {status.updating ? (
                <ClipLoader size={24} color='var(--color-font-normal)' />
              ) : (
                'Mark as paid'
              )}
            </button>
          </ButtonsGroup>
        </DetailsSecondary>
      </StickySection>

      {status.fetchingOne ? (
        <LoadingSpinnerWrapper>
          <ClipLoader size={78} color='var(--color-accent-100)' />
        </LoadingSpinnerWrapper>
      ) : (
        <section>
          <DetailsPrimary>
            <BasicInfoWrapper>
              <BasicInfoSecondary>
                <DescriptionWrapper>
                  <p>
                    <span>#</span>
                    {currentInvoice?._id}
                  </p>
                  <p>{currentInvoice?.description}</p>
                </DescriptionWrapper>
                <UserAddressWrapper>
                  <p>{currentInvoice?.senderAddress.street}</p>
                  <p>{currentInvoice?.senderAddress.city}</p>
                  <p>{currentInvoice?.senderAddress.postCode}</p>
                  <p>{currentInvoice?.senderAddress.country}</p>
                </UserAddressWrapper>
              </BasicInfoSecondary>
              <BasicInfoPrimary>
                <div>
                  <h2>Invoice Date</h2>
                  <p>{currentInvoice?.createdAt}</p>
                </div>
                <BillToWrapper>
                  <div>
                    <h2>Bill To</h2>
                    <p>{currentInvoice?.clientName}</p>
                  </div>
                  <div>
                    <p>{currentInvoice?.clientAddress.street}</p>
                    <p>{currentInvoice?.clientAddress.city}</p>
                    <p>{currentInvoice?.clientAddress.postCode}</p>
                    <p>{currentInvoice?.clientAddress.country}</p>
                  </div>
                </BillToWrapper>
                <PaymentDueWrapper>
                  <h2>Payment Due</h2>
                  <p>{currentInvoice?.paymentDue}</p>
                </PaymentDueWrapper>
                <SentToWrapper>
                  <h2>Sent to</h2>
                  <p>{currentInvoice?.clientEmail}</p>
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
                {currentInvoice?.items.map((item, index) => {
                  return (
                    <ItemsDetailsWrapper key={index}>
                      <p>{item.name}</p>
                      <p>
                        {`${item.quantity} x ${formatLargeNumber(
                          item.price,
                          currencyLocale[currentInvoice?.currency],
                          currentInvoice?.currency
                        )}`}
                      </p>
                      <p>{item.quantity}</p>
                      <p>
                        {formatLargeNumber(
                          item.price,
                          currencyLocale[currentInvoice?.currency],
                          currentInvoice?.currency
                        )}
                      </p>
                      <p>
                        {formatLargeNumber(
                          item.total,
                          currencyLocale[currentInvoice?.currency],
                          currentInvoice?.currency
                        )}
                      </p>
                    </ItemsDetailsWrapper>
                  )
                })}
              </ItemsDetailsContainer>
              <GrandTotalWrapper>
                <h2>{windowWidth >= 400 ? 'Amount Due' : 'Grand Total'}</h2>
                <p>
                  {formatLargeNumber(
                    currentInvoice?.total ?? 0,
                    currencyLocale[currentInvoice?.currency ?? 'GBP'],
                    currentInvoice?.currency ?? 'GBP'
                  )}
                </p>
              </GrandTotalWrapper>
            </ItemsContainer>
          </DetailsPrimary>
        </section>
      )}
    </DetailPageMain>
  )
}

export default InvoiceDetailsPage

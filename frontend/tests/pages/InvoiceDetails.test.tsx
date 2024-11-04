import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ClerkProvider } from '@clerk/clerk-react'
import invoiceReducer from 'store/features/invoice/invoiceSlice'
import modalReducer from 'store/features/modal/modalSlice'
import InvoiceDetailsPage from 'pages/invoice-details'
import { configureStore } from '@reduxjs/toolkit'
import { mockInvoiceData } from 'data/mockData'
import { RootState } from 'store/store'

interface TestState {
  invoice: {
    currentInvoice: null | typeof mockInvoiceData
    status: {
      fetchingOne: false
      fetchOneError: null | string
      updating: false
    }
    isFormOpen: boolean
  }
  modal: {
    isConfirmDeleteOpen: boolean
  }
}

//mock dispatch actions
const mockDispatch = vi.fn()

//mock clerkdev hooks
vi.mock('@clerk/clerk-react', () => ({
  useAuth: () => ({
    getToken: vi.fn().mockResolvedValue('mock-token'),
  }),

  ClerkProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='clerk-provider'>{children}</div>
  ),
}))

// Mock Redux hooks
vi.mock('store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: RootState) => unknown) =>
    selector({
      invoice: {
        currentInvoice: mockInvoiceData,
        status: {
          fetchingOne: false,
          fetchOneError: null,
          updating: false,
        },
        isFormOpen: false,
      },
      modal: {
        isConfirmDeleteOpen: false,
      },
    } as TestState as unknown as RootState),
}))

//mock hooks
vi.mock('hooks/useAlert', () => ({
  useAlert: () => vi.fn(),
}))

vi.mock('hooks/useWindowWidth', () => ({
  default: () => 405,
}))

describe('Invoice Details Page', () => {
  const renderInvoiceDetailsPage = () => {
    const store = configureStore({
      reducer: {
        invoice: invoiceReducer,
        modal: modalReducer,
      },
    })

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/invoices/RT3080']}>
          <Routes>
            <Route
              path='/invoices/:id'
              element={
                <ClerkProvider publishableKey='test_key'>
                  <InvoiceDetailsPage />
                </ClerkProvider>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  }

  beforeEach(() => {
    mockDispatch.mockClear() // Clear mock calls before each test
  })

  it('renders Invoice details page', () => {
    renderInvoiceDetailsPage()

    expect(screen.getByText('paid')).toBeInTheDocument()
    expect(screen.getByText(/Re-branding/i)).toBeInTheDocument()
    expect(screen.getByText(/Jensen Huang/i)).toBeInTheDocument()
  })

  it('opens confirm deletion modal when delete button is clicked', async () => {
    renderInvoiceDetailsPage()

    const button = screen.getByText(/Delete/i)
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'modal/controlConfirmDeleteModal',
          payload: true,
        })
      )
    })
  })

  it('confirms that edit button is disabled because invoice has a status of paid', () => {
    renderInvoiceDetailsPage()

    const button = screen.getByText(/Edit/i)
    expect(button).toBeDisabled()
  })

  it('confirms that mark as paid button is disabled because invoice has a status of paid', () => {
    renderInvoiceDetailsPage()

    const button = screen.getByText(/Mark as paid/i)
    expect(button).toBeDisabled()
  })

  it('confirms heading Grand Total does not exist in the document when width is < 400', () => {
    renderInvoiceDetailsPage()

    // const heading = screen.getByText(/Amount Due/i)
    const heading = screen.queryByText(/Grand Total/i)
    expect(heading).not.toBeInTheDocument()
  })
})

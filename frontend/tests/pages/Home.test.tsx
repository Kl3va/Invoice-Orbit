import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ClerkProvider } from '@clerk/clerk-react'
import invoiceReducer from 'store/features/invoice/invoiceSlice'
import modalReducer from 'store/features/modal/modalSlice'

import Homepage from 'pages/home'
import { configureStore } from '@reduxjs/toolkit'
import { mockInvoiceData } from 'data/mockData'
import { RootState } from 'store/store'

// Mock dispatch to track actions
const mockDispatch = vi.fn()

//Mock clerkdev hooks
vi.mock('@clerk/clerk-react', () => ({
  useUser: () => ({
    user: {
      firstName: 'Test',
    },
  }),
  useAuth: () => ({
    getToken: vi.fn().mockResolvedValue('mock-token'),
  }),

  ClerkProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='clerk-provider'>{children}</div>
  ),
}))

//mock redux hooks
vi.mock('store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: RootState) => unknown) =>
    selector({
      invoice: {
        invoices: [mockInvoiceData],
        status: { fetchingAll: false },
        isFormOpen: false,
      },
      modal: {
        isFilterStatusOpen: false,
      },
    } as RootState),
}))

// Mock useAlert hook
vi.mock('hooks/useAlert', () => ({
  useAlert: () => vi.fn(),
}))

describe('HomePage', () => {
  // Helper function to render component with providers
  const renderHomepage = () => {
    const store = configureStore({
      reducer: {
        invoice: invoiceReducer,
        modal: modalReducer,
      },
    })

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <ClerkProvider publishableKey='test_key'>
            <Homepage />
          </ClerkProvider>
        </MemoryRouter>
      </Provider>
    )
  }

  beforeEach(() => {
    mockDispatch.mockClear() // Clear mock calls before each test
  })

  // Test cases
  it('renders user greeting', async () => {
    renderHomepage()
    await waitFor(() => {
      expect(screen.getByText('Hi, Test')).toBeInTheDocument()
    })
  })

  it('displays correct number of invoices', async () => {
    renderHomepage()
    await waitFor(() => {
      expect(
        screen.getByText('There are 1 total Invoices.')
      ).toBeInTheDocument()
    })
  })

  it('opens filter status modal when filter button is clicked', async () => {
    renderHomepage()
    const button = screen.getByText(/Filter/i)
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'modal/controlFilterStatusModal',
          payload: true,
        })
      )
    })
  })
})

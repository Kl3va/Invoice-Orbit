import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { emptyInvoice, mockInvoiceData } from 'data/mockData'
import { Provider } from 'react-redux'
import { ClerkProvider } from '@clerk/clerk-react'
import { configureStore } from '@reduxjs/toolkit'
import invoiceReducer from 'store/features/invoice/invoiceSlice'
import MainFormTemplate from 'components/Main-Form/MainFormTemplate'

//initiate dispatch action
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

//mock redux hooks
vi.mock('store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => ({
    status: {
      creating: null,
      updating: false,
    },
  }),
}))

// Mock Alert hook
vi.mock('hooks/useAlert', () => ({
  useAlert: () => vi.fn(),
}))

describe('MainFormTemplate', () => {
  const renderForm = (isEditing = false) => {
    const store = configureStore({
      reducer: {
        invoice: invoiceReducer,
      },
    })

    return render(
      <Provider store={store}>
        <ClerkProvider publishableKey='test_key'>
          <MainFormTemplate
            isEditing={isEditing}
            invoiceForm={isEditing ? mockInvoiceData : emptyInvoice}
            key={isEditing ? mockInvoiceData._id : 'new'}
          />
        </ClerkProvider>
      </Provider>
    )
  }

  beforeEach(() => {
    mockDispatch.mockClear()
  })

  describe('New Invoice Form', () => {
    it('should render form with current date and empty form fields', () => {
      renderForm(false)

      //check title
      expect(screen.getByText(/New Invoice/i)).toBeInTheDocument()

      //check empty fields
      const streets = screen.getAllByLabelText(/Street Address/i)
      streets.forEach((street) => {
        expect(street).toHaveValue('')
      })
      expect(screen.getByLabelText(/Client's Name/i)).toHaveValue('')
      expect(screen.getByLabelText(/Client's Email/i)).toHaveValue('')

      //Check existence of default values
      const today = new Date().toISOString().split('T')[0]
      expect(screen.getByLabelText(/Invoice Date/i)).toHaveValue(today)
      expect(screen.getByLabelText(/Payment Terms/i)).toHaveValue('1')
      expect(screen.getByLabelText(/Currency/i)).toHaveValue('GBP')
    })

    it('shows no items initially and allows adding new items', async () => {
      const user = userEvent.setup()
      renderForm(false)

      expect(screen.queryAllByLabelText(/Item Name/i)).toHaveLength(0)

      await user.click(screen.getByText(/\+ Add New Item/i))
      expect(screen.queryAllByLabelText('Item Name')).toHaveLength(1)
    })

    it('shows correct button group for new invoice', () => {
      renderForm(false)

      expect(screen.getByText('Discard')).toBeInTheDocument()
      expect(screen.getByText('Save as Draft')).toBeInTheDocument()
      expect(screen.getByText('Save & Send')).toBeInTheDocument()
    })
  })
})

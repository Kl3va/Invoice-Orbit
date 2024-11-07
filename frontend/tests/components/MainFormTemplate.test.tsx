import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { emptyInvoice, mockInvoiceData } from 'data/mockData'
import { Provider } from 'react-redux'
import { ClerkProvider } from '@clerk/clerk-react'
import { configureStore } from '@reduxjs/toolkit'
import invoiceReducer, {
  closeInvoiceForm,
} from 'store/features/invoice/invoiceSlice'
import MainFormTemplate from 'components/Main-Form/MainFormTemplate'
import { createInvoice } from 'store/features/invoice/invoiceSlice'

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

vi.mock('store/features/invoice/invoiceSlice', () => ({
  createInvoice: vi.fn(),
  closeInvoiceForm: vi.fn(),
  default: vi.fn((state = {}) => state),
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
    // mockDispatch.mockClear()
    vi.clearAllMocks()
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

    it('requires all mandatory fields for new invoice submission', async () => {
      const user = userEvent.setup()
      renderForm(false)

      // Try to submit without filling required fields
      user.click(screen.getByText('Save & Send'))

      // Check that the dispatch wasn't called
      expect(mockDispatch).not.toHaveBeenCalled()
    })

    it('handles creating draft invoice', async () => {
      const user = userEvent.setup()

      renderForm(false)

      // Fill required fields
      const streets = screen.getAllByLabelText(/Street Address/i)
      await user.type(streets[0], 'Hoiustifn')
      await user.type(streets[1], 'Main')

      const cities = screen.getAllByLabelText(/City/i)
      await user.type(cities[0], 'Aba')
      await user.type(cities[1], 'Aba')

      const codes = screen.getAllByLabelText(/Post Code/i)
      await user.type(codes[0], '12334')
      await user.type(codes[1], '12334')

      const countries = screen.getAllByLabelText(/Country/i)
      await user.type(countries[0], 'Nigeria')
      await user.type(countries[1], 'Ghana')

      await user.type(
        screen.getByLabelText(/Client's Name/i),
        'Anthony Edwards'
      )
      await user.type(
        screen.getByLabelText(/Client's Email/i),
        'antman@gmail.com'
      )
      await user.type(screen.getByLabelText(/Description/i), 'UI development')

      // Add an item
      await user.click(screen.getByText('+ Add New Item'))
      //Item Name
      const itemInputs = screen.getAllByLabelText('Item Name')
      await user.type(itemInputs[0], 'Test Item')

      //Item quantity
      const qtyInput = screen.getByLabelText('Qty.')
      await user.type(qtyInput, '2')

      //Item Price
      const priceInput = screen.getByLabelText('Price')
      await user.type(priceInput, '100')

      //Check total
      const total = screen.getByText('200.00')
      expect(total).toBeInTheDocument()

      // Submit as draft
      await user.click(screen.getByText('Save as Draft'))

      expect(vi.mocked(createInvoice)).toHaveBeenCalledWith({
        token: 'mock-token',
        invoice: expect.objectContaining({
          clientName: 'Anthony Edwards',
          clientEmail: 'antman@gmail.com',
          clientAddress: expect.objectContaining({
            street: 'Main',
            city: 'Aba',
            postCode: '12334',
            country: 'Ghana',
          }),
          senderAddress: expect.objectContaining({
            city: 'Aba',
            country: 'Nigeria',
            postCode: '12334',
            street: 'Hoiustifn',
          }),
          createdAt: '2024-11-07T00:00:00.000Z',
          paymentTerms: 1,
          description: 'UI development',
          currency: 'GBP',
          items: [
            {
              name: 'Test Item',
              quantity: 2,
              price: 100,
              total: 200,
            },
          ],
          status: 'draft',
        }),
      })
      expect(mockDispatch).toHaveBeenCalledWith(closeInvoiceForm())
    }, 20000)
  })

  //Editing Invoice Section
  describe('Edit Invoice Form', () => {
    it('renders form with existing invoice data', () => {
      renderForm(true)

      // Check title
      expect(screen.getByText('Edit: RT3080')).toBeInTheDocument()

      // Check populated fields
      expect(screen.getByLabelText(/Client's Name/i)).toHaveValue(
        'Jensen Huang'
      )
      expect(screen.getByLabelText(/Client's Email/i)).toHaveValue(
        'jensenh@mail.com'
      )
      expect(screen.getByLabelText(/Description/i)).toHaveValue('Re-branding')
    })

    it('shows correct button group for editing', () => {
      renderForm(true)

      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Save Changes')).toBeInTheDocument()
      expect(screen.queryByText('Save as Draft')).not.toBeInTheDocument()
    })

    it('has read-only invoice date when editing', () => {
      renderForm(true)
      const dateInput = screen.getByLabelText(/Invoice Date/i)
      expect(dateInput).toHaveAttribute('readOnly')
    })
  })
})

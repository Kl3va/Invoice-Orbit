import React, { useState } from 'react'
//REDUX
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { closeInvoiceForm } from 'store/features/invoice/invoiceSlice'

//NEW INVOICE TEMPLATE
import { emptyInvoice } from 'data/mockData'

//TYPES
import { InvoiceOrbit } from 'types/invoiceTypes'

//COMPONENTS
import GobackButton from 'components/GobackButton/GobackButton'
import {
  CancelButton,
  CurrencyContainer,
  DateAndTermsContainer,
  DiscardButton,
  DraftButton,
  FormButtonsContainer,
  FormInvoiceContainer,
  GobackFormBtnWrapper,
  InvoiceFormContainer,
  ItemListHeading,
  ItemListWrapper,
  ListContainer,
  LocationContainer,
  SubmitButtonsContainer,
} from 'components/Main-Form/MainFormTemplateStyles'

interface props {
  invoiceForm: InvoiceOrbit
  isEditing: boolean
}

const MainFormTemplate = ({ isEditing, invoiceForm }: props) => {
  const dispatch = useAppDispatch()

  // const { isEditing, isFormOpen, invoiceForm } = useAppSelector(
  //   (state) => state.invoice
  // )

  const [formData, setFormData] = useState<InvoiceOrbit>(invoiceForm)
  const [items, setItems] = useState<InvoiceOrbit['items']>(
    invoiceForm.items || []
  )

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.') as [
        'senderAddress' | 'clientAddress',
        keyof InvoiceOrbit['senderAddress']
      ]
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value }
        if (field === 'quantity' || field === 'price') {
          updatedItem.total = updatedItem.quantity * updatedItem.price
        }
        return updatedItem
      }
      return item
    })

    setItems(updatedItems)
    updateTotal(updatedItems)
  }

  const addNewItem = () => {
    setItems([...items, { name: '', quantity: 0, price: 0, total: 0 }])
  }

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index)
    setItems(updatedItems)
    updateTotal(updatedItems)
  }

  const updateTotal = (updatedItems: InvoiceOrbit['items']) => {
    const newTotal = updatedItems.reduce(
      (acc, item) => acc + (item.total || 0),
      0
    )
    setFormData((prev) => ({ ...prev, total: newTotal }))
  }

  // if (!isFormOpen) {
  //   return null
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      ...formData,
      items,
      // status: 'pending',
      paymentDue: formData.createdAt,
    }
    console.log(data)
  }

  return (
    <FormInvoiceContainer>
      <GobackFormBtnWrapper>
        <GobackButton />
      </GobackFormBtnWrapper>
      <h2>{isEditing ? 'Edit' : 'New Invoice'}</h2>
      <InvoiceFormContainer>
        <fieldset>
          <legend>Bill From</legend>
          <div>
            <label>Street Address</label>
            <input
              type='text'
              name='senderAddress.street'
              id='senderAddress.street'
              placeholder='19 Union Terrace'
              value={formData.senderAddress.street}
              onChange={handleInputChange}
              required
            />
          </div>
          <LocationContainer>
            <div>
              <label>City</label>
              <input
                type='text'
                name='senderAddress.city'
                id='senderAddress.city'
                placeholder='London'
                required
                value={formData.senderAddress.city}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Post Code</label>
              <input
                type='text'
                placeholder='E1 AFB'
                maxLength={11}
                name='senderAddress.postCode'
                id='senderAddress.postCode'
                value={formData.senderAddress.postCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor=''>Country</label>
              <input
                type='text'
                placeholder='UK'
                required
                maxLength={50}
                name='senderAddress.country'
                id='senderAddress.country'
                value={formData.senderAddress.country}
                onChange={handleInputChange}
              />
            </div>
          </LocationContainer>
        </fieldset>

        <fieldset>
          <legend>Bill To</legend>
          <div>
            <label>Client's Name</label>
            <input
              type='text'
              placeholder='Michael Scott'
              required
              maxLength={50}
              name='clientName'
              id='clientName'
              value={formData.clientName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Client's Email</label>
            <input
              type='email'
              placeholder='mscott@gmail.com'
              required
              name='clientEmail'
              id='clientEmail'
              value={formData.clientEmail}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Street Address</label>
            <input
              type='text'
              name='clientAddress.street'
              id='clientAddress.street'
              placeholder='10 Church Way'
              required
              value={formData.clientAddress.street}
              onChange={handleInputChange}
            />
          </div>
          <LocationContainer>
            <div>
              <label>City</label>
              <input
                type='text'
                name='clientAddress.city'
                id='clientAddress.city'
                placeholder='Bradford'
                required
                value={formData.clientAddress.city}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Post Code</label>
              <input
                type='text'
                name='clientAddress.postCode'
                id='clientAddress.postCode'
                placeholder='BD1 9BB'
                maxLength={11}
                required
                value={formData.clientAddress.postCode}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Country</label>
              <input
                type='text'
                name='clientAddress.country'
                id='clientAddress.country'
                placeholder='United Kingdom'
                maxLength={50}
                required
                value={formData.clientAddress.country}
                onChange={handleInputChange}
              />
            </div>
          </LocationContainer>
        </fieldset>

        <fieldset>
          <DateAndTermsContainer>
            <div>
              <label>Invoice Date</label>
              <input
                type='date'
                name='createdAt'
                id='createdAt'
                required
                value={formData.createdAt}
                onChange={handleInputChange}
                readOnly={isEditing}
              />
            </div>
            <div>
              <label>Payment Terms</label>
              <select
                name='paymentTerms'
                id='paymentTerms'
                required
                value={formData.paymentTerms}
                onChange={handleInputChange}
              >
                <option value='' hidden>
                  Select Payment Terms
                </option>
                <option value='1'>Next 1 day</option>
                <option value='7'>Next 7 days</option>
                <option value='14'>Next 14 days</option>
                <option value='30'>Next 30 days</option>
              </select>
            </div>
          </DateAndTermsContainer>

          <div>
            <label>Project/Description</label>
            <input
              type='text'
              name='description'
              id='description'
              placeholder='Graphic Design'
              required
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <CurrencyContainer>
            <label>Currency</label>
            <select
              name='currency'
              id='currency'
              required
              value={formData.currency}
              onChange={handleInputChange}
            >
              <option value='' hidden>
                Select Currency
              </option>
              <option value='NGN'>₦: Naira</option>
              <option value='USD'>$: Dollar</option>
              <option value='GBP'>£: Pound</option>
              <option value='EUR'>€: Euro</option>
            </select>
          </CurrencyContainer>
        </fieldset>

        <ItemListWrapper>
          <legend>Item List</legend>
          <ItemListHeading>
            <h3>Item Name</h3>
            <h3>Qty.</h3>
            <h3>Price</h3>
            <h3>Total</h3>
          </ItemListHeading>

          {items.map((item, index) => {
            return (
              <ListContainer key={index}>
                <div>
                  <label>Item Name</label>
                  <input
                    type='text'
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, 'name', e.target.value)
                    }
                    placeholder='Logo design'
                    maxLength={30}
                    required
                  />
                </div>

                <div>
                  <label>Qty.</label>
                  <input
                    type='number'
                    inputMode='numeric'
                    required
                    placeholder='0'
                    max={100000}
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        'quantity',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>

                <div>
                  <label>Price</label>
                  <input
                    type='number'
                    inputMode='numeric'
                    step='0.01'
                    required
                    placeholder='0'
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        'price',
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>

                <div>
                  <label>Total</label>
                  <p>{item.total.toFixed(2)}</p>
                </div>

                <svg
                  width='13'
                  height='16'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={() => removeItem(index)}
                >
                  <path
                    d='M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z'
                    fill='#888EB0'
                    fillRule='nonzero'
                  />
                </svg>
              </ListContainer>
            )
          })}

          <button onClick={addNewItem}>+ Add New Item</button>
        </ItemListWrapper>

        <FormButtonsContainer>
          {isEditing ? (
            <SubmitButtonsContainer>
              <CancelButton onClick={() => dispatch(closeInvoiceForm())}>
                Cancel
              </CancelButton>
              <button>Save Changes</button>
            </SubmitButtonsContainer>
          ) : (
            <SubmitButtonsContainer>
              <DiscardButton onClick={() => dispatch(closeInvoiceForm())}>
                Discard
              </DiscardButton>
              <DraftButton>Save as Draft</DraftButton>
              <button onClick={(e) => handleSubmit(e)}>Save & Send</button>
            </SubmitButtonsContainer>
          )}
        </FormButtonsContainer>
      </InvoiceFormContainer>
    </FormInvoiceContainer>
  )
}

export default MainFormTemplate

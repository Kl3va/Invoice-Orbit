import GobackButton from 'components/GobackButton/GobackButton'
import {
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

const MainFormTemplate = () => {
  const isEditing = true

  return (
    <FormInvoiceContainer>
      <GobackFormBtnWrapper>
        <GobackButton />
      </GobackFormBtnWrapper>
      <h2>New Invoice</h2>
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
              // value={''}
              // onChange={}
              required
            />
          </div>
          <LocationContainer>
            <div>
              <label>City</label>
              <input type='text' placeholder='London' required />
            </div>
            <div>
              <label htmlFor=''>Post Code</label>
              <input type='text' placeholder='E1 AFB' maxLength={11} required />
            </div>
            <div>
              <label htmlFor=''>Country</label>
              <input type='text' placeholder='UK' required maxLength={50} />
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
            />
          </div>
          <div>
            <label>Client's Email</label>
            <input type='email' placeholder='mscott@gmail.com' required />
          </div>
          <div>
            <label>Street Address</label>
            <input type='text' placeholder='10 Church Way' required />
          </div>
          <LocationContainer>
            <div>
              <label>City</label>
              <input type='text' placeholder='Bradford' required />
            </div>
            <div>
              <label>Post Code</label>
              <input
                type='text'
                placeholder='BD1 9BB'
                maxLength={11}
                required
              />
            </div>
            <div>
              <label>Country</label>
              <input type='text' placeholder='UK' maxLength={50} required />
            </div>
          </LocationContainer>
        </fieldset>

        <fieldset>
          <DateAndTermsContainer>
            <div>
              <label>Invoice Date</label>
              <input type='date' required />
            </div>
            <div>
              <label>Payment Terms</label>
              <select name='terms' id='terms' required>
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
            <input type='text' placeholder='Graphic Design' required />
          </div>

          <CurrencyContainer>
            <label>Currency</label>
            <select name='terms' id='terms' required>
              <option value='' hidden>
                Select Currency
              </option>
              <option value='naira'>₦: Naira</option>
              <option value='dollar'>$: Dollar</option>
              <option value='pound'>£: Pound</option>
              <option value='euro'>€: Euro</option>
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
          <ListContainer>
            <div>
              <label>Item Name</label>
              <input
                type='text'
                placeholder='Logo design'
                maxLength={30}
                required
              />
            </div>

            <div>
              <label>Qty.</label>
              <input type='number' required placeholder='0' max={100000} />
            </div>

            <div>
              <label>Price</label>
              <input type='number' required placeholder='0' />
            </div>

            <div>
              <label htmlFor=''>Total</label>
              <p>0</p>
            </div>

            <svg width='13' height='16' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z'
                fill='#888EB0'
                fillRule='nonzero'
              />
            </svg>
          </ListContainer>

          <ListContainer>
            <div>
              <label>Item Name</label>
              <input
                type='text'
                placeholder='brand design'
                maxLength={30}
                required
              />
            </div>

            <div>
              <label>Qty.</label>
              <input type='number' placeholder='0' max={1000000} required />
            </div>

            <div>
              <label>Price</label>
              <input type='number' placeholder='0' required />
            </div>

            <div>
              <label htmlFor=''>Total</label>
              <p>0</p>
            </div>

            <svg width='13' height='16' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z'
                fill='#888EB0'
                fillRule='nonzero'
              />
            </svg>
          </ListContainer>

          <button>+ Add New Item</button>
        </ItemListWrapper>

        <FormButtonsContainer>
          {isEditing ? (
            <SubmitButtonsContainer>
              <button>Cancel</button>
              <button>Save Changes</button>
            </SubmitButtonsContainer>
          ) : (
            <SubmitButtonsContainer>
              <DiscardButton>Discard</DiscardButton>
              <DraftButton>Save as Draft</DraftButton>
              <button>Save & Send</button>
            </SubmitButtonsContainer>
          )}
        </FormButtonsContainer>
      </InvoiceFormContainer>
    </FormInvoiceContainer>
  )
}

export default MainFormTemplate

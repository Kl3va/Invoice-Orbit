import GobackButton from 'components/GobackButton/GobackButton'
import {
  DateAndTermsContainer,
  FormButtonsContainer,
  FormInvoiceContainer,
  GobackFormBtnWrapper,
  InvoiceFormContainer,
  LocationContainer,
} from 'components/Main-Form/MainFormTemplateStyles'

const MainFormTemplate = () => {
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
              <input type='text' placeholder='E1 AFB' required />
            </div>
            <div>
              <label htmlFor=''>Country</label>
              <input type='text' placeholder='UK' required />
            </div>
          </LocationContainer>
        </fieldset>

        <fieldset>
          <legend>Bill To</legend>
          <div>
            <label>Client's Name</label>
            <input type='text' placeholder='Michael Scott' required />
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
              <input type='text' placeholder='BD1 9BB' required />
            </div>
            <div>
              <label>Country</label>
              <input type='text' placeholder='UK' required />
            </div>
          </LocationContainer>
        </fieldset>

        <fieldset>
          <DateAndTermsContainer>
            <div>
              <label>Invoice Date</label>
              <input type='date' />
            </div>
            <div>
              <label>Payment Terms</label>
              <select name='terms' id='terms'>
                <option value='select'>Select Payment Terms</option>
                <option value='1'>Net 1 day</option>
                <option value='7'>Net 7 day</option>
                <option value='14'>Net 1 day</option>
                <option value='30'>Net 1 day</option>
              </select>
            </div>
          </DateAndTermsContainer>

          <div>
            <label htmlFor=''>Country</label>
            <input type='text' />
          </div>

          <div>
            <label htmlFor=''>Country</label>
            <input type='text' />
          </div>
        </fieldset>

        <fieldset>
          <legend>Item List</legend>
          <div>
            <div>
              <label htmlFor=''>Country</label>
              <input type='text' />
            </div>

            <div>
              <label htmlFor=''>Country</label>
              <input type='text' />
            </div>

            <div>
              <label htmlFor=''>Country</label>
              <input type='text' />
            </div>

            <div>
              <label htmlFor=''>Country</label>
              <p>value</p>
            </div>
            <svg width='13' height='16' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z'
                fill='#888EB0'
                fill-rule='nonzero'
              />
            </svg>
          </div>

          <div>
            <div>
              <label htmlFor=''>Country</label>
              <input type='text' />
            </div>

            <div>
              <label htmlFor=''>Country</label>
              <input type='text' />
            </div>

            <div>
              <label htmlFor=''>Country</label>
              <input type='text' />
            </div>

            <div>
              <label htmlFor=''>Country</label>
              <p>value</p>
            </div>
            <svg width='13' height='16' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z'
                fill='#888EB0'
                fill-rule='nonzero'
              />
            </svg>
          </div>
        </fieldset>

        <FormButtonsContainer>
          <button>kasds</button>
          <button>asbh v/is</button>
        </FormButtonsContainer>
      </InvoiceFormContainer>
    </FormInvoiceContainer>
  )
}

export default MainFormTemplate

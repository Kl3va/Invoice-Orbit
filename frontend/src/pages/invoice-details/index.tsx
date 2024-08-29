//COMPONENTS
import GobackButton from 'components/GobackButton/GobackButton'

//STYLES
import { StatusContainer } from 'components/Invoice-bar/InvoiceBarStyles'
import { HomePageMain } from 'pages/home/HomeStyles'
import {
  ButtonsGroup,
  DetailsPrimary,
  DetailsSecondary,
  GobackWrapper,
  StatusBar,
} from 'pages/invoice-details/InvoiceDetailsPageStyles'

const InvoiceDetailsPage = () => {
  return (
    <HomePageMain>
      <section>
        <GobackWrapper>
          <GobackButton />
        </GobackWrapper>
      </section>

      <section>
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
      </section>

      <section>
        <DetailsPrimary>
          <div>
            <div>
              <div>
                <p>
                  <span>#</span>XM9141
                </p>
                <p>Graphic design</p>
              </div>
              <div>
                <p>19 Union Terrace</p>
                <p>London</p>
                <p>E1 3EZ</p>
                <p>United Kingdom</p>
              </div>
            </div>
            <div>
              <div>
                <h2>Invoice Date</h2>
                <p>21 Aug 2021</p>
              </div>
              <div>
                <h2>Bill To</h2>
                <div>
                  <p>Alex Grin</p>
                  <p>84 Church Way</p>
                  <p>Bradford</p>
                  <p>BD1 9PB</p>
                  <p>United Kingdom</p>
                </div>
              </div>
              <div>
                <h2>Payment Due</h2>
                <p>20 Sep 2021</p>
              </div>
              <div>
                <h2>Sent to</h2>
                <p>alexgrim@mail.com</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h2>Item Name</h2>
              <h2>QTY.</h2>
              <h2>Price</h2>
              <h2>Total</h2>
            </div>
            <div>
              <p>Banner Design</p>
              <p>1 x £ 156.00</p>
              <p>1</p>
              <p>£ 156.00</p>
              <p>£ 156.00</p>
            </div>
            <div>
              <p>Email Design</p>
              <p>2 x £ 200.00</p>
              <p>2</p>
              <p>£ 200.00</p>
              <p>£ 400.00</p>
            </div>
            <div>
              <h2>Grand Total</h2>
              <h2>Amount Due</h2>
              <p>£ 556.00</p>
            </div>
          </div>
        </DetailsPrimary>
      </section>
    </HomePageMain>
  )
}

export default InvoiceDetailsPage

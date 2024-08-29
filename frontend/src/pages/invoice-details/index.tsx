import { StatusContainer } from 'components/Invoice-bar/InvoiceBarStyles'
import { HomePageMain } from 'pages/home/HomeStyles'

const InvoiceDetailsPage = () => {
  return (
    <HomePageMain>
      <section>
        <div>
          <button aria-label='Go back to prev page'>
            <svg width='7' height='10' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6.342.886L2.114 5.114l4.228 4.228'
                stroke='#9277FF'
                stroke-width='2'
                fill='none'
                fill-rule='evenodd'
              />
            </svg>
            Go back
          </button>
        </div>
      </section>

      <section>
        <div>
          <div>
            <h2>Status</h2>
            <StatusContainer>
              <span></span>
              <h4>Pending</h4>
            </StatusContainer>
          </div>

          <div>
            <button>Edit</button>
            <button>Delete</button>
            <button>Mark as paid</button>
          </div>
        </div>
      </section>

      <section>
        <div>
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
        </div>
      </section>
    </HomePageMain>
  )
}

export default InvoiceDetailsPage

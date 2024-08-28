import { StatusContainer } from 'components/Invoice-bar/InvoiceBarStyles'
import { HomePageMain } from 'pages/home/HomeStyles'

const InvoiceDetailsPage = () => {
  return (
    <HomePageMain>
      <section>
        <div>
          <svg width='7' height='10' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M6.342.886L2.114 5.114l4.228 4.228'
              stroke='#9277FF'
              stroke-width='2'
              fill='none'
              fill-rule='evenodd'
            />
          </svg>
          <p>Go back</p>
        </div>
      </section>

      <section>
        <div>
          <div>
            <p>Status</p>
            <StatusContainer>Pending</StatusContainer>
          </div>

          <div>
            <button>Edit</button>
            <button>Delete</button>
            <button>Mark as paid</button>
          </div>
        </div>
      </section>

      <section>
        <div>SHFH;SIHV;</div>
      </section>
    </HomePageMain>
  )
}

export default InvoiceDetailsPage

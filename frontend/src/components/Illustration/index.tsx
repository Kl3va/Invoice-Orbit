import styled from 'styled-components'
import IllustrationEmpty from 'assets/illustration-empty.svg'

const IllustrationWrapper = styled.div`
  width: min(87.2%, 15.1rem);
  margin-inline: auto;
  text-align: center;

  h2 {
    margin-block: 2.63rem 1.44rem;
    font-size: 1.5rem;
  }

  p {
    color: var(--color-font-500);

    span {
      display: none;

      @media (min-width: 48em) {
        display: inline;
      }
    }
  }
`

const Illustration = () => {
  return (
    <IllustrationWrapper data-testid='illustration'>
      <img src={IllustrationEmpty} alt='illustration for no invoice' />
      <h2>There is nothing here</h2>
      <p>
        Create an invoice by clicking the{' '}
        <b>
          New <span>Invoice</span>
        </b>{' '}
        button and get started
      </p>
    </IllustrationWrapper>
  )
}

export default Illustration

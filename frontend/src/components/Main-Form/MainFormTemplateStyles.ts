import styled from 'styled-components'

export const FormInvoiceContainer = styled.div`
  position: fixed;
  background-color: var(--color-bg-800);
  width: min(100%, 38.56rem);
  padding: 2rem 1.5rem 0 1.5rem;
  height: 100vh;
  border-radius: 0 1.25rem 1.25rem 0;
  top: 4.5rem;

  left: 0;
  z-index: 95;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.6rem;
  }
`
export const GobackFormBtnWrapper = styled.div`
  width: fit-content;
  margin-bottom: 1.6rem;
`

export const InvoiceFormContainer = styled.form`
  height: calc(100% - 16rem);
  overflow-y: scroll;

  display: grid;
  gap: 2.56rem;

  label {
    display: block;
    color: var(--color-font-400);
    font-size: var(--font-size-mini);
    margin-bottom: 0.5rem;
  }

  legend {
    font-size: var(--font-size-small);
    color: var(--color-accent-100);
    margin-bottom: 1.5rem;
  }

  fieldset {
    display: grid;
    gap: 1.56rem;
    border: none;
  }

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z' fill='%237C5DFA'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 97.5% 55%;
    background-size: 1.5em;

    option {
      font-size: 1rem;
    }
  }
`

export const ItemListWrapper = styled.fieldset`
  button {
    color: var(--color-font-400);
    background-color: var(color-bg-400);
    border-radius: 6.25rem;
    padding-block: 1.13rem 0.94rem;
    font-weight: 700;
    font-size: var(--font-size-small);
    border: none;
  }
`

export const LocationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.56rem 1.4rem;

  & > :last-child {
    grid-column: span 2;
  }
`
export const DateAndTermsContainer = styled.div`
  display: grid;
  gap: 1.56rem;
`
export const CurrencyContainer = styled.div`
  width: 10rem;
`
export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 4rem 6.25rem auto fit-content(13px);
  grid-template-rows: auto auto;
  gap: 1rem;

  & > :first-child {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
  }

  & > :nth-child(4) {
    display: grid;
    grid-template-rows: min-content auto;

    p {
      align-self: center;
      color: var(--color-font-400);
      font-weight: 700;
      font-size: var(--font-size-small);
    }
  }

  & > :last-child {
    align-self: center;
    margin-top: 1rem;
  }
`

export const FormButtonsContainer = styled.div`
  position: fixed;
  background-color: brown;
  bottom: 0;
  left: 0;
  width: min(100%, 38.56rem);

  z-index: 95;
  padding: 2rem;

  // display: none;
`

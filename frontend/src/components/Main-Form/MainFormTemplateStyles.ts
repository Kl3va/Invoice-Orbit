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

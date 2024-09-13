import styled from 'styled-components'
import { QUERIES } from 'styles/mediaQueries'

export const FormInvoiceContainer = styled.div`
  position: fixed;
  background-color: var(--color-bg-800);
  width: min(100%, 39.56rem);
  padding: 2rem 1.5rem 0 1.5rem;
  height: 100vh;
  top: 4.5rem;
  left: 0;
  z-index: 105;

  @media ${QUERIES.mobileLarge} {
    border-radius: 0 1.25rem 1.25rem 0;
  }

  @media ${QUERIES.tabletMini} {
    padding: 3.5rem 3.5rem 0 3.5rem;
  }

  @media ${QUERIES.tablet} {
    top: 0;
    left: 5.44rem;
    padding-left: 4.5rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.6rem;
  }
`
export const GobackFormBtnWrapper = styled.div`
  width: fit-content;
  margin-bottom: 1.6rem;

  @media ${QUERIES.mobileLarge} {
    display: none;
  }
`

export const InvoiceFormContainer = styled.form`
  height: calc(100% - 15rem);
  overflow-y: scroll;
  padding-bottom: 3rem;

  display: grid;
  gap: 2.56rem;

  @media ${QUERIES.mobileLarge} {
    height: calc(100% - 13.4rem);
  }

  @media ${QUERIES.tablet} {
    height: calc(100% - 8.9rem);
  }

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
    cursor: pointer;
    transition: opacity ease-out 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
`

export const ItemListHeading = styled.div`
  display: none;

  h3 {
    color: var(--color-font-400);
    font-size: var(--font-size-mini);
    font-weight: 500;
  }

  @media ${QUERIES.mobileLarge} {
    display: grid;
    grid-template-columns:
      13.38rem minmax(min-content, 4rem) minmax(min-content, 6.25rem)
      auto;
    gap: 1rem;
  }
`

export const LocationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.56rem 1.4rem;

  & > :last-child {
    grid-column: span 2;
  }

  @media ${QUERIES.mobileLarge} {
    grid-template-columns: 1fr 1fr 1fr;

    & > :last-child {
      grid-column: 3 / 4;
    }
  }
`
export const DateAndTermsContainer = styled.div`
  display: grid;
  gap: 1.56rem;

  @media ${QUERIES.mobileLarge} {
    grid-template-columns: 1fr 1fr;
  }
`
export const CurrencyContainer = styled.div`
  width: 10rem;
`
export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 4rem 6.25rem auto fit-content(13px);
  grid-template-rows: auto auto;
  gap: 1rem;
  max-width: 100%;
  overflow-x: auto;

  @media ${QUERIES.mobileLarge} {
    grid-template-columns:
      13.38rem 4rem 6.25rem
      auto fit-content(13px);
    grid-template-rows: auto;

    label {
      display: none;
    }
  }

  & > :first-child {
    grid-column: 1 / -1;
    grid-row: 1 / 2;

    @media ${QUERIES.mobileLarge} {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
  }

  & > :nth-child(4) {
    display: grid;
    grid-template-rows: min-content auto;

    @media ${QUERIES.mobileLarge} {
      align-self: center;
    }

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
    cursor: pointer;
    transition: fill ease-in 0.25s;

    &:hover path {
      fill: var(--color-bg-delete);
    }

    @media ${QUERIES.mobileLarge} {
      margin-top: 0;
    }
  }
`

export const FormButtonsContainer = styled.div`
  position: fixed;
  background-color: var(--color-bg-300);
  bottom: 0;
  left: 0;
  width: min(100%, 39.56rem);
  box-shadow: 0 -14px 14px rgba(0, 0, 0, 0.1);
  z-index: 110;
  padding: 1.38rem 1.5rem;
  border-bottom-right-radius: 1.25rem;

  @media ${QUERIES.tabletMini} {
    padding-inline: 3.5rem;
  }

  @media ${QUERIES.tablet} {
    left: 5.44rem;
    padding-left: 4.5rem;
  }
`

export const SubmitButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;

  button {
    border: none;
    border-radius: 6.25rem;
    font-weight: 500;
    font-size: 0.8rem;
    height: 3rem;
    padding-inline: 0.7rem;
    cursor: pointer;
    transition: opacity ease-in 0.2s;

    &:hover {
      opacity: 0.6;
    }

    @media ${QUERIES.mobileMini} {
      padding-inline: 1.3rem;
      font-size: 0.8rem;
    }

    @media ${QUERIES.mobile} {
      padding-inline: 1.5rem;
      font-weight: 700;
      font-size: 0.94rem;
    }
  }

  & > :first-child {
    background-color: var(--color-bg-400);
    color: var(color-font-300);
  }

  & > :last-child {
    background-color: var(--color-accent-100);
    color: var(--color-font-normal);
  }
`

export const DiscardButton = styled.button`
  margin-right: auto;
`
export const DraftButton = styled.button`
  background-color: var(--color-bg-200);
  color: var(--color-font-500);
`

import styled from 'styled-components'
import { QUERIES } from 'styles/mediaQueries'

export const HomePageMain = styled.main`
  margin-top: 4.5rem;
  padding-block: 1.5rem 1rem;

  section:not(:last-child) {
    margin-bottom: 2rem;
  }

  @media ${QUERIES.tablet} {
    margin: 1rem 0 0 6.44rem;
  }
`

export const MainHeaderContainer = styled.div`
  width: min(87.2%, var(--max-container));
  margin-inline: auto;

  h1 {
    font-size: clamp(
      1.5rem,
      calc(2vw + 1rem),
      2.25rem
    ); //(24px)ends at 400px. (36px)starts at 1000px
  }
`

export const HomeSecondaryContainer = styled.div`
  width: min(87.2%, var(--max-container));
  margin-inline: auto;
  container-type: inline-size;
  display: flex;
  gap: 1.16rem;

  h2 {
    font-size: clamp(1.25rem, calc(1.8vw + 1rem), 1.875rem);
  }
`
export const InvoiceHeading = styled.div`
  flex-grow: 1;

  p {
    color: var(--color-bg-500);
  }
`
export const FilterContainer = styled.div`
  display: flex;
  gap: 0.87rem;
  align-items: center;
  cursor: pointer;

  p {
    color: var(--color-font-100);
    font-weight: 700;

    span {
      display: none;

      @container (min-width: 42em) {
        display: inline;
      }
    }
  }
`

export const NewInvoiceBtn = styled.button`
  display: flex;
  cursor: pointer;
  border: none;
  height: 2.75rem;
  padding-inline: 0.4rem 0.81rem;
  gap: 0.5rem;
  align-items: center;
  font-weight: 700;
  color: #ffffff;
  background-color: var(--color-accent-100);
  border-radius: 6.25rem;

  & > span {
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background-color: #ffffff;
  }

  p {
    span {
      display: none;

      @container (min-width: 42em) {
        display: inline;
      }
    }
  }
`

export const IllustrationWrapper = styled.div`
  width: min(87.2%, 15.1rem);
  margin-inline: auto;
  padding-top: 6.37rem;
  text-align: center;

  h2 {
    margin-block: 2.63rem 1.44rem;
    font-size: 1.5rem;
  }

  p {
    color: var(--color-font-500);
  }
`

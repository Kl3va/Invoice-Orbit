import styled from 'styled-components'
import { QUERIES } from 'styles/mediaQueries'

export const HomePageMain = styled.main`
  margin-top: 4.5rem;
  padding-block: 1rem;

  section:not(:last-child) {
    margin-bottom: 2rem;

    @media ${QUERIES.tabletMini} {
      margin-bottom: 3rem;
    }
  }

  @media ${QUERIES.tablet} {
    margin: 1rem 0 0 6.44rem;
  }
`

export const SecondarySectionSticky = styled.section`
  position: sticky;
  top: 6rem;
  z-index: 1000;
  backdrop-filter: blur(10px);
  z-index: 90;

  @media ${QUERIES.tablet} {
    top: 1rem;
  }
`

export const MainHeaderContainer = styled.div`
  width: min(87.2%, var(--max-container));
  margin-inline: auto;

  p {
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

  @media ${QUERIES.tabletMini} {
    gap: 2.5rem;
  }

  h1 {
    font-size: clamp(1.25rem, calc(1.8vw + 1rem), 1.875rem);
  }
`
export const InvoiceHeading = styled.div`
  flex-grow: 1;
  display: grid;

  p {
    color: var(--color-font-500);
    font-size: var(--font-size-mini);
  }
`
export const FilteringWrapper = styled.div`
  align-self: center;
  position: relative;
`

export const FilterContainer = styled.div`
  display: flex;
  gap: 0.87rem;
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
export const FilterSvg = styled.svg<{ $shown?: boolean }>`
  transform: ${({ $shown }) => ($shown ? 'rotate(180deg)' : 'rotate(0deg)')};
  transform-origin: center;
  transition: transform 0.2s ease-in-out;
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
  transition: scale ease-in 0.2s;

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

  &:hover {
    scale: 1.03;
  }
`

export const InvoiceBarsWrapper = styled.div`
  min-height: calc(100vh - 17.2rem);

  a {
    width: min(87.2%, var(--max-container));
    margin-inline: auto;
  }

  & > :not(:last-child) {
    margin-bottom: 1rem;
  }

  &:has(div img) {
    align-content: center;
  }
`

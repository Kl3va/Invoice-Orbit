import styled from 'styled-components'
import { QUERIES } from 'styles/mediaQueries'

export const AnalyticsMain = styled.main`
  margin-top: 4.5rem;
  padding-block: 1rem;
  min-height: calc(100vh - 4.5rem);

  @media ${QUERIES.tablet} {
    margin: 1rem 0 0 6.44rem;
  }
`

export const AnalyticsContainer = styled.div`
  width: 100%;
  width: min(87.2%, 70rem);
  margin-inline: auto;

  h1 {
    font-size: clamp(1.25rem, calc(1.8vw + 1rem), 1.875rem);
    text-align: center;
    margin-bottom: 2rem;
  }
`
export const CardsWrapper = styled.div`
  display: grid;
  gap: 2.5rem;
`

export const Card = styled.div`
  padding-block: 1rem;

  &:not(:last-child) {
    border-bottom: 2px solid var(--color-border-100);
  }
`

export const CardHeading = styled.h2`
  margin-bottom: 1rem;
`

export const CardContent = styled.div`
  width: 100%;
`

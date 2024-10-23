import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { QUERIES } from 'styles/mediaQueries'

export const NotFoundContainer = styled.main`
  margin-top: 4.5rem;
  padding-block: 1rem;
  min-height: calc(100vh - 4.5rem);
  display: grid;
  place-items: center;

  @media ${QUERIES.tablet} {
    margin: 1rem 0 0 6.44rem;
  }
`

export const NotFoundContent = styled.div`
  justify-items: center;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`

export const NotFoundButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: var(--color-accent-100);
  color: var(--color-font-normal);
  border: none;
  border-radius: 0.4rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`

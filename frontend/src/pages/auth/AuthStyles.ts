//import { keyframes } from 'styled-components'
import styled, { keyframes } from 'styled-components'
import { QUERIES } from 'styles/mediaQueries'

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`

const blink = keyframes`
  50% { border-color: transparent; }
`

export const AuthMain = styled.main`
  margin-top: 4.5rem;
  padding-block: 1.5rem 1rem;

  @media ${QUERIES.tablet} {
    margin: 1rem 0 0 6.44rem;
  }
`

export const TypeWritingContainer = styled.div`
  width: 25rem;
`
export const TypeWritingText = styled.p`
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.15em solid var(--color-font-100);
  width: 0;
  animation: ${typing} 2.5s steps(30) 1s forwards,
    ${blink} 0.75s step-end infinite;
`

//5s steps(30) 1s forwards
//animation: ${typing} 5s steps(40 end ) infinite;

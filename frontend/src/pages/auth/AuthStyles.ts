//import { keyframes } from 'styled-components'
import styled, { keyframes } from 'styled-components'
import { QUERIES } from 'styles/mediaQueries'

const typing = keyframes`
0 { width: 0; }
  50% { width: 100%; }
  100% { width: 0; }
`

const hide = keyframes`
  from { opacity: 0;}
  to { opacity: 1; }
`

const blink = keyframes`
  50% { border-color: transparent; }
`

export const AuthMain = styled.main`
  height: 100vh;
  padding-block: 1rem;

  & > :first-child {
    display: none;

    @media ${QUERIES.desktop} {
      display: grid;
      justify-content: center;
      text-align: center;
    }
  }

  & > :last-child {
    height: 100%;
    display: grid;
    align-items: end;

    @media ${QUERIES.desktop} {
      height: calc(100vh - 10.15rem);
    }
  }

  @media ${QUERIES.desktop} {
    margin-left: 6.44rem;
    padding-block: 2.5rem;
  }
`

export const TypeWritingContainer = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  animation: ${hide} 2s ease-in-out forwards;
`
export const TypeWritingText = styled.p`
  white-space: nowrap;
  font-size: 2.4rem;
  overflow: hidden;
  display: inline-block;
  border-right: 0.15em solid var(--color-font-100);
  width: 0;
  animation: ${typing} 7s steps(30) 2s infinite,
    ${blink} 0.75s step-end infinite;
`

//
export const AuthContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  height: 70%;

  h1 {
    font-size: clamp(1.5rem, calc(2vw + 1rem), 2.25rem);
    font-weight: 500;
    text-align: center;
  }
`

export const AuthBtnGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  button {
    display: grid;
    place-items: center;
    cursor: pointer;
    border: none;
    height: 3rem;
    width: min(45%, 10rem);
    font-weight: 400;
    color: var(--color-bg-100);
    background-color: var(--color-font-100);
    border-radius: 6.25rem;
    transition: var(--transition);

    &:hover {
      transform: scale(1.1);
    }
  }
`

export const LogoMinContainer = styled.span`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  margin-top: auto;
  align-self: center;

  p {
    font-size: 1.2rem;
    margin-top: 4px;
  }
`

//5s steps(30) 1s forwards
//animation: ${typing} 5s steps(40 end ) infinite;

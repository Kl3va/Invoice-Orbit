import styled, { keyframes } from 'styled-components'
import { QUERIES } from 'styles/mediaQueries'

const scaleIn = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`

export const ConfirmDeletionContainer = styled.div`
  width: min(87.2%, 30rem);
  padding: 2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);

  background-color: var(--color-bg-300);
  border-radius: 0.5rem;
  animation: ${scaleIn} 0.3s ease-in-out forwards;
  z-index: 2001;
  opacity: 0;

  @media ${QUERIES.tabletMini} {
    padding: 3rem;
  }

  h3 {
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
  }

  p {
    color: var(--color-font-200);
    margin-bottom: 0.88rem;
    font-size: var(--font-size-mini);
    line-height: 1.38rem;
    letter-spacing: -0.1px;
  }

  div {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;

    button {
      border: none;
      border-radius: 6.25rem;
      font-weight: 700;
      font-size: var(--font-size-small);
      height: 3rem;
      padding-inline: 1.5rem;
      cursor: pointer;
      transition: opacity ease-in 0.2s;

      &:hover {
        opacity: 0.5;
      }
    }

    & > :first-child {
      background-color: var(--color-bg-400);
      color: var(--color-font-700);
    }

    & > :last-child {
      background-color: var(--color-bg-delete);
      color: var(--color-font-normal);
    }
  }
`

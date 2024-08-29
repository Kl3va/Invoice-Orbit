import styled from 'styled-components'
import { QUERIES } from 'styles/mediaQueries'

export const GobackWrapper = styled.div`
  width: min(87.2%, var(--max-container));
  margin-inline: auto;
`

export const DetailsPrimary = styled.div`
  width: min(87.2%, var(--max-container));
  margin-inline: auto;
  background-color: var(--color-bg-300);
  border-radius: 0.8rem;

  h2 {
    color: var(--color-font-300);
    font-size: 0.81rem;
    font-weight: 500;
  }
`

export const DetailsSecondary = styled.div`
  width: min(87.2%, var(--max-container));
  margin-inline: auto;
  background-color: var(--color-bg-300);
  border-radius: 0.8rem;
  padding: 1.25rem 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    color: var(--color-font-300);
    font-size: 0.81rem;
    font-weight: 500;
  }
`

export const ButtonsGroup = styled.div`
  background-color: var(--color-bg-300);
  padding: 0.6rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  display: flex;
  gap: 0.5rem;

  @media ${QUERIES.mobileMini} {
    padding: 1.25rem 1.5rem;
  }

  button {
    border: none;
    border-radius: 6.25rem;
    font-weight: 500;
    font-size: 0.94rem;
    height: 3rem;
    padding-inline: 1.1rem;
    cursor: pointer;
    opacity: 1;

    @media ${QUERIES.mobileMini} {
      padding-inline: 1.5rem;
      font-weight: 700;
    }
  }

  & > :first-child {
    background-color: var(--color-bg-400);
    color: var(--color-font-700);
    transition: background-color color ease-in 0.2s;

    :hover {
      background-color: var(--color-bg-700);
      color: var(--color-font-800);
    }
  }

  & > :nth-child(2) {
    background-color: var(--color-bg-delete);
    color: var(--color-font-normal);
    transition: opacity ease-in 0.2s;

    &:hover {
      opacity: 0.5;
    }
  }

  & > :last-child {
    background-color: var(--color-accent-100);
    color: var(--color-font-normal);
    transition: opacity ease-in 0.2s;

    :hover {
      opacity: 0.5;
      border: 3px solid red;
    }
  }
`

export const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`

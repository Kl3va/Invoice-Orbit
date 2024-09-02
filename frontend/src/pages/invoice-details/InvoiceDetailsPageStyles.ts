import styled from 'styled-components'
import { QUERIES } from 'styles/mediaQueries'

export const StickySection = styled.section`
  @media ${QUERIES.mobileLarge} {
    position: sticky;
    top: 6rem;
    z-index: 1000;
  }
`

export const GobackWrapper = styled.div`
  width: min(87.2%, var(--max-container));
  margin-inline: auto;
`

export const DetailsPrimary = styled.div`
  width: min(87.2%, var(--max-container));
  margin-inline: auto;
  background-color: var(--color-bg-300);
  border-radius: 0.8rem;
  padding: 1.56rem 1.5rem;
  margin-bottom: 9rem;

  @media ${QUERIES.mobileLarge} {
    margin-bottom: 0;
  }

  h2 {
    color: var(--color-font-300);
    font-size: 0.81rem;
    font-weight: 500;
  }
`

export const BasicInfoWrapper = styled.div`
  margin-bottom: 2.38rem;
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

  @media ${QUERIES.mobileLarge} {
    position: relative;
    padding: 0;
    justify-content: flex-end;
  }

  button {
    border: none;
    border-radius: 6.25rem;
    font-weight: 500;
    font-size: 0.94rem;
    height: 3rem;
    padding-inline: 1.1rem;
    cursor: pointer;

    @media ${QUERIES.mobileMini} {
      padding-inline: 1.5rem;
      font-weight: 700;
    }
  }

  & > :first-child {
    background-color: var(--color-bg-400);
    color: var(--color-font-700);
    transition: background-color ease-in 0.1s, color ease-in 0.1s;

    &:hover {
      background-color: var(--color-bg-700);
      color: var(--color-font-800);
    }
  }

  & > :nth-child(2) {
    background-color: var(--color-bg-delete);
    color: var(--color-font-normal);
    transition: opacity ease-in 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  & > :last-child {
    background-color: var(--color-accent-100);
    color: var(--color-font-normal);
    transition: opacity ease-in 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`

export const StatusBar = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`

//BASIC INFO
export const BasicInfoSecondary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.88rem;
  margin-bottom: 1.94rem;
`

export const DescriptionWrapper = styled.div`
  & > :first-child {
    font-weight: 700;
    font-size: var(--font-size-small);
    color: var(--color-font-100);
    margin-bottom: 6px;

    span {
      color: var(--color-font-300);
    }
  }

  & > :last-child {
    font-weight: 500;
    font-size: var(--font-size-mini);
    color: var(--color-font-300);
  }
`

export const UserAddressWrapper = styled.div`
  font-size: var(--font-size-mini);
  color: var(--color-font-300);
  font-weight: 500;

  p:not(:last-child) {
    margin-bottom: 6px;
  }
`

export const BasicInfoPrimary = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.94rem;

  & > div:not(:nth-child(2)) {
    display: grid;
    gap: 0.81rem;

    p {
      font-weight: 700;
      font-size: var(--font-size-small);
    }
  }
`

export const BillToWrapper = styled.div`
  grid-row: span 2;
  display: grid;
  gap: 9px;

  & > :first-child {
    display: grid;
    gap: 0.81rem;

    p {
      font-weight: 700;
      font-size: var(--font-size-small);
    }
  }

  & > :last-child {
    font-size: var(--font-size-mini);
    color: var(--color-font-300);
    font-weight: 500;

    display: grid;
    gap: 5px;
  }
`

//ITEMS
export const ItemsContainer = styled.div`
  border-radius: 0.8rem;
`
export const ItemsDetailsContainer = styled.div`
  background-color: var(--color-bg-400);
  padding: 1.56rem 1.5rem;
  border-radius: 0.8rem 0.8rem 0 0;

  display: grid;
  gap: 1.5rem;
`

export const ItemsDetailsHeadingWrapper = styled.div`
  display: none;
`
export const ItemsDetailsWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 0.5rem;
  grid-auto-flow: column;

  p {
    font-size: var(--font-size-small);
    font-weight: 700;
  }

  & > :nth-child(2) {
    color: var(--color-font-400);
  }

  & > :nth-child(3) {
    display: none;
  }

  & > :nth-child(4) {
    display: none;
  }

  & > :last-child {
    justify-self: end;
    align-self: center;
    grid-row: span 2;
  }
`

export const GrandTotalWrapper = styled.div`
  background-color: var(--color-bg-500);
  color: var(--color-font-normal);
  padding-inline: 1.5rem;
  height: 5rem;
  border-radius: 0 0 0.8rem 0.8rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: var(--font-size-mini);
    color: inherit;
  }

  p {
    font-size: 1.5rem;
  }
`

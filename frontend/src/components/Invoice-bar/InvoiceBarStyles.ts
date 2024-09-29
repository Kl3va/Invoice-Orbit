import styled from 'styled-components'
import { QUERIES } from 'styles/mediaQueries'

// const statusColors = {
//   paid: '#33D69F',
//   pending: '#FF8F00',
//   draft: '#DFE3FA',
// }

// const statusBgColors = {
//   paid: 'rgba(51, 214, 159, 0.5)', // #33D69F with opacity
//   pending: 'rgba(255, 143, 0, 0.5)', // #FF8F00 with opacity
//   draft: 'rgba(223, 227, 250, 0.5)', // #DFE3FAwith opacity
// }

const statusColors = {
  paid: {
    color: '#33D69F',
    bgColor: 'rgba(51, 214, 159, 0.07)',
  },
  pending: {
    color: '#FF8F00',
    bgColor: 'rgba(255, 143, 0, 0.07)',
  },
  draft: {
    color: '#DFE3FA',
    bgColor: 'rgba(223, 227, 250, 0.07)',
  },
}

export const InvoiceRectangle = styled.div`
  max-width: 100%;

  background-color: var(--color-bg-300);
  border-radius: 0.8rem;
  padding: 1.56rem 1.5rem 1.38rem 1.5rem;
  cursor: pointer;
  transition: outline ease-in 0.2s;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 2.5rem auto;

  &:hover {
    outline: 1px solid var(--color-accent-100);
  }

  @media ${QUERIES.tabletMini} {
    display: flex;
    gap: 1.25rem;
    align-items: center;
  }

  svg {
    display: none;

    @media ${QUERIES.tabletMini} {
      display: block;
    }
  }
`

export const StatusContainer = styled.div<{
  status: 'paid' | 'pending' | 'draft'
}>`
  justify-self: right;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 6.5rem;
  height: 2.5rem;
  border-radius: 0.4rem;

  background-color: ${(props) =>
    props.status
      ? statusColors[props.status].bgColor
      : 'rgba(255, 143, 0, 0.07)'};

  span {
    border-radius: 50%;
    width: 0.5rem;
    height: 0.5rem;
    background-color: ${(props) =>
      props.status ? statusColors[props.status].color : '#FF8F00'};
  }

  h4 {
    font-size: 0.94rem;
    color: ${(props) =>
      props.status ? statusColors[props.status].color : '#FF8F00'};
  }
`

export const InvoicePrice = styled.p`
  color: var(--color-font-100);
  font-size: 0.94rem;
  font-weight: 700;

  grid-row: 2 / 3;
  grid-column: 1 / 2;
  align-self: end;

  @media ${QUERIES.tabletMini} {
    align-self: center;
    flex-grow: 0.7;
  }
`

export const InvoiceName = styled.p`
  color: var(--color-font-600);
  font-size: 0.81rem;

  grid-row: 1 / 2;
  grid-column: 2 / 3;
  justify-self: right;
  margin-bottom: 1.5rem;

  @media ${QUERIES.tabletMini} {
    margin-bottom: 0;
    flex-grow: 3;
  }
`

export const InvoiceDueDate = styled.p`
  color: var(--color-font-600);
  font-size: 0.81rem;

  grid-row: 2 / 3;
  grid-column: 1 / 2;
  align-self: start;

  @media ${QUERIES.tabletMini} {
    align-self: center;
    flex-grow: 1.4;
  }
`

export const InvoiceID = styled.h3`
  font-size: 0.94rem;
  color: var(--color-font-100);
  margin-bottom: 1.5rem;

  @media ${QUERIES.tabletMini} {
    margin-bottom: 0;
    flex-grow: 0.5;
  }

  span {
    color: var(--color-font-600);
  }
`

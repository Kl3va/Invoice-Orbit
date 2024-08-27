import styled from 'styled-components'

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
    bgColor: 'rgba(51, 214, 159, 0.1)',
  },
  pending: {
    color: '#FF8F00',
    bgColor: 'rgba(255, 143, 0, 0.1)',
  },
  draft: {
    color: '#DFE3FA',
    bgColor: 'rgba(223, 227, 250, 0.1)',
  },
}

export const InvoiceRectangle = styled.div`
  width: min(87.2%, var(--max-container));
  margin-inline: auto;
  display: flex;
  justify-content: space-between;
  background-color: var(--color-bg-300);
  border-radius: 0.8rem;
  padding: 1.56rem 1.5rem 1.38rem 1.5rem;
`

export const InvoiceRectanglePri = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`

export const InvoiceRectangleSec = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const StatusContainer = styled.div<{
  status?: 'paid' | 'pending' | 'draft'
}>`
  display: flex;
  gap: 0.8rem;
  width: 6.5rem;
  height: 2.5rem;
  borderradius: 0.5rem;
  background-color: ${(props) =>
    props.status
      ? statusColors[props.status].bgColor
      : 'rgba(255, 143, 0, 0.1)'};

  span {
    border-radius: 50%;
    width: 0.5rem;
    height: 0.5rem;
    background-color: ${(props) =>
      props.status ? statusColors[props.status].color : '#FF8F00'};
  }
`

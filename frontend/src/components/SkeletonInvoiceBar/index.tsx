import styled, { keyframes } from 'styled-components'
import { QUERIES } from 'styles/mediaQueries'

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

const SkeletonWrapper = styled.div`
  width: min(87.2%, var(--max-container));
  margin-inline: auto;
  background-color: var(--color-bg-300);
  border-radius: 0.8rem;
  padding: 1.5rem 1.5rem 0.5rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 2.5rem auto;
  gap: 1.5rem;

  @media ${QUERIES.tabletMini} {
    display: flex;
    gap: 1.25rem;
    align-items: center;
    padding: 1.5rem;
  }
`

const SkeletonLine = styled.div`
  border-radius: 0.3rem;
  background: linear-gradient(
    to right,
    var(--color-bg-900) 8%,
    var(--color-bg-999) 18%,
    var(--color-bg-900) 33%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
`

const SkeletonID = styled(SkeletonLine)`
  width: 60%;
  height: 1rem;

  @media ${QUERIES.tabletMini} {
    width: 15%;
  }
`

const SkeletonName = styled(SkeletonLine)`
  align-self: center;
  justify-self: end;
  width: 70%;
  height: 0.6rem;

  @media ${QUERIES.tabletMini} {
    width: 20%;
  }
`

const SkeletonDueDate = styled(SkeletonLine)`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  align-self: start;
  width: 80%;
  height: 0.6rem;

  @media ${QUERIES.tabletMini} {
    width: 20%;
    align-self: center;
  }
`

const SkeletonPrice = styled(SkeletonLine)`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  align-self: end;
  width: 90%;
  height: 1rem;

  @media ${QUERIES.tabletMini} {
    width: 25%;
    align-self: center;
  }
`

const SkeletonStatus = styled(SkeletonLine)`
  justify-self: end;
  align-self: end;
  width: 7rem;
  height: 2.5rem;
`

const SkeletonArrow = styled(SkeletonLine)`
  width: 0.7rem;
  height: 0.7rem;
  display: none;

  @media ${QUERIES.tabletMini} {
    align-self: center;
    display: block;
  }
`

const SkeletonInvoiceBar = () => {
  return (
    <SkeletonWrapper>
      <SkeletonID />
      <SkeletonName />
      <SkeletonDueDate />
      <SkeletonPrice />
      <SkeletonStatus />
      <SkeletonArrow />
    </SkeletonWrapper>
  )
}

export const SkeletonInvoiceBarList: React.FC<{ count: number }> = ({
  count,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonInvoiceBar key={index} />
      ))}
    </>
  )
}

export default SkeletonInvoiceBar

import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

export const GobackButtonStyle = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: var(--color-font-100);
  font-size: 0.94rem;
  font-weight: 700;
  cursor: pointer;
  transition: gap ease-out 0.2s;

  &:hover {
    gap: 1.8rem;
  }
`

const GobackButton = () => {
  const navigate = useNavigate()

  return (
    <GobackButtonStyle onClick={() => navigate(-1)}>
      <svg width='7' height='10' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M6.342.886L2.114 5.114l4.228 4.228'
          stroke='#9277FF'
          stroke-width='2'
          fill='none'
          fill-rule='evenodd'
        />
      </svg>
      Go back
    </GobackButtonStyle>
  )
}

export default GobackButton

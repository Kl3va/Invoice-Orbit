import styled from 'styled-components'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateStatus } from 'store/features/invoice/invoiceSlice'
import { QUERIES } from 'styles/mediaQueries'

const FilterInputContainer = styled.div`
  position: absolute;
  top: 2.2rem;
  right: -3.5rem;
  z-index: 1000;
  display: grid;
  gap: 1rem;
  width: 12rem;
  padding: 1.63rem 1rem 1.44rem 1.5rem;
  border-radius: 0.5rem;
  background-color: var(--color-bg-300);
  box-shadow: 0px 10px 20px 0px #48549f40;

  @media ${QUERIES.tabletMini} {
    top: 2rem;
    right: -1.8rem;
  }

  div {
    display: flex;
    gap: 0.82rem;
    justify-content: flex-start;
    align-items: center;

    label {
      color: var(--color-font-100);
      font-size: 0.94rem;
      font-weight: 700;
    }
  }
`

export const InputCheckbox = styled.input`
  -webkit-appearance: none;
  cursor: pointer;
  appearance: none;
  background-color: var(--color-border-100);
  margin: 0;
  font: inherit;
  color: var(--color-accent-100);
  width: 1rem;
  height: 1rem;
  border-radius: 0.15rem;
  display: block;
  transform: translateY(-0.07rem);

  display: grid;
  place-content: center;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1rem 1rem var(--color-font-normal);

    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:checked {
    background-color: var(--color-accent-100);
  }

  &:hover {
    border: 0.1rem solid var(--color-accent-100);
  }
`

const FilterInputs = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { selectedStatus } = useAppSelector((state) => state.invoice)

  const handleCheckboxChange = (status: string) => {
    const newSelectedStatus = selectedStatus.includes(status)
      ? selectedStatus.filter((value) => value !== status)
      : [...selectedStatus, status]

    dispatch(updateStatus(newSelectedStatus))
  }

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedStatus.length > 0) {
      params.set('status', selectedStatus.join(','))
    }
    // Update the URL
    navigate({ search: params.toString() })
  }, [selectedStatus, navigate])

  return (
    <FilterInputContainer>
      <div>
        <InputCheckbox
          type='checkbox'
          name='draft'
          id='draft'
          checked={selectedStatus.includes('draft')}
          onChange={() => handleCheckboxChange('draft')}
        />
        <label>Draft</label>
      </div>
      <div>
        <InputCheckbox
          type='checkbox'
          name='pending'
          id='pending'
          checked={selectedStatus.includes('pending')}
          onChange={() => handleCheckboxChange('pending')}
        />
        <label>Pending</label>
      </div>
      <div>
        <InputCheckbox
          type='checkbox'
          name='paid'
          id='paid'
          checked={selectedStatus.includes('paid')}
          onChange={() => handleCheckboxChange('paid')}
        />
        <label>Paid</label>
      </div>
    </FilterInputContainer>
  )
}

export default FilterInputs

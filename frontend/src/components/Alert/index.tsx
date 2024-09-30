import { useEffect } from 'react'
import { QUERIES } from 'styles/mediaQueries'
import styled, { css } from 'styled-components'
import { controlAlertModal } from 'store/features/modal/modalSlice'
import { useAppSelector, useAppDispatch } from 'store/hooks'

const AlertComponent = styled.aside<{ show: boolean }>`
  position: fixed;
  width: min(100%, 25rem);
  padding: 1rem;
  background: var(--color-font-normal);
  right: 0;
  top: 0;
  z-index: 5000;
  transition: all ease-in 0.2s;
  transform: translate(100%);

  border-radius: 0.75rem;
  box-shadow: 0px 8px 8px -4px rgba(16, 24, 40, 0.03),
    0px 20px 24px -4px rgba(16, 24, 40, 0.08);

  display: flex;
  gap: 1rem;
  align-items: center;

  @media ${QUERIES.mobile} {
    padding: 1rem 1.5rem;
  }

  p {
    color: #0c0e16;
    font-size: 1rem;
  }

  span {
    width: 2.5rem;
    aspect-ratio: 1 / 1;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: var(--color-font-normal);
    font-size: 0.8rem;

    @media ${QUERIES.mobile} {
      width: 3rem;
      font-size: 1.3rem;
    }
  }

  ${({ show }) =>
    show &&
    css`
      transform: translate(0);
    `}
`
const FailureIcon = styled.span`
  border: 8px solid #ffcccb;
  background: #ff0000;
`
const SuccessIcon = styled.span`
  border: 8px solid #d1fadf;
  background: #039855;
`

const Alert = () => {
  const dispatch = useAppDispatch()
  const { alert } = useAppSelector((state) => state.modal)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (alert.show) {
      timeout = setTimeout(() => {
        dispatch(
          controlAlertModal({
            show: false,
            message: alert.message,
            type: alert.type,
          })
        )
      }, 2000)
    }

    return () => clearTimeout(timeout)
  }, [alert.show, alert.message, alert.type, dispatch])

  return (
    <AlertComponent show={alert.show}>
      {alert.type === 'success' ? (
        <SuccessIcon>&#10004;</SuccessIcon>
      ) : (
        <FailureIcon>&#10006;</FailureIcon>
      )}

      <p>{alert.message}</p>
    </AlertComponent>
  )
}

export default Alert

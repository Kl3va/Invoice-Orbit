import styled from 'styled-components'

export const BackgroundBlur = styled.aside<{
  confirm?: boolean
}>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.35);
  z-index: ${({ confirm }) => (confirm ? 100 : 98)};
  display: block;
`

const ConfirmationBg = () => {
  return <BackgroundBlur confirm={false}></BackgroundBlur>
}

export default ConfirmationBg

import styled from 'styled-components'

export const BackgroundBlur = styled.aside<{
  formState?: null | 'edit' | 'new'
}>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.35);
  z-index: ${({ formState }) =>
    formState === 'new' || formState === 'edit' ? 98 : 100};
  display: block;
`

const ConfirmationBg = () => {
  return <BackgroundBlur formState={'edit'}></BackgroundBlur>
}

export default ConfirmationBg

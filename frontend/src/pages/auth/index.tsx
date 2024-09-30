import {
  SignedIn,
  SignedOut,
  SignUpButton,
  SignInButton,
  // useAuth,
} from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'
import {
  AuthBtnGroup,
  AuthContainer,
  AuthMain,
  LogoMinContainer,
  TypeWritingContainer,
  TypeWritingText,
} from 'pages/auth/AuthStyles'

const Auth = () => {
  //const { getToken } = useAuth()

  // const displayToken = async () => {
  //   const token = await getToken()
  //   console.log('Your token:', token)
  // }

  return (
    <AuthMain>
      <SignedOut>
        <section>
          <TypeWritingContainer>
            <p> Effortlessly</p>
            <TypeWritingText>
              track, manage, and organize your invoices all in one place...
            </TypeWritingText>
          </TypeWritingContainer>
        </section>

        <section>
          <AuthContainer>
            <h1>Get Started</h1>
            <AuthBtnGroup>
              <SignUpButton mode='modal' />
              <SignInButton mode='modal' />
            </AuthBtnGroup>
            <LogoMinContainer>
              <svg xmlns='http://www.w3.org/2000/svg' width='28' height='26'>
                <path
                  fill='var(--color-font-100)'
                  fillRule='evenodd'
                  d='M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z'
                />
              </svg>
              <p>Invoice-Orbit</p>
            </LogoMinContainer>
          </AuthContainer>
        </section>
      </SignedOut>

      <SignedIn>
        {/* <button onClick={displayToken}>Get Token</button> */}
        <Navigate to='/' />
      </SignedIn>
    </AuthMain>
  )
}

export default Auth

import {
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton,
  SignInButton,
  useAuth,
} from '@clerk/clerk-react'
import {
  AuthMain,
  TypeWritingContainer,
  TypeWritingText,
} from 'pages/auth/AuthStyles'

//type Props = {}

const Auth = () => {
  //const { user } = useUser()
  // console.log(user)
  const { getToken } = useAuth()
  //const { session } = useSession()
  //console.log(session?.id)

  const displayToken = async () => {
    const token = await getToken()
    console.log('Your token:', token)
  }

  return (
    <AuthMain>
      <section>
        <TypeWritingContainer>
          <p> Effortlessly</p>
          <TypeWritingText>
            track, manage, and organize your invoices in one place...
          </TypeWritingText>
        </TypeWritingContainer>
      </section>
      <section>
        <div>
          <SignedOut>
            <SignUpButton mode='modal' />
            <SignInButton mode='modal' />
          </SignedOut>
        </div>
      </section>

      <SignedIn>
        <UserButton />

        <button onClick={displayToken}>Get Token</button>
      </SignedIn>
    </AuthMain>
  )
}

export default Auth

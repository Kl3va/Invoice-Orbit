import {
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton,
  SignInButton,
  useAuth,
} from '@clerk/clerk-react'

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
    <div>
      <SignedOut>
        <SignUpButton mode='modal' />
        <SignInButton mode='modal' />
      </SignedOut>

      <SignedIn>
        <UserButton />
        <button onClick={displayToken}>Get Token</button>
      </SignedIn>
    </div>
  )
}

export default Auth

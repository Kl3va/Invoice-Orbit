import {
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton,
  SignInButton,
  useUser,
} from '@clerk/clerk-react'

//type Props = {}

const Auth = () => {
  const { user } = useUser()
  console.log(user)

  return (
    <div>
      <SignedOut>
        <SignUpButton mode='modal' />
        <SignInButton mode='modal' />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default Auth

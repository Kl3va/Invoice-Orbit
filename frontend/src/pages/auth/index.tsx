import {
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton,
  SignInButton,
} from '@clerk/clerk-react'

//type Props = {}

const Auth = () => {
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

//PACKAGES
import { UserButton, useUser } from '@clerk/clerk-react'

//ASSETS
import moonIcon from 'assets/icon-moon.svg'
import sunIcon from 'assets/icon-sun.svg'
import logo from 'assets/logo-blend.png'
import defaultImg from 'assets/default-preview.png'

interface NavbarProps {
  toggleTheme: () => void
  themeSwitch: boolean
}

const Navbar = ({ themeSwitch, toggleTheme }: NavbarProps) => {
  const { user } = useUser()
  return (
    <aside>
      <div>
        <div>
          <img src={logo} alt='logo' />
        </div>

        <div onClick={toggleTheme}>
          <img src={themeSwitch ? sunIcon : moonIcon} alt='theme switch icon' />
        </div>
      </div>
      <div>{user ? <UserButton /> : <img src={defaultImg} alt='logo' />}</div>
    </aside>
  )
}

export default Navbar

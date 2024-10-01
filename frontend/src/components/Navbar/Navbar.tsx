//REDUX
import { useAppSelector } from 'store/hooks'

//PACKAGES
import { UserButton, useUser } from '@clerk/clerk-react'
import { dark, neobrutalism } from '@clerk/themes'
import { Link } from 'react-router-dom'

//ASSETS
import moonIcon from 'assets/icon-moon.svg'
import sunIcon from 'assets/icon-sun.svg'
import logo from 'assets/logo-blend.png'
import defaultImg from 'assets/default-preview.png'

//STYLES
import {
  NavbarAside,
  NavbarContainer,
  LogoContainer,
  ProfileContainer,
  ThemeWrapper,
} from 'components/Navbar/NavbarStyles'

interface NavbarProps {
  toggleTheme: () => void
  themeSwitch: boolean
}

const Navbar = ({ themeSwitch, toggleTheme }: NavbarProps) => {
  const { user } = useUser()

  const { isFormOpen } = useAppSelector((state) => state.invoice)

  return (
    <NavbarAside>
      <NavbarContainer>
        <ThemeWrapper>
          <LogoContainer $isactive={isFormOpen}>
            {isFormOpen ? (
              <img src={logo} alt='logo' />
            ) : (
              <Link to='/'>
                <img src={logo} alt='logo' />
              </Link>
            )}
          </LogoContainer>

          <div onClick={toggleTheme} style={{ cursor: 'pointer' }}>
            <img
              src={themeSwitch ? sunIcon : moonIcon}
              alt='theme switch icon'
            />
          </div>
        </ThemeWrapper>
        <ProfileContainer>
          {user ? (
            <UserButton
              appearance={{ baseTheme: themeSwitch ? dark : neobrutalism }}
            />
          ) : (
            <img src={defaultImg} alt='logo' />
          )}
        </ProfileContainer>
      </NavbarContainer>
    </NavbarAside>
  )
}

export default Navbar

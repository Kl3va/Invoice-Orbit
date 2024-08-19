import './App.css'
//import { useState } from 'react'
import { GlobalStyles } from 'styles/globalStyles'
import { lightTheme } from 'styles/theme'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//PAGES
import Homepage from 'pages/home'
import Auth from 'pages/auth'

function App() {
  // const [themeSwitch, setThemeSwitch] = useState(true)

  // const toggleTheme = () => {
  //   setThemeSwitch((themeSwitch) => !themeSwitch)
  //themeSwitch ? lightTheme : darkTheme
  // }

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Router>
        {/* <Navbar toggleTheme={toggleTheme} /> */}
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

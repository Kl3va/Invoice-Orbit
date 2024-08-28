//import './App.css'
import { useState } from 'react'
import { GlobalStyles } from 'styles/globalStyles'
import { darkTheme, lightTheme } from 'styles/theme'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//PAGES
import Homepage from 'pages/home'
import Auth from 'pages/auth'

//COMPONENTS
import Navbar from 'components/Navbar/Navbar'
import InvoiceDetailsPage from 'pages/invoice-details'

function App() {
  const [themeSwitch, setThemeSwitch] = useState(false)

  const toggleTheme = () => {
    setThemeSwitch((themeSwitch) => !themeSwitch)
  }

  return (
    <ThemeProvider theme={themeSwitch ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Navbar toggleTheme={toggleTheme} themeSwitch={themeSwitch} />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/invoices/:id' element={<InvoiceDetailsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

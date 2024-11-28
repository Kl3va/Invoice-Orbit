//import './App.css'
import { useState, Suspense, lazy } from 'react'
import { GlobalStyles } from 'styles/globalStyles'
import { darkTheme, lightTheme } from 'styles/theme'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//PAGES
const Homepage = lazy(() => import('pages/home'))
const Auth = lazy(() => import('pages/auth'))
const NotFound = lazy(() => import('pages/not-found'))
const Analytics = lazy(() => import('pages/analytics'))
const InvoiceDetailsPage = lazy(() => import('pages/invoice-details'))

//COMPONENTS
import PrivateRoute from 'components/PrivateRoutes'
import Layout from 'components/Layout'
import Navbar from 'components/Navbar/Navbar'
import CenteredSpinner from 'components/CenteredSpinner'

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
        <Suspense fallback={<CenteredSpinner />}>
          <Routes>
            <Route path='/auth' element={<Auth />} />

            <Route element={<PrivateRoute />}>
              <Route path='/' element={<Layout />}>
                <Route index element={<Homepage />} />
                <Route path='/invoices/:id' element={<InvoiceDetailsPage />} />
              </Route>
              <Route path='/analytics' element={<Analytics />} />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App

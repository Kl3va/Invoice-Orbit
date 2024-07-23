import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//PAGES
import Homepage from './pages/home'
import Auth from './pages/auth'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default App

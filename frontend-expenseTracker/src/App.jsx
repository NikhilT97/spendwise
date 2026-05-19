import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
          <BrowserRouter>
          <Routes>
              <Route path='/' element={ <Navigate to="/signup" />} />
              <Route path='/signup' element={<Signup/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/dashboard' element={<Dashboard/>} />
 

          </Routes>
          </BrowserRouter>
     </>
  )
}

export default App

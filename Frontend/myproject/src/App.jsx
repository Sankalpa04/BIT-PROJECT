import react from 'react'
import './App.css'
import LandingPage from './pages/landingpage.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Signuppage from './pages/Signuppage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Loginpage.jsx'
import SignupPage from './pages/Signuppage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar/> 
          <Routes>
            <Route path='/' element={<LandingPage/>}/>  
            <Route path='/login' element={<LoginPage/>}/>  
            <Route path='/signup' element={<SignupPage/>}/>  
          </Routes>
        <Footer/>
    </BrowserRouter>
  )
}

export default App
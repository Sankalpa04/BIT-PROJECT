import react from 'react'
import './App.css'
import LandingPage from './pages/landingpage.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Signuppage from './pages/Signuppage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Loginpage.jsx'
import SignupPage from './pages/Signuppage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import ViewDetailsPage from './pages/ViewDetailsPage.jsx'
import AddPackageForm from './pages/AddHotelForm.jsx'
import AdminLayout from './pages/AdminLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import HotelLists from './pages/HotelLists.jsx'
import AddHotelForm from './pages/AddHotelForm.jsx'
import Admin from './pages/Admin.jsx'
import UsersList from './pages/UsersLists.jsx'
import BookingList from './pages/BookingLists.jsx'
import SuccessfulPayment from './pages/SuccessfulPayment.jsx'
import UnsuccessfulPayment from './pages/UnsuccessfulPayment.jsx'
import UnauthorizedPage from './pages/UnauthorizedPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>  
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/hotel/:id" element={<ViewDetailsPage/>} />
            <Route path="/success?session_id={CHECKOUT_SESSION_ID}, // " element={<SuccessfulPayment/>} />
            <Route path="/cancel" element={<UnsuccessfulPayment/>} />
            <Route path="/unauthorized" element={<UnauthorizedPage/>} />
            {/* <Route path="/admin" element={<Admin/>} /> */}
            {/* <Route path="/admin" element={<Admin />}/> */}
            <Route path="/admin/" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />  {/* Dashboard page */}
              <Route path="dashboard" element={<Dashboard />} />  {/* Dashboard page */}
              <Route path="bookings" element={<BookingList />} />  {/* Dashboard page */}
              <Route path="hotels" element={<HotelLists />} />  {/* HotelLists page */}
              <Route path="addhotel" element={<AddHotelForm />} />  {/* Bookings page */}
              <Route path="users" element={<UsersList />} />  {/* Bookings page 
              {/* You can add more admin pages here */}
          </Route>        
          </Routes>
        <Footer/>
    </BrowserRouter>
  )
}

export default App
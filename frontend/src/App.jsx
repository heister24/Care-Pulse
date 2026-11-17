import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'

const App = () => {

  const location = useLocation()
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div className='min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800'>
      <ToastContainer />
      {!hideNavbar && <Navbar />}
      <main className='flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </main>
      {!hideNavbar && (
        <div className='w-full border-t border-slate-200/90 bg-white/70 mt-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <Footer />
          </div>
        </div>
      )}
    </div>
  )
}

export default App

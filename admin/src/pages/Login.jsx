import axios from 'axios'
import { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import HospitalLogo from '../components/HospitalLogo'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.removeItem('dToken')
          setDToken('')
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.removeItem('aToken')
          setAToken('')
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message)
    }

  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-sky-50/50 flex flex-col justify-center items-center px-4 py-12'>
      
      {/* Top Branding */}
      <div className='text-center mb-6'>
        <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200/80 text-slate-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm'>
          <span className='w-2 h-2 rounded-full bg-blue-600 animate-pulse'></span>
          Hospital Management Portal
        </div>
        <div className='flex justify-center mb-3'>
          <HospitalLogo size="lg" subtitle="Management & Clinical Access" />
        </div>
        <p className='text-slate-500 text-xs sm:text-sm font-medium'>Authorized Medical Staff & Administration Access</p>
      </div>

      {/* Main Login Card */}
      <div className='w-full max-w-md bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-medical-lg'>
        
        {/* Role Tabs */}
        <div className='grid grid-cols-2 p-1.5 bg-slate-100/80 rounded-2xl mb-6'>
          <button
            type='button'
            onClick={() => { setState('Admin'); setEmail(''); setPassword(''); }}
            className={`py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              state === 'Admin'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hospital Admin
          </button>
          <button
            type='button'
            onClick={() => { setState('Doctor'); setEmail(''); setPassword(''); }}
            className={`py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              state === 'Doctor'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Doctor Portal
          </button>
        </div>

        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
          <div>
            <label className='block text-xs font-semibold text-slate-700 mb-1.5'>
              {state === 'Admin' ? 'Administrator Email' : 'Doctor Work Email'}
            </label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              className='w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800' 
              type="email" 
              placeholder={state === 'Admin' ? 'admin@carepulse.com' : 'doctor@carepulse.com'}
              required 
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-slate-700 mb-1.5'>
              Password
            </label>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              className='w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800' 
              type="password" 
              placeholder='Enter your secure password'
              required 
            />
          </div>

          <button 
            type='submit'
            className='w-full mt-2 py-3 px-4 text-sm font-semibold text-white rounded-xl btn-medical shadow-medical transition-all'
          >
            Sign in as {state === 'Admin' ? 'Administrator' : 'Doctor'} &rarr;
          </button>

          <div className='pt-3 text-center border-t border-slate-100 text-xs text-slate-500'>
            {state === 'Admin' ? (
              <p>
                Practicing clinician?{' '}
                <button 
                  type='button'
                  onClick={() => { setState('Doctor'); setEmail(''); setPassword(''); }} 
                  className='text-blue-600 font-semibold hover:underline'
                >
                  Switch to Doctor Portal
                </button>
              </p>
            ) : (
              <p>
                Hospital administration?{' '}
                <button 
                  type='button'
                  onClick={() => { setState('Admin'); setEmail(''); setPassword(''); }} 
                  className='text-sky-600 font-semibold hover:underline'
                >
                  Switch to Admin Login
                </button>
              </p>
            )}
          </div>
        </form>

      </div>

      <p className='mt-6 text-center text-xs text-slate-400'>
        Secured with End-to-End Hospital Data Encryption &bull; CarePulse Healthcare
      </p>

    </div>
  )
}

export default Login

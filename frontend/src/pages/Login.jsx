import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import HospitalLogo from '../components/HospitalLogo'

const Login = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const { backendUrl, token, setToken, userData } = useContext(AppContext)

  // Determine initial state based on route: /register opens 'Sign Up', /login opens 'Login'
  const isRegisterRoute = location.pathname === '/register'
  const [state, setState] = useState(isRegisterRoute ? 'Sign Up' : 'Login')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Sync state if navigation changes between /login and /register
  useEffect(() => {
    if (location.pathname === '/register') {
      setState('Sign Up')
    } else if (location.pathname === '/login') {
      setState('Login')
    }
  }, [location.pathname])

  // Only redirect away from login/register if the user is truly authenticated with valid user data
  useEffect(() => {
    if (token && userData) {
      navigate('/')
    }
  }, [token, userData, navigate])

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        if (data.success) {
          toast.success(data.message || 'Account created successfully! Please login.')
          // Redirect to login page and switch form state to Login
          setState('Login')
          setPassword('')
          setName('')
          navigate('/login')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Logged in successfully!')
          navigate('/')
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
    <form onSubmit={onSubmitHandler} className='min-h-[85vh] flex items-center justify-center py-10 px-4'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 sm:p-10 w-full max-w-md border border-slate-100 rounded-3xl text-slate-600 text-sm shadow-medical-lg bg-white'>
        <div className='w-full flex justify-center mb-2'>
          <div onClick={() => navigate('/')}>
            <HospitalLogo size="md" />
          </div>
        </div>
        <div className='w-full text-center'>
          <h2 className='text-2xl font-extrabold text-slate-900 tracking-tight'>
            {state === 'Sign Up' ? 'Create Patient Account' : 'Patient Portal Sign In'}
          </h2>
          <p className='text-xs text-slate-400 mt-1'>
            {state === 'Sign Up' ? 'Register for direct appointment bookings' : 'Access your verified health records & bookings'}
          </p>
        </div>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <label className='block text-xs font-semibold text-slate-700 mb-1'>Full Name</label>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800' 
              type="text" 
              placeholder='e.g. Sandesh Sharma' 
              required 
            />
          </div>
        )}

        <div className='w-full'>
          <label className='block text-xs font-semibold text-slate-700 mb-1'>Email Address</label>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800' 
            type="email" 
            placeholder='yourname@example.com' 
            required 
          />
        </div>

        <div className='w-full'>
          <label className='block text-xs font-semibold text-slate-700 mb-1'>Password</label>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800' 
            type="password" 
            placeholder='Minimum 8 characters' 
            minLength={8} 
            required 
          />
        </div>

        <button 
          type="submit" 
          className='btn-medical text-white w-full py-3 my-2 rounded-xl text-sm font-bold shadow-medical hover:scale-[1.01] transition-all'
        >
          {state === 'Sign Up' ? 'Create Account' : 'Sign In to Portal'} &rarr;
        </button>

        <div className='w-full pt-3 border-t border-slate-100 text-center text-xs text-slate-500'>
          {state === 'Sign Up' ? (
            <p>
              Already registered?{' '}
              <span 
                onClick={() => { setState('Login'); navigate('/login'); }} 
                className='text-sky-600 font-bold hover:underline cursor-pointer'
              >
                Sign In
              </span>
            </p>
          ) : (
            <p>
              New to CarePulse?{' '}
              <span 
                onClick={() => { setState('Sign Up'); navigate('/register'); }} 
                className='text-blue-600 font-bold hover:underline cursor-pointer'
              >
                Create an Account
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

export default Login

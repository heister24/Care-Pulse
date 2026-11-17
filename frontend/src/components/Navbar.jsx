import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import HospitalLogo from './HospitalLogo'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData, setUserData } = useContext(AppContext)
  const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setUserData(false)
    navigate('/login')
  }

  return (
    <header className='sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_2px_16px_-4px_rgba(37,99,235,0.06)]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between'>
        
        {/* Left: Brand Identity */}
        <div className='flex items-center gap-3 sm:gap-4'>
          <div onClick={() => navigate('/')} className='shrink-0'>
            <HospitalLogo size="md" subtitle="HEALTHCARE NETWORK" />
          </div>

          <div className='h-5 w-px bg-slate-200 hidden lg:block'></div>

          <div className='hidden xl:flex items-center gap-2 text-[11px] font-semibold text-blue-700 bg-blue-50/80 border border-blue-200/60 px-3 py-1 rounded-full'>
            <span className='w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse'></span>
            <span>24/7 Clinical Care &bull; Verified Doctors</span>
          </div>
        </div>

        {/* Center: Executive Segmented Island Navigation with Unique Bespoke Icons */}
        <nav className='hidden md:flex items-center bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner gap-1'>
          {/* 1. Home */}
          <NavLink 
            to='/' 
            className={({ isActive }) => `flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 ${
              isActive 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-white/80 font-semibold'
            }`}
          >
            {({ isActive }) => (
              <>
                <svg 
                  className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-600'}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M3 10.5L12 3l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path d="M9 14.5h2l1-2 1.5 4 1.5-2h2" />
                </svg>
                <span>Home</span>
              </>
            )}
          </NavLink>

          {/* 2. Find Doctors */}
          <NavLink 
            to='/doctors' 
            className={({ isActive }) => `flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 ${
              isActive 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-white/80 font-semibold'
            }`}
          >
            {({ isActive }) => (
              <>
                <svg 
                  className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-600'}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3" />
                  <line x1="9" y1="12.5" x2="9" y2="17" />
                  <circle cx="9" cy="19.5" r="2.5" />
                  <path d="M19 14v4" />
                  <path d="M17 16h4" />
                </svg>
                <span>Specialists</span>
              </>
            )}
          </NavLink>

          {/* 3. About Us */}
          <NavLink 
            to='/about' 
            className={({ isActive }) => `flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 ${
              isActive 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-white/80 font-semibold'
            }`}
          >
            {({ isActive }) => (
              <>
                <svg 
                  className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-600'}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M12 9v6" />
                  <path d="M9 12h6" />
                </svg>
                <span>About</span>
              </>
            )}
          </NavLink>

          {/* 4. Contact */}
          <NavLink 
            to='/contact' 
            className={({ isActive }) => `flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 ${
              isActive 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold' 
                : 'text-slate-600 hover:text-blue-600 hover:bg-white/80 font-semibold'
            }`}
          >
            {({ isActive }) => (
              <>
                <svg 
                  className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-600'}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Contact</span>
              </>
            )}
          </NavLink>
        </nav>

        {/* Right: Authenticated Patient Actions or Sign In Hub */}
        <div className='flex items-center gap-2 sm:gap-3'>
          {token && userData ? (
            <div className='flex items-center gap-2'>
              {/* 1-Click My Appointments Shortcut */}
              <button
                onClick={() => navigate('/my-appointments')}
                className='hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all shadow-xs'
                title="View your booked hospital consultations"
              >
                <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>My Appointments</span>
              </button>

              {/* Patient Profile Dropdown */}
              <div className='relative group'>
                <div className='flex items-center gap-2.5 py-1.5 px-2.5 sm:px-3 rounded-full hover:bg-slate-50 transition-all cursor-pointer border border-slate-200/80 bg-white shadow-xs'>
                  <div className='relative shrink-0'>
                    <img 
                      className='w-8 h-8 rounded-full object-cover ring-2 ring-blue-600/30' 
                      src={userData.image || assets.profile_pic} 
                      alt={userData.name} 
                    />
                    <span className='absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white'></span>
                  </div>

                  <div className='hidden sm:block text-left leading-tight'>
                    <p className='text-xs font-bold text-slate-800 max-w-[110px] truncate'>{userData.name}</p>
                    <span className='text-[10px] font-semibold text-blue-600 uppercase tracking-wider'>
                      Patient
                    </span>
                  </div>

                  <svg 
                    className='w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:rotate-180 transition-transform duration-200' 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {/* Dropdown Popover */}
                <div className='absolute top-full right-0 pt-2 text-sm text-slate-700 z-50 hidden group-hover:block'>
                  <div className='w-56 bg-white rounded-2xl p-2.5 shadow-xl border border-slate-100 divide-y divide-slate-100'>
                    <div className='px-3 py-2 bg-blue-50/60 rounded-xl mb-1.5'>
                      <p className='font-bold text-slate-800 text-xs truncate'>{userData.name}</p>
                      <p className='text-[11px] text-slate-500 truncate mt-0.5'>{userData.email}</p>
                    </div>

                    <div className='py-1 space-y-0.5'>
                      <button 
                        onClick={() => navigate('/my-profile')} 
                        className='w-full px-3 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors flex items-center gap-2.5 text-xs font-semibold text-slate-600'
                      >
                        <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>Patient Profile</span>
                      </button>

                      <button 
                        onClick={() => navigate('/my-appointments')} 
                        className='w-full px-3 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors flex items-center gap-2.5 text-xs font-semibold text-slate-600'
                      >
                        <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                          <path d="m9 16 2 2 4-4" />
                        </svg>
                        <span>My Appointments</span>
                      </button>
                    </div>

                    <div className='pt-1.5'>
                      <button 
                        onClick={logout} 
                        className='w-full px-3 py-2 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl cursor-pointer transition-colors flex items-center gap-2.5 text-xs font-semibold'
                      >
                        <svg className="w-4 h-4 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex items-center gap-2 sm:gap-2.5'>
              {/* Doctor / Admin Link */}
              <a 
                href={adminUrl} 
                target='_blank' 
                rel='noopener noreferrer'
                className='hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-full hover:bg-slate-50 transition-colors'
                title="Clinical Staff & Hospital Administration Portal"
              >
                <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Staff Portal</span>
              </a>

              <button 
                onClick={() => navigate('/login')} 
                className='text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 px-3 py-2 rounded-full transition-colors'
              >
                Sign In
              </button>

              <button 
                onClick={() => navigate('/login')} 
                className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] transition-all flex items-center gap-2'
              >
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Book Appointment</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setShowMenu(true)} 
            className='p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-50 md:hidden transition-colors' 
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <div 
        className={`md:hidden ${
          showMenu ? 'fixed inset-0 w-full h-screen' : 'h-0 w-0'
        } right-0 top-0 z-50 overflow-hidden bg-white transition-all duration-300 flex flex-col`}
      >
        <div className='flex items-center justify-between px-6 py-5 border-b border-slate-100'>
          <HospitalLogo size="sm" subtitle="HEALTHCARE NETWORK" />
          <button 
            onClick={() => setShowMenu(false)} 
            className='p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors'
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className='flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between'>
          <ul className='flex flex-col gap-2 text-base font-semibold text-slate-700'>
            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/' 
              className={({ isActive }) => `px-4 py-3 rounded-2xl transition-colors flex items-center gap-3 ${
                isActive ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25' : 'hover:bg-slate-50'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10.5L12 3l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <path d="M9 14.5h2l1-2 1.5 4 1.5-2h2" />
              </svg>
              <span>Home Hub</span>
            </NavLink>

            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/doctors' 
              className={({ isActive }) => `px-4 py-3 rounded-2xl transition-colors flex items-center gap-3 ${
                isActive ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25' : 'hover:bg-slate-50'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3" />
                <line x1="9" y1="12.5" x2="9" y2="17" />
                <circle cx="9" cy="19.5" r="2.5" />
                <path d="M19 14v4" />
                <path d="M17 16h4" />
              </svg>
              <span>Specialist Doctors</span>
            </NavLink>

            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/about' 
              className={({ isActive }) => `px-4 py-3 rounded-2xl transition-colors flex items-center gap-3 ${
                isActive ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25' : 'hover:bg-slate-50'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M12 9v6" />
                <path d="M9 12h6" />
              </svg>
              <span>About CarePulse</span>
            </NavLink>

            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/contact' 
              className={({ isActive }) => `px-4 py-3 rounded-2xl transition-colors flex items-center gap-3 ${
                isActive ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25' : 'hover:bg-slate-50'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>24/7 Contact</span>
            </NavLink>

            <div className='pt-4 mt-2 border-t border-slate-100'>
              {token && userData ? (
                <div className='flex flex-col gap-2'>
                  <NavLink 
                    onClick={() => setShowMenu(false)} 
                    to='/my-profile' 
                    className='px-4 py-3 rounded-xl bg-slate-50 text-slate-800 font-semibold flex items-center gap-2'
                  >
                    <span>Patient Profile</span>
                  </NavLink>
                  <NavLink 
                    onClick={() => setShowMenu(false)} 
                    to='/my-appointments' 
                    className='px-4 py-3 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center gap-2'
                  >
                    <span>My Appointments</span>
                  </NavLink>
                  <button 
                    onClick={() => { setShowMenu(false); logout(); }} 
                    className='w-full py-3 mt-2 text-rose-600 bg-rose-50 rounded-xl font-bold text-center'
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className='flex flex-col gap-2.5'>
                  <button 
                    onClick={() => { setShowMenu(false); navigate('/login'); }} 
                    className='w-full py-3 border border-blue-600 text-blue-600 rounded-xl font-bold'
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => { setShowMenu(false); navigate('/login'); }} 
                    className='w-full py-3 bg-blue-600 text-white rounded-xl font-bold'
                  >
                    Book Appointment
                  </button>
                  <a 
                    href={adminUrl} 
                    target='_blank' 
                    rel='noopener noreferrer'
                    className='w-full py-2.5 text-center text-xs font-semibold text-slate-500 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors'
                  >
                    Doctor & Admin Access &rarr;
                  </a>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar

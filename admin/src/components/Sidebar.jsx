import { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <aside className='min-h-[calc(100vh-65px)] bg-white border-r border-slate-100 w-16 md:w-64 shrink-0 transition-all'>
      <div className='py-6'>
        <p className='hidden md:block px-6 mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400'>
          {aToken ? 'Hospital Administration' : 'Clinical Practice'}
        </p>

        {aToken && (
          <nav className='flex flex-col gap-1'>
            <NavLink 
              to={'/admin-dashboard'} 
              className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 md:px-6 transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-sky-50 to-white text-sky-700 font-semibold border-r-4 border-sky-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className='w-8 h-8 rounded-lg bg-sky-50/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform'>
                <img className='w-4' src={assets.home_icon} alt='Dashboard' />
              </div>
              <p className='hidden md:block text-sm'>Dashboard</p>
            </NavLink>

            <NavLink 
              to={'/all-appointments'} 
              className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 md:px-6 transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-sky-50 to-white text-sky-700 font-semibold border-r-4 border-sky-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className='w-8 h-8 rounded-lg bg-sky-50/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform'>
                <img className='w-4' src={assets.appointment_icon} alt='Appointments' />
              </div>
              <p className='hidden md:block text-sm'>Appointments</p>
            </NavLink>

            <NavLink 
              to={'/add-doctor'} 
              className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 md:px-6 transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-sky-50 to-white text-sky-700 font-semibold border-r-4 border-sky-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className='w-8 h-8 rounded-lg bg-sky-50/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform'>
                <img className='w-4' src={assets.add_icon} alt='Add Doctor' />
              </div>
              <p className='hidden md:block text-sm'>Add Doctor</p>
            </NavLink>

            <NavLink 
              to={'/doctor-list'} 
              className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 md:px-6 transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-sky-50 to-white text-sky-700 font-semibold border-r-4 border-sky-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className='w-8 h-8 rounded-lg bg-sky-50/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform'>
                <img className='w-4' src={assets.people_icon} alt='Doctors List' />
              </div>
              <p className='hidden md:block text-sm'>Doctors Directory</p>
            </NavLink>
          </nav>
        )}

        {dToken && (
          <nav className='flex flex-col gap-1'>
            <NavLink 
              to={'/doctor-dashboard'} 
              className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 md:px-6 transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-50 to-white text-blue-700 font-semibold border-r-4 border-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className='w-8 h-8 rounded-lg bg-blue-50/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform'>
                <img className='w-4' src={assets.home_icon} alt='Dashboard' />
              </div>
              <p className='hidden md:block text-sm'>Overview</p>
            </NavLink>

            <NavLink 
              to={'/doctor-appointments'} 
              className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 md:px-6 transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-50 to-white text-blue-700 font-semibold border-r-4 border-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className='w-8 h-8 rounded-lg bg-blue-50/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform'>
                <img className='w-4' src={assets.appointment_icon} alt='Appointments' />
              </div>
              <p className='hidden md:block text-sm'>My Appointments</p>
            </NavLink>

            <NavLink 
              to={'/doctor-profile'} 
              className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 md:px-6 transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-50 to-white text-blue-700 font-semibold border-r-4 border-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className='w-8 h-8 rounded-lg bg-blue-50/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform'>
                <img className='w-4' src={assets.people_icon} alt='Profile' />
              </div>
              <p className='hidden md:block text-sm'>Doctor Profile</p>
            </NavLink>
          </nav>
        )}
      </div>
    </aside>
  )
}

export default Sidebar

import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken, getAllDoctors])

  return (
    <div className='p-4 sm:p-6 max-w-7xl mx-auto'>

      {/* Header section */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
        <div>
          <div className='inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-1.5'>
            <span className='w-2 h-2 rounded-full bg-sky-600'></span>
            Hospital Staff Roster
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>
            Doctors <span className='text-sky-600'>Directory</span>
          </h1>
          <p className='text-slate-500 text-xs sm:text-sm mt-0.5'>
            Manage physician credentials, active hospital duty rosters, and booking availability.
          </p>
        </div>

        <div className='inline-flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-sm'>
          <span>Enrolled Doctors:</span>
          <span className='bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full font-bold'>{doctors?.length || 0}</span>
        </div>
      </div>

      {/* Doctors Grid */}
      {!doctors || doctors.length === 0 ? (
        <div className='bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-medical'>
          <div className='w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-lg font-bold'>
            i
          </div>
          <p className='text-slate-600 font-semibold text-sm'>No Doctors Registered</p>
          <p className='text-slate-400 text-xs mt-1'>Use the &apos;Add Doctor&apos; tab to onboard new medical staff.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {doctors.map((item, index) => (
            <div 
              className='bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-medical hover:-translate-y-1 transition-all duration-300 flex flex-col group' 
              key={item._id || index}
            >
              <div className='relative bg-gradient-to-b from-blue-50 to-sky-50/40 h-52 overflow-hidden flex items-center justify-center'>
                <img 
                  className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500' 
                  src={item.image} 
                  alt={item.name} 
                />
                
                {/* Floating Availability Pill */}
                <div className='absolute top-3 right-3'>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-sm border ${
                    item.available 
                      ? 'bg-blue-50/90 text-blue-800 border-blue-200' 
                      : 'bg-slate-100/90 text-slate-600 border-slate-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-blue-600 animate-pulse' : 'bg-slate-400'}`}></span>
                    {item.available ? 'On Duty' : 'Off Duty'}
                  </span>
                </div>
              </div>

              <div className='p-5 flex-1 flex flex-col justify-between'>
                <div>
                  <span className='inline-block text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full mb-1.5'>
                    {item.speciality}
                  </span>
                  <h3 className='text-base font-bold text-slate-800 truncate' title={item.name}>
                    {item.name}
                  </h3>
                  <p className='text-xs text-slate-400 mt-0.5'>
                    {item.degree || 'Certified Practitioner'}
                  </p>
                </div>

                {/* Duty Toggle Control */}
                <div className='mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs'>
                  <span className='text-slate-500 font-medium'>Accepting Appointments</span>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input 
                      type="checkbox" 
                      onChange={() => changeAvailability(item._id)} 
                      checked={item.available} 
                      className='sr-only peer' 
                    />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default DoctorsList

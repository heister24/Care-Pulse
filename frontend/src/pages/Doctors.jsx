import { useContext, useEffect, useState, useCallback } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const specialitiesList = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  const applyFilter = useCallback(() => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }, [doctors, speciality])

  useEffect(() => {
    applyFilter()
  }, [applyFilter])

  return (
    <div className='py-6'>
      <div className='pb-4 border-b border-slate-200 mb-6 flex flex-wrap items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900'>
            {speciality ? `${speciality} Specialists` : 'All Hospital Physicians'}
          </h1>
          <p className='text-xs sm:text-sm text-slate-500 mt-1'>
            Explore verified specialists across departments and book your consultation in real-time.
          </p>
        </div>
        <span className='px-3.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold rounded-full'>
          {filterDoc.length} {filterDoc.length === 1 ? 'Doctor' : 'Doctors'} Available
        </span>
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-6'>
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-2 px-4 border rounded-xl text-xs font-bold transition-all sm:hidden flex items-center gap-2 ${
            showFilter ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          <span>Filter Speciality</span>
        </button>

        {/* Sidebar Departments list */}
        <div className={`flex-col gap-2.5 text-xs font-semibold text-slate-600 sm:w-64 flex-shrink-0 ${showFilter ? 'flex w-full' : 'hidden sm:flex'}`}>
          <p className='text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1'>
            Departments
          </p>
          <button
            onClick={() => navigate('/doctors')}
            className={`w-full text-left px-4 py-2.5 rounded-xl border transition-all text-xs font-bold ${
              !speciality
                ? 'bg-blue-600 text-white border-transparent shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/60'
            }`}
          >
            All Specialities
          </button>
          {specialitiesList.map((item, index) => {
            const isSelected = speciality === item
            return (
              <button
                key={index}
                onClick={() => isSelected ? navigate('/doctors') : navigate(`/doctors/${item}`)}
                className={`w-full text-left px-4 py-2.5 rounded-xl border transition-all text-xs font-semibold ${
                  isSelected
                    ? 'bg-blue-600 text-white border-transparent shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/60'
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>

        {/* Doctors Grid */}
        <div className='w-full flex-1'>
          {filterDoc.length === 0 ? (
            <div className='py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col items-center gap-3'>
              <div className='w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center'>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
                  <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
                  <circle cx="20" cy="10" r="2"/>
                </svg>
              </div>
              <p className='text-base font-bold text-slate-800'>No doctors listed under {speciality || 'this category'} right now.</p>
              <p className='text-xs text-slate-500 max-w-sm'>Please check back soon or consult our general physicians for immediate assistance.</p>
              <button onClick={() => navigate('/doctors')} className='mt-2 text-xs font-bold text-blue-700 underline'>
                Browse All Doctors
              </button>
            </div>
          ) : (
            <div className='w-full grid grid-cols-auto gap-5 gap-y-7'>
              {filterDoc.map((item, index) => (
                <div
                  onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                  className='group border border-slate-200/80 rounded-2xl overflow-hidden cursor-pointer hover:shadow-medical-lg hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-300 bg-white flex flex-col justify-between'
                  key={item._id || index}
                >
                  <div className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-sky-50 h-52 flex items-center justify-center'>
                    <img className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
                    <div className='absolute top-3 left-3'>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border ${item.available ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-700/80 text-slate-200 border-slate-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-white animate-pulse' : 'bg-slate-400'}`}></span>
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>

                  <div className='p-4 sm:p-5 flex flex-col gap-1.5'>
                    <p className='text-xs font-bold tracking-wide uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md inline-block w-fit border border-blue-100'>
                      {item.speciality}
                    </p>
                    <p className='text-slate-900 text-lg font-bold truncate group-hover:text-blue-700 transition-colors'>{item.name}</p>
                    <p className='text-slate-500 text-xs font-medium'>{item.degree} • {item.experience}</p>

                    <div className='mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs'>
                      <div>
                        <span className='text-slate-400 text-[11px] block'>Consultation</span>
                        <span className='text-slate-900 font-extrabold text-sm'>₹{item.fees}</span>
                      </div>
                      <span className='text-sky-700 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1'>
                        Book Now →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors

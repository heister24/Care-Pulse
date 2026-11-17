import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <section className='flex flex-col items-center gap-4 my-12 text-slate-800'>
            <div className='inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200'>
                <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>Premier Medical Staff</span>
            </div>

            <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-center'>
                Top Doctors Available
            </h2>

            <p className='sm:w-1/2 text-center text-sm text-slate-500 leading-relaxed'>
                Meet our highly rated, experienced consultants and schedule your consultation effortlessly.
            </p>

            <div className='w-full grid grid-cols-auto gap-5 pt-6 gap-y-7 px-2 sm:px-0'>
                {doctors.slice(0, 8).map((item, index) => (
                    <div
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                        className='group border border-slate-200/80 rounded-2xl overflow-hidden cursor-pointer hover:shadow-medical-lg hover:border-sky-300 hover:-translate-y-1.5 transition-all duration-300 bg-white flex flex-col justify-between'
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
                            <p className='text-slate-900 text-lg font-bold truncate group-hover:text-blue-600 transition-colors'>{item.name}</p>
                            <p className='text-slate-500 text-xs font-medium'>{item.degree} • {item.experience}</p>

                            <div className='mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs'>
                                <div>
                                    <span className='text-slate-400 text-[11px] block'>Consultation</span>
                                    <span className='text-slate-900 font-extrabold text-sm'>₹{item.fees}</span>
                                </div>
                                <span className='text-blue-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1'>
                                    Book Now →
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
                className='mt-8 px-9 py-3 rounded-full font-bold text-sm bg-white border border-slate-300 text-slate-700 shadow-sm hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 hover:shadow-md transition-all'
            >
                View All Specialists ({doctors.length})
            </button>
        </section>
    )
}

export default TopDoctors

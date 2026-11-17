import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    if (relDoc.length === 0) return null

    return (
        <section className='flex flex-col items-center gap-4 my-16 text-slate-800 border-t border-slate-200/80 pt-12'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200'>
                <svg className="w-3.5 h-3.5 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Same Department Specialists</span>
            </div>
            <h3 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>Related Doctors</h3>
            <p className='sm:w-1/3 text-center text-sm text-slate-500'>Other experienced healthcare professionals in {speciality}.</p>

            <div className='w-full grid grid-cols-auto gap-5 pt-6 gap-y-7 px-2 sm:px-0'>
                {relDoc.map((item, index) => (
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
                                    View Slots →
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RelatedDoctors

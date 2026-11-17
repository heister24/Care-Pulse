import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <section id='speciality' className='flex flex-col items-center gap-4 py-16 text-slate-800 scroll-mt-20'>
            <div className='inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200'>
                <svg className="w-3.5 h-3.5 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
                    <circle cx="20" cy="10" r="2"/>
                </svg>
                <span>Clinical Specialities</span>
            </div>

            <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-center'>
                Find Care by Speciality
            </h2>

            <p className='sm:w-1/2 text-center text-sm text-slate-500 leading-relaxed'>
                Select from our specialized medical divisions to find the right consultant for your diagnostic and healthcare needs.
            </p>

            <div className='flex sm:justify-center gap-4 pt-6 w-full overflow-x-auto pb-4'>
                {specialityData.map((item, index) => (
                    <Link
                        to={`/doctors/${item.speciality}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className='flex flex-col items-center text-xs font-semibold text-slate-700 cursor-pointer flex-shrink-0 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-medical hover:border-blue-400 hover:text-blue-600 hover:-translate-y-1.5 transition-all duration-300 min-w-28 sm:min-w-32 group'
                        key={index}
                    >
                        <div className='w-16 h-16 sm:w-20 sm:h-20 mb-3 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center p-3 border border-slate-100 group-hover:scale-110 transition-transform duration-300'>
                            <img className='w-full h-full object-contain' src={item.image} alt={item.speciality} />
                        </div>
                        <p className='text-center leading-tight'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default SpecialityMenu

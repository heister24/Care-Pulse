import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <section className='relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 shadow-medical-lg text-white'>
            {/* Ambient blue glow */}
            <div className='absolute -top-24 -left-24 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl pointer-events-none'></div>
            <div className='absolute -bottom-24 -right-24 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl pointer-events-none'></div>

            <div className='flex items-center justify-between'>
                {/* ------- Left Side ------- */}
                <div className='flex-1 py-10 sm:py-14 md:py-16 lg:py-20 lg:pl-4 z-10'>
                    <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-white/25 text-blue-100 mb-4'>
                        <svg className="w-3.5 h-3.5 text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <path d="M12 8v8M8 12h8"/>
                        </svg>
                        <span>Accredited Healthcare System</span>
                    </div>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight'>
                        Book Doctor Appointments <br />
                        <span className='bg-gradient-to-r from-sky-200 to-blue-100 bg-clip-text text-transparent'>
                            With 100+ Trusted Specialists
                        </span>
                    </h2>
                    <p className='text-sky-100/90 text-sm sm:text-base mt-3 max-w-md font-normal leading-relaxed'>
                        Don&apos;t delay your health checks. Find real-time slots, consult online or in-clinic, and take control of your well-being today.
                    </p>
                    <button
                        onClick={() => { navigate('/register'); window.scrollTo(0, 0) }}
                        className='bg-white text-blue-900 font-extrabold text-sm sm:text-base px-9 py-3.5 rounded-full mt-6 shadow-md hover:bg-blue-50 hover:shadow-xl hover:scale-105 transition-all duration-300'
                    >
                        Create Patient Account
                    </button>
                </div>

                {/* ------- Right Side ------- */}
                <div className='hidden md:block md:w-1/2 lg:w-[380px] relative z-10 self-end'>
                    <img className='w-full max-w-md drop-shadow-2xl' src={assets.appointment_img} alt="Medical Doctor" />
                </div>
            </div>
        </section>
    )
}

export default Banner

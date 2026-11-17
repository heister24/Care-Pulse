import { assets } from '../assets/assets'

const Header = () => {
    return (
        <section className='relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800 rounded-3xl px-6 md:px-12 lg:px-16 my-6 shadow-medical-lg text-white'>
            {/* Background decorative glow circles */}
            <div className='absolute -top-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none'></div>
            <div className='absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none'></div>

            <div className='flex flex-col md:flex-row items-center justify-between gap-8 py-12 md:py-16'>
                {/* --------- Header Left --------- */}
                <div className='md:w-1/2 flex flex-col items-start gap-5 z-10'>
                    {/* Healthcare Trust Pill */}
                    <div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-white/20 text-blue-100'>
                        <span className='w-2 h-2 rounded-full bg-blue-400 animate-pulse'></span>
                        Verified Hospital Specialists • 24/7 Available
                    </div>

                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight'>
                        Consult Trusted Doctors <br />
                        <span className='bg-gradient-to-r from-blue-200 via-sky-100 to-white bg-clip-text text-transparent'>
                            Book Top Care in Seconds
                        </span>
                    </h1>

                    <p className='text-sky-100/90 text-sm sm:text-base font-normal max-w-lg leading-relaxed'>
                        Connect with 100+ certified physicians across premier clinical departments. Experience seamless appointments, transparent schedules, and top-tier hospital care.
                    </p>

                    {/* Social proof group profiles */}
                    <div className='flex items-center gap-3.5 bg-blue-950/40 backdrop-blur-sm p-2.5 rounded-2xl border border-white/10'>
                        <img className='w-24 object-contain' src={assets.group_profiles} alt="Satisfied patients" />
                        <div className='text-xs'>
                            <p className='font-bold text-white'>50,000+ Patients Served</p>
                            <p className='text-sky-200 text-[11px] font-medium'>★★★★★ 4.9/5 Overall Clinical Rating</p>
                        </div>
                    </div>

                    <div className='flex flex-wrap items-center gap-3 pt-2'>
                        <a href='#speciality' className='inline-flex items-center gap-2.5 bg-white text-blue-900 font-bold px-7 py-3 rounded-full text-sm hover:bg-blue-50 hover:shadow-lg transition-all duration-300'>
                            Book Appointment
                            <img className='w-3.5' src={assets.arrow_icon} alt="" />
                        </a>
                        <a href='#speciality' className='inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-6 py-3 rounded-full text-sm border border-white/25 transition-all duration-300'>
                            Explore Specialties
                        </a>
                    </div>
                </div>

                {/* --------- Header Right --------- */}
                <div className='md:w-1/2 flex justify-center md:justify-end relative z-10'>
                    <div className='relative max-w-md lg:max-w-lg'>
                        <div className='absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl'></div>
                        <img className='w-full h-auto object-cover rounded-2xl drop-shadow-2xl' src={assets.header_img} alt="Hospital Doctors Team" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header

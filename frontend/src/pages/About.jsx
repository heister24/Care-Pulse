import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='pb-16'>

      {/* Header section with hospital badge */}
      <div className='text-center pt-8 sm:pt-12 pb-6'>
        <div className='inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm'>
          <span className='w-2 h-2 rounded-full bg-blue-600 animate-pulse'></span>
          Accredited Healthcare Network
        </div>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight'>
          About <span className='text-blue-600'>CarePulse Healthcare</span>
        </h1>
        <p className='text-slate-500 text-sm sm:text-base max-w-xl mx-auto mt-2'>
          Delivering trusted, compassionate clinical expertise and smart healthcare scheduling for thousands of families every day.
        </p>
      </div>

      {/* Main Story & Vision Section */}
      <div className='my-8 sm:my-12 flex flex-col md:flex-row items-center gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-medical'>
        <div className='relative w-full md:w-5/12 max-w-[420px]'>
          <img 
            className='w-full rounded-2xl object-cover shadow-md border-4 border-slate-50' 
            src={assets.about_image} 
            alt="CarePulse Hospital Team" 
          />
          <div className='absolute -bottom-4 -right-3 sm:-bottom-5 sm:-right-4 bg-blue-600 text-white p-3.5 sm:p-4 rounded-2xl shadow-medical-lg flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg'>
              24/7
            </div>
            <div>
              <p className='text-xs font-semibold uppercase tracking-wide text-white/90'>Continuous Care</p>
              <p className='text-sm font-bold'>Dedicated Support</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center gap-5 md:w-7/12 text-slate-600 text-sm sm:text-base leading-relaxed'>
          <div>
            <span className='text-xs font-bold text-blue-600 uppercase tracking-widest'>Our Mission</span>
            <h2 className='text-xl sm:text-2xl font-bold text-slate-800 mt-1'>
              Pioneering compassionate, accessible healthcare technology.
            </h2>
          </div>
          <p>
            Welcome to <strong className='text-slate-800 font-semibold'>CarePulse Healthcare</strong>, where modern clinical standards meet seamless digital care. We remove the friction between patients and certified doctors, providing rapid consultations, verified slot scheduling, and unified patient records.
          </p>
          <p>
            Every doctor in our network undergoes rigorous credentialing across top medical boards. Whether you require general medicine, emergency guidance, pediatric consultation, or specialist referrals, our dedicated team ensures your health is in expert hands.
          </p>

          <div className='pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='p-3.5 rounded-xl bg-blue-50/70 border border-blue-100/70'>
              <p className='font-bold text-blue-900 text-sm flex items-center gap-1.5'>
                <span className='w-2 h-2 rounded-full bg-blue-600'></span>
                Our Clinical Vision
              </p>
              <p className='text-xs text-blue-800/80 mt-1'>
                Empowering every patient with transparent, immediate access to premier healthcare specialists worldwide.
              </p>
            </div>

            <div className='p-3.5 rounded-xl bg-slate-50 border border-slate-200/70'>
              <p className='font-bold text-slate-900 text-sm flex items-center gap-1.5'>
                <span className='w-2 h-2 rounded-full bg-blue-600'></span>
                Patient Safety First
              </p>
              <p className='text-xs text-slate-600 mt-1'>
                Adhering to strict clinical privacy protocols and international hospital-grade security standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='mt-14 mb-8 text-center'>
        <div className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2'>
          Quality Excellence
        </div>
        <h2 className='text-2xl sm:text-3xl font-bold text-slate-800'>
          Why Choose <span className='text-blue-600'>CarePulse</span>
        </h2>
        <p className='text-slate-500 text-sm max-w-lg mx-auto mt-1'>
          Engineered for patient peace of mind and clinical precision.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>
        {/* Card 1 */}
        <div className='bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-medical hover:border-blue-300 transition-all duration-300 group'>
          <div className='w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all'>
            01
          </div>
          <h3 className='text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors'>
            Clinical Efficiency
          </h3>
          <p className='text-slate-500 text-sm leading-relaxed'>
            Direct real-time appointment booking with instant slot confirmation. Eliminating long hospital queue times and administrative delays.
          </p>
        </div>

        {/* Card 2 */}
        <div className='bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-medical hover:border-blue-300 transition-all duration-300 group'>
          <div className='w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all'>
            02
          </div>
          <h3 className='text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors'>
            Verified Specialists
          </h3>
          <p className='text-slate-500 text-sm leading-relaxed'>
            Direct access to senior board-certified doctors, surgeons, pediatricians, and general physicians with verified credentials.
          </p>
        </div>

        {/* Card 3 */}
        <div className='bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-medical hover:border-blue-300 transition-all duration-300 group'>
          <div className='w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all'>
            03
          </div>
          <h3 className='text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors'>
            Personalized Healthcare
          </h3>
          <p className='text-slate-500 text-sm leading-relaxed'>
            Tailored medical schedules, automated appointment reminders, and unified patient records designed for lifelong wellness.
          </p>
        </div>
      </div>

    </div>
  )
}

export default About

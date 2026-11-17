import { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken, getDashData])

  return dashData && (
    <div className='p-4 sm:p-6 max-w-7xl mx-auto'>

      {/* Header section */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
        <div>
          <div className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-1.5'>
            <span className='w-2 h-2 rounded-full bg-blue-600 animate-pulse'></span>
            Hospital Overview
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>
            Administration <span className='text-blue-600'>Dashboard</span>
          </h1>
          <p className='text-slate-500 text-xs sm:text-sm mt-0.5'>
            Real-time medical staffing, patient appointments, and financial operations metrics.
          </p>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8'>
        
        {/* Doctors Card */}
        <div className='bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-medical transition-all flex items-center gap-4'>
          <div className='w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-inner'>
            <img className='w-7' src={assets.doctor_icon} alt="Doctors" />
          </div>
          <div>
            <p className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>{dashData.doctors}</p>
            <p className='text-xs sm:text-sm font-medium text-slate-500'>Verified Physicians</p>
            <span className='inline-block mt-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full'>
              Active Medical Staff
            </span>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-medical transition-all flex items-center gap-4'>
          <div className='w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 shadow-inner'>
            <img className='w-7' src={assets.appointments_icon} alt="Appointments" />
          </div>
          <div>
            <p className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>{dashData.appointments}</p>
            <p className='text-xs sm:text-sm font-medium text-slate-500'>Total Appointments</p>
            <span className='inline-block mt-1 text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full'>
              Scheduled Bookings
            </span>
          </div>
        </div>

        {/* Patients Card */}
        <div className='bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-medical transition-all flex items-center gap-4'>
          <div className='w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 shadow-inner'>
            <img className='w-7' src={assets.patients_icon} alt="Patients" />
          </div>
          <div>
            <p className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>{dashData.patients}</p>
            <p className='text-xs sm:text-sm font-medium text-slate-500'>Enrolled Patients</p>
            <span className='inline-block mt-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full'>
              Healthcare Network
            </span>
          </div>
        </div>

        {/* Online Collections Revenue Card */}
        <div className='bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-medical transition-all flex items-center gap-4'>
          <div className='w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-inner'>
            <img className='w-7' src={assets.earning_icon} alt="Earnings" />
          </div>
          <div>
            <p className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>{currency}{dashData.revenue || 0}</p>
            <p className='text-xs sm:text-sm font-medium text-slate-500'>Online Collections</p>
            <span className='inline-block mt-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full'>
              {dashData.paidAppointments || 0} Paid Consultations
            </span>
          </div>
        </div>

      </div>

      {/* Latest Bookings Section */}
      <div className='bg-white rounded-3xl border border-slate-100 shadow-medical overflow-hidden'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50'>
          <div className='flex items-center gap-2.5'>
            <div className='w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600'>
              <img className='w-4' src={assets.list_icon} alt="" />
            </div>
            <div>
              <h2 className='font-bold text-slate-800 text-sm sm:text-base'>Recent Consultations & Payments</h2>
              <p className='text-slate-400 text-xs hidden sm:block'>Latest doctor appointments registered with real-time payment status</p>
            </div>
          </div>
          <span className='text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
            Live Updates
          </span>
        </div>

        <div className='divide-y divide-slate-100'>
          {(!dashData.latestAppointments || dashData.latestAppointments.length === 0) ? (
            <div className='text-center py-12 px-4'>
              <div className='w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-lg font-bold'>
                i
              </div>
              <p className='text-slate-600 font-semibold text-sm'>No Recent Bookings</p>
              <p className='text-slate-400 text-xs mt-1'>New appointment bookings will appear here in real-time.</p>
            </div>
          ) : (
            dashData.latestAppointments.slice(0, 6).map((item, index) => (
              <div 
                className='flex flex-wrap sm:flex-nowrap items-center justify-between px-4 sm:px-6 py-4 hover:bg-slate-50/70 transition-colors gap-3' 
                key={item._id || index}
              >
                <div className='flex items-center gap-3.5 min-w-0'>
                  <img 
                    className='rounded-2xl w-11 h-11 object-cover bg-slate-100 border border-slate-200 shrink-0 shadow-sm' 
                    src={item.docData?.image || assets.upload_area} 
                    alt={item.docData?.name || 'Doctor'} 
                  />
                  <div className='min-w-0'>
                    <p className='text-slate-800 font-semibold text-sm truncate'>
                      {item.docData?.name || 'Doctor'}
                    </p>
                    <p className='text-slate-500 text-xs flex items-center gap-1.5 mt-0.5'>
                      <span className='font-medium text-slate-700'>{slotDateFormat(item.slotDate)}</span>
                      <span className='text-slate-300'>&bull;</span>
                      <span className='text-blue-600 font-medium'>{item.slotTime}</span>
                      <span className='text-slate-300'>&bull;</span>
                      <span className='text-slate-600 font-medium truncate'>Patient: {item.userData?.name || 'User'}</span>
                    </p>
                  </div>
                </div>

                <div className='shrink-0 flex items-center gap-3'>
                  {/* Payment Status Pill */}
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                    item.payment 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.payment ? 'bg-blue-600 animate-pulse' : 'bg-slate-400'}`}></span>
                    <span>{item.payment ? 'Online Paid' : 'Cash on Arrival'}</span>
                  </span>

                  <span className='text-sm font-extrabold text-slate-800 hidden sm:inline'>
                    {currency}{item.amount}
                  </span>

                  {item.cancelled ? (
                    <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200'>
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200'>
                      Completed
                    </span>
                  ) : (
                    <button 
                      onClick={() => cancelAppointment(item._id)} 
                      className='p-1.5 rounded-xl hover:bg-rose-50 text-rose-500 transition-colors group'
                      title="Cancel Appointment"
                    >
                      <img className='w-6 sm:w-7 group-hover:scale-110 transition-transform' src={assets.cancel_icon} alt="Cancel" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}

export default Dashboard

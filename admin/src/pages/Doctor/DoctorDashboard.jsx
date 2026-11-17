import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken, getDashData])

  return dashData && (
    <div className='p-4 sm:p-6 max-w-7xl mx-auto'>

      {/* Header section */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
        <div>
          <div className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-1.5'>
            <span className='w-2 h-2 rounded-full bg-blue-600 animate-pulse'></span>
            Clinical Practice Overview
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>
            Doctor <span className='text-blue-600'>Dashboard</span>
          </h1>
          <p className='text-slate-500 text-xs sm:text-sm mt-0.5'>
            Review patient bookings, daily schedule, and clinical practice earnings.
          </p>
        </div>
      </div>

      {/* Top 3 Metric Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8'>
        
        {/* Earnings Card */}
        <div className='bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-medical transition-all flex items-center gap-4'>
          <div className='w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-inner'>
            <img className='w-7' src={assets.earning_icon} alt="Earnings" />
          </div>
          <div>
            <p className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>{currency} {dashData.earnings}</p>
            <p className='text-xs sm:text-sm font-medium text-slate-500'>Consultation Earnings</p>
            <span className='inline-block mt-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full'>
              Net Medical Revenue
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
            <p className='text-xs sm:text-sm font-medium text-slate-500'>Total Consultations</p>
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
            <p className='text-xs sm:text-sm font-medium text-slate-500'>Treated Patients</p>
            <span className='inline-block mt-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full'>
              Patient Directory
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
              <h2 className='font-bold text-slate-800 text-sm sm:text-base'>Recent Patient Bookings</h2>
              <p className='text-slate-400 text-xs hidden sm:block'>Latest patients booked for consultation</p>
            </div>
          </div>
          <span className='text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
            Schedule Feed
          </span>
        </div>

        <div className='divide-y divide-slate-100'>
          {(!dashData.latestAppointments || dashData.latestAppointments.length === 0) ? (
            <div className='text-center py-12 px-4'>
              <div className='w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-lg font-bold'>
                i
              </div>
              <p className='text-slate-600 font-semibold text-sm'>No Recent Appointments</p>
              <p className='text-slate-400 text-xs mt-1'>Patients booking your slots will appear here.</p>
            </div>
          ) : (
            dashData.latestAppointments.slice(0, 6).map((item, index) => (
              <div 
                className='flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-slate-50/70 transition-colors gap-3' 
                key={item._id || index}
              >
                <div className='flex items-center gap-3.5 min-w-0'>
                  <img 
                    className='rounded-2xl w-11 h-11 object-cover bg-slate-100 border border-slate-200 shrink-0 shadow-sm' 
                    src={item.userData?.image || assets.upload_area} 
                    alt={item.userData?.name || 'Patient'} 
                  />
                  <div className='min-w-0'>
                    <p className='text-slate-800 font-semibold text-sm truncate'>
                      {item.userData?.name || 'Patient'}
                    </p>
                    <p className='text-slate-500 text-xs flex items-center gap-1.5 mt-0.5'>
                      <span className='font-medium text-slate-700'>{slotDateFormat(item.slotDate)}</span>
                      <span className='text-slate-300'>&bull;</span>
                      <span className='text-blue-600 font-medium'>{item.slotTime}</span>
                    </p>
                  </div>
                </div>

                <div className='shrink-0 flex items-center gap-2 sm:gap-3'>
                  {/* Payment status badge */}
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    item.payment 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.payment ? 'bg-blue-600' : 'bg-slate-400'}`}></span>
                    <span>{item.payment ? 'Paid Online' : 'Cash'}</span>
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
                    <div className='flex items-center gap-1 sm:gap-2'>
                      <button 
                        onClick={() => cancelAppointment(item._id)} 
                        className='p-1.5 rounded-xl hover:bg-rose-50 text-rose-500 transition-colors' 
                        title="Cancel Appointment"
                      >
                        <img className='w-6 sm:w-7 hover:scale-110 transition-transform' src={assets.cancel_icon} alt="Cancel" />
                      </button>
                      <button 
                        onClick={() => completeAppointment(item._id)} 
                        className='p-1.5 rounded-xl hover:bg-blue-50 text-blue-600 transition-colors' 
                        title="Complete Appointment"
                      >
                        <img className='w-6 sm:w-7 hover:scale-110 transition-transform' src={assets.tick_icon} alt="Complete" />
                      </button>
                    </div>
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

export default DoctorDashboard

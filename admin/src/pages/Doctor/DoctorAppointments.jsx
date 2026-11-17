import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken, getAppointments])

  return (
    <div className='p-4 sm:p-6 max-w-7xl mx-auto'>

      {/* Header section */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
        <div>
          <div className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-1.5'>
            <span className='w-2 h-2 rounded-full bg-blue-600'></span>
            Assigned Patient Roster
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>
            My <span className='text-blue-600'>Appointments</span>
          </h1>
          <p className='text-slate-500 text-xs sm:text-sm mt-0.5'>
            Manage your scheduled patient consultations, payment statuses, and clinical completions.
          </p>
        </div>

        <div className='inline-flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-sm'>
          <span>Scheduled Bookings:</span>
          <span className='bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold'>{appointments?.length || 0}</span>
        </div>
      </div>

      {/* Appointments Table Card */}
      <div className='bg-white border border-slate-100 rounded-3xl shadow-medical overflow-hidden'>
        <div className='overflow-x-auto max-h-[75vh]'>
          
          {/* Table Header */}
          <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_1.2fr_1fr_2.5fr_1fr_1.3fr] py-3.5 px-6 border-b border-slate-100 font-bold text-xs uppercase tracking-wider text-slate-500 bg-slate-50/80'>
            <p>#</p>
            <p>Patient</p>
            <p>Payment Mode</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fee</p>
            <p className='text-right'>Consultation Action</p>
          </div>

          {/* Table Content */}
          {!appointments || appointments.length === 0 ? (
            <div className='text-center py-16 px-4'>
              <div className='w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-lg font-bold'>
                i
              </div>
              <p className='text-slate-600 font-semibold text-sm'>No Patient Appointments</p>
              <p className='text-slate-400 text-xs mt-1'>Upcoming consultations with patients will appear here.</p>
            </div>
          ) : (
            <div className='divide-y divide-slate-100'>
              {appointments.map((item, index) => (
                <div 
                  className='flex flex-wrap sm:grid sm:grid-cols-[0.5fr_2.5fr_1.2fr_1fr_2.5fr_1fr_1.3fr] items-center text-slate-600 py-3.5 px-6 hover:bg-slate-50/70 transition-colors gap-2 sm:gap-0' 
                  key={item._id || index}
                >
                  <p className='text-xs font-semibold text-slate-400 max-sm:hidden'>{index + 1}</p>
                  
                  {/* Patient Info */}
                  <div className='flex items-center gap-2.5 min-w-0 pr-2'>
                    <img 
                      src={item.userData?.image || assets.upload_area} 
                      className='w-9 h-9 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0' 
                      alt="" 
                    />
                    <div className='truncate'>
                      <p className='font-semibold text-slate-800 text-sm truncate'>{item.userData?.name || 'Patient'}</p>
                      <p className='text-[11px] text-slate-400 sm:hidden'>Age: {calculateAge(item.userData?.dob)}</p>
                    </div>
                  </div>

                  {/* Payment Mode */}
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                      item.payment 
                        ? 'bg-blue-50 text-blue-700 border-blue-200' 
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {item.payment ? 'Online Paid' : 'Cash on Arrival'}
                    </span>
                  </div>

                  {/* Age */}
                  <p className='text-xs font-medium text-slate-500 max-sm:hidden'>
                    {calculateAge(item.userData?.dob)} yrs
                  </p>

                  {/* Date & Time */}
                  <div className='text-xs'>
                    <p className='font-semibold text-slate-700'>{slotDateFormat(item.slotDate)}</p>
                    <span className='inline-block text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full mt-0.5'>
                      {item.slotTime}
                    </span>
                  </div>

                  {/* Fee */}
                  <p className='text-sm font-bold text-slate-800'>
                    {currency}{item.amount}
                  </p>

                  {/* Action / Status */}
                  <div className='sm:text-right shrink-0'>
                    {item.cancelled ? (
                      <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200'>
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200'>
                        Completed
                      </span>
                    ) : (
                      <div className='flex items-center sm:justify-end gap-1.5'>
                        <button 
                          onClick={() => cancelAppointment(item._id)} 
                          className='p-1.5 rounded-xl hover:bg-rose-50 text-rose-500 transition-colors inline-flex items-center justify-center' 
                          title="Cancel Consultation"
                        >
                          <img className='w-6 sm:w-7 hover:scale-110 transition-transform' src={assets.cancel_icon} alt="Cancel" />
                        </button>
                        <button 
                          onClick={() => completeAppointment(item._id)} 
                          className='p-1.5 rounded-xl hover:bg-blue-50 text-blue-600 transition-colors inline-flex items-center justify-center' 
                          title="Mark Completed"
                        >
                          <img className='w-6 sm:w-7 hover:scale-110 transition-transform' src={assets.tick_icon} alt="Complete" />
                        </button>
                      </div>
                    )}
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

export default DoctorAppointments

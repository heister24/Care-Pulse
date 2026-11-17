import { useEffect, useContext, useState, useMemo } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments, changePaymentStatus } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  const [filter, setFilter] = useState('all') // 'all', 'paid', 'cash', 'cancelled'

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken, getAllAppointments])

  // Computed metrics
  const paidCount = useMemo(() => appointments?.filter(a => a.payment).length || 0, [appointments])
  const cashCount = useMemo(() => appointments?.filter(a => !a.payment && !a.cancelled).length || 0, [appointments])
  const cancelledCount = useMemo(() => appointments?.filter(a => a.cancelled).length || 0, [appointments])
  const totalCollections = useMemo(() => {
    return appointments?.filter(a => a.payment).reduce((sum, a) => sum + (a.amount || 0), 0) || 0
  }, [appointments])

  // Filtered appointment list
  const filteredAppointments = useMemo(() => {
    if (!appointments) return []
    if (filter === 'paid') return appointments.filter(a => a.payment)
    if (filter === 'cash') return appointments.filter(a => !a.payment && !a.cancelled)
    if (filter === 'cancelled') return appointments.filter(a => a.cancelled)
    return appointments
  }, [appointments, filter])

  return (
    <div className='p-4 sm:p-6 max-w-7xl mx-auto'>

      {/* Header section */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
        <div>
          <div className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-1.5'>
            <span className='w-2 h-2 rounded-full bg-blue-600'></span>
            Hospital Master Registry
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>
            All <span className='text-blue-600'>Appointments</span>
          </h1>
          <p className='text-slate-500 text-xs sm:text-sm mt-0.5'>
            Centralized consultation roster, real-time payment verification, and patient statuses.
          </p>
        </div>

        {/* Live Metrics Summary */}
        <div className='flex flex-wrap items-center gap-2.5'>
          <div className='bg-white px-3.5 py-2 rounded-2xl border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-sm flex items-center gap-2'>
            <span className='text-slate-400'>Total:</span>
            <span className='bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold'>{appointments?.length || 0}</span>
          </div>

          <div className='bg-white px-3.5 py-2 rounded-2xl border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-sm flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-blue-600'></span>
            <span className='text-slate-400'>Online Paid:</span>
            <span className='bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold'>{paidCount}</span>
          </div>

          <div className='bg-white px-3.5 py-2 rounded-2xl border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-sm flex items-center gap-2'>
            <span className='text-slate-400'>Total Collected:</span>
            <span className='text-slate-900 font-extrabold'>{currency}{totalCollections}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className='flex items-center gap-2 mb-4 overflow-x-auto pb-1'>
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All ({appointments?.length || 0})
        </button>

        <button
          onClick={() => setFilter('paid')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            filter === 'paid'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${filter === 'paid' ? 'bg-white' : 'bg-blue-600'}`}></span>
          Online Paid ({paidCount})
        </button>

        <button
          onClick={() => setFilter('cash')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === 'cash'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Cash on Arrival ({cashCount})
        </button>

        <button
          onClick={() => setFilter('cancelled')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === 'cancelled'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Cancelled ({cancelledCount})
        </button>
      </div>

      {/* Appointments Table Card */}
      <div className='bg-white border border-slate-100 rounded-3xl shadow-medical overflow-hidden'>
        <div className='overflow-x-auto max-h-[75vh]'>
          
          {/* Table Header */}
          <div className='hidden lg:grid grid-cols-[0.5fr_2.2fr_0.8fr_2fr_2fr_1.8fr_1fr_1fr] py-3.5 px-6 border-b border-slate-100 font-bold text-xs uppercase tracking-wider text-slate-500 bg-slate-50/80'>
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Physician</p>
            <p>Payment Status</p>
            <p>Fee</p>
            <p className='text-right'>Action</p>
          </div>

          {/* Table Content */}
          {!filteredAppointments || filteredAppointments.length === 0 ? (
            <div className='text-center py-16 px-4'>
              <div className='w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-lg font-bold'>
                i
              </div>
              <p className='text-slate-600 font-semibold text-sm'>No Appointments Under This Filter</p>
              <p className='text-slate-400 text-xs mt-1'>Switch filters or wait for new bookings.</p>
            </div>
          ) : (
            <div className='divide-y divide-slate-100'>
              {filteredAppointments.map((item, index) => (
                <div 
                  className='flex flex-wrap lg:grid lg:grid-cols-[0.5fr_2.2fr_0.8fr_2fr_2fr_1.8fr_1fr_1fr] items-center text-slate-600 py-3.5 px-6 hover:bg-slate-50/70 transition-colors gap-3 lg:gap-0' 
                  key={item._id || index}
                >
                  <p className='text-xs font-semibold text-slate-400 max-lg:hidden'>{index + 1}</p>
                  
                  {/* Patient Info */}
                  <div className='flex items-center gap-2.5 min-w-0 pr-2'>
                    <img 
                      src={item.userData?.image || assets.upload_area} 
                      className='w-9 h-9 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0' 
                      alt="" 
                    />
                    <div className='truncate'>
                      <p className='font-semibold text-slate-800 text-sm truncate'>{item.userData?.name || 'User'}</p>
                      <p className='text-[11px] text-slate-400 truncate'>{item.userData?.email}</p>
                    </div>
                  </div>

                  {/* Age */}
                  <p className='text-xs font-medium text-slate-500 max-lg:hidden'>
                    {calculateAge(item.userData?.dob)} yrs
                  </p>

                  {/* Date & Time */}
                  <div className='text-xs'>
                    <p className='font-semibold text-slate-700'>{slotDateFormat(item.slotDate)}</p>
                    <span className='inline-block text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full mt-0.5'>
                      {item.slotTime}
                    </span>
                  </div>

                  {/* Doctor Info */}
                  <div className='flex items-center gap-2.5 min-w-0 pr-2'>
                    <img 
                      src={item.docData?.image || assets.upload_area} 
                      className='w-9 h-9 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0' 
                      alt="" 
                    />
                    <div className='truncate'>
                      <p className='font-semibold text-slate-800 text-sm truncate'>{item.docData?.name || 'Doctor'}</p>
                      <p className='text-[11px] text-slate-400 truncate'>{item.docData?.speciality}</p>
                    </div>
                  </div>

                  {/* Payment Status Column */}
                  <div>
                    {item.payment ? (
                      <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'>
                        <span className='w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse'></span>
                        <span>Online Paid</span>
                      </span>
                    ) : (
                      <div className='inline-flex items-center gap-2'>
                        <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200'>
                          <span className='w-1.5 h-1.5 rounded-full bg-slate-400'></span>
                          <span>Cash on Arrival</span>
                        </span>
                        {!item.cancelled && (
                          <button
                            onClick={() => changePaymentStatus(item._id, true)}
                            className='text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer'
                            title="Mark Cash Collected at Hospital Desk"
                          >
                            Mark Paid
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Fee */}
                  <div>
                    <p className='text-sm font-bold text-slate-800'>
                      {currency}{item.amount}
                    </p>
                    <p className='text-[10px] text-slate-400'>
                      {item.payment ? 'Verified' : 'Payment Due'}
                    </p>
                  </div>

                  {/* Action / Status */}
                  <div className='lg:text-right shrink-0'>
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
                        className='p-1.5 rounded-xl hover:bg-rose-50 text-rose-500 transition-colors inline-flex items-center justify-center'
                        title="Cancel Appointment"
                      >
                        <img className='w-6 sm:w-7 hover:scale-110 transition-transform' src={assets.cancel_icon} alt="Cancel" />
                      </button>
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

export default AllAppointments

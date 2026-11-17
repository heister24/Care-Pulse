import { useContext, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token, userData } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_11_2026 => 20 Nov 2026 )
    const slotDateFormat = (slotDate) => {
        if (!slotDate) return ''
        const dateArray = slotDate.split('_')
        if (dateArray.length < 3) return slotDate
        const monthIndex = Number(dateArray[1]) - 1
        const monthName = months[monthIndex] || dateArray[1]
        return `${dateArray[0]} ${monthName} ${dateArray[2]}`
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = useCallback(async () => {
        if (!token) return
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }, [backendUrl, token])

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    const initPay = (order, razorpayKey) => {
        const key = razorpayKey || import.meta.env.VITE_RAZORPAY_KEY_ID
        if (!key || key.includes('---')) {
            return toast.error('Razorpay key not configured in environment')
        }

        if (typeof window.Razorpay === 'undefined') {
            return toast.error('Razorpay SDK failed to load. Please refresh and try again.')
        }

        const options = {
            key: key,
            amount: order.amount,
            currency: order.currency || 'INR',
            name: 'CarePulse Healthcare Network',
            description: "Consultation Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            modal: {
                ondismiss: function () {
                    toast.info('Payment checkout window closed')
                }
            },
            theme: {
                color: '#2563eb'
            },
            prefill: {
                name: userData?.name || '',
                email: userData?.email || '',
                contact: userData?.phone || ''
            },
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", {
                        ...response,
                        appointmentId: order.receipt
                    }, { headers: { token } });
                    if (data.success) {
                        toast.success(data.message || 'Payment Successful!')
                        getUserAppointments()
                    } else {
                        toast.error(data.message)
                    }
                } catch (error) {
                    console.error(error)
                    toast.error(error.response?.data?.message || error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order, data.key)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token, getUserAppointments])

    return (
        <div className='py-6 max-w-5xl m-auto'>
            <div className='flex items-center justify-between pb-4 mb-6 border-b border-slate-200'>
                <div>
                    <h1 className='text-2xl font-extrabold text-slate-900'>My Clinical Appointments</h1>
                    <p className='text-xs text-slate-500 mt-1'>Manage your upcoming hospital appointments, check status, or pay online.</p>
                </div>
                <span className='px-3.5 py-1 bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold rounded-full'>
                    {appointments.length} Total Bookings
                </span>
            </div>

            {appointments.length === 0 ? (
                <div className='bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm flex flex-col items-center gap-4 my-8'>
                    <div className='w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center'>
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                    </div>
                    <h2 className='text-lg font-bold text-slate-800'>No Appointments Scheduled</h2>
                    <p className='text-sm text-slate-500 max-w-sm'>
                        You currently do not have any consultations booked. Browse our specialists to schedule an appointment.
                    </p>
                    <button
                        onClick={() => navigate('/doctors')}
                        className='btn-medical text-white font-bold px-7 py-3 rounded-full text-sm shadow-md hover:shadow-lg transition-all mt-2'
                    >
                        Find a Doctor
                    </button>
                </div>
            ) : (
                <div className='flex flex-col gap-4'>
                    {appointments.map((item, index) => (
                        <div
                            key={item._id || index}
                            className='bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-medical transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5'
                        >
                            <div className='flex items-start sm:items-center gap-4 flex-1'>
                                <img
                                    className='w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-gradient-to-br from-blue-50 to-sky-50 border border-slate-200/70 flex-shrink-0'
                                    src={item.docData?.image || assets.upload_area}
                                    alt={item.docData?.name || 'Doctor'}
                                />
                                <div className='flex flex-col gap-1 text-sm'>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-slate-900 font-extrabold text-base sm:text-lg'>{item.docData?.name}</p>
                                        <img className='w-4 h-4' src={assets.verified_icon} alt="" />
                                    </div>
                                    <p className='text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded w-fit border border-blue-100'>
                                        {item.docData?.speciality}
                                    </p>
                                    <p className='text-xs text-slate-500 mt-1 flex items-center gap-1.5'>
                                        <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                            <circle cx="12" cy="10" r="3"/>
                                        </svg>
                                        <span>{item.docData?.address?.line1 || 'Hospital Clinic'}, {item.docData?.address?.line2 || ''}</span>
                                    </p>
                                    <p className='text-xs text-slate-700 font-semibold mt-1 flex items-center gap-1.5'>
                                        <svg className="w-3.5 h-3.5 text-blue-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                            <line x1="16" y1="2" x2="16" y2="6"/>
                                            <line x1="8" y1="2" x2="8" y2="6"/>
                                            <line x1="3" y1="10" x2="21" y2="10"/>
                                        </svg>
                                        <span className='text-slate-900 font-bold'>{slotDateFormat(item.slotDate)}</span> at{' '}
                                        <span className='text-blue-700 font-bold'>{item.slotTime}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Actions / Status column */}
                            <div className='w-full sm:w-auto flex flex-col gap-2 justify-center text-xs text-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100'>
                                <div className='text-right sm:text-center text-xs text-slate-500 mb-1'>
                                    Fee: <strong className='text-slate-900 text-sm font-bold'>₹{item.amount}</strong>
                                </div>

                                {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                    <button
                                        onClick={() => setPayment(item._id)}
                                        className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl shadow-sm transition-all sm:min-w-44'
                                    >
                                        Pay Online
                                    </button>
                                )}

                                {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                    <div className='flex flex-col gap-1.5 sm:min-w-44'>
                                        <button
                                            onClick={() => appointmentStripe(item._id)}
                                            className='py-2 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center transition-colors'
                                            title="Pay with Stripe"
                                        >
                                            <img className='h-4 object-contain' src={assets.stripe_logo} alt="Stripe" />
                                        </button>
                                        <button
                                            onClick={() => appointmentRazorpay(item._id)}
                                            className='py-2 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center transition-colors'
                                            title="Pay with Razorpay"
                                        >
                                            <img className='h-4 object-contain' src={assets.razorpay_logo} alt="Razorpay" />
                                        </button>
                                    </div>
                                )}

                                {!item.cancelled && item.payment && !item.isCompleted && (
                                    <span className='inline-flex items-center justify-center gap-1.5 py-1.5 px-4 rounded-xl text-blue-800 bg-blue-50 border border-blue-200 font-bold text-xs sm:min-w-44'>
                                        <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                        <span>Payment Received</span>
                                    </span>
                                )}

                                {item.isCompleted && (
                                    <span className='inline-flex items-center justify-center gap-1.5 py-1.5 px-4 rounded-xl text-blue-800 bg-blue-50 border border-blue-200 font-bold text-xs sm:min-w-44'>
                                        <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                            <path d="m9 12 2 2 4-4"/>
                                        </svg>
                                        <span>Consultation Completed</span>
                                    </span>
                                )}

                                {!item.cancelled && !item.isCompleted && (
                                    <button
                                        onClick={() => cancelAppointment(item._id)}
                                        className='py-2 px-4 rounded-xl text-slate-500 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all font-semibold sm:min-w-44'
                                    >
                                        Cancel Appointment
                                    </button>
                                )}

                                {item.cancelled && !item.isCompleted && (
                                    <span className='inline-flex items-center justify-center gap-1.5 py-1.5 px-4 rounded-xl text-rose-700 bg-rose-50 border border-rose-200 font-bold text-xs sm:min-w-44'>
                                        <svg className="w-3.5 h-3.5 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"/>
                                            <line x1="6" y1="6" x2="18" y2="18"/>
                                        </svg>
                                        <span>Appointment Cancelled</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyAppointments

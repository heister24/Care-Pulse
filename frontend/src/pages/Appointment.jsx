import { useContext, useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = useCallback(() => {
        const info = doctors.find((doc) => doc._id === docId)
        setDocInfo(info || null)
    }, [doctors, docId])

    const getAvailableSlots = useCallback(() => {
        if (!docInfo) return
        setDocSlots([])

        let today = new Date()
        let slots = []

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date(today)
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const timeStr = formattedTime

                const isBooked = docInfo.slots_booked && docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(timeStr)

                if (!isBooked) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            slots.push(timeSlots)
        }

        setDocSlots(slots)
    }, [docInfo])

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Please sign in to schedule an appointment')
            return navigate('/login')
        }

        if (!slotTime) {
            return toast.warning('Please select a preferred consultation time slot')
        }

        const bookingDate = new Date()
        bookingDate.setDate(bookingDate.getDate() + slotIndex)
        let day = bookingDate.getDate()
        let month = bookingDate.getMonth() + 1
        let year = bookingDate.getFullYear()
        const slotDate = `${day}_${month}_${year}`

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId, fetchDocInfo])

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots()
        }
    }, [docInfo, getAvailableSlots])

    if (!docInfo) {
        return (
            <div className='py-28 text-center text-slate-500'>
                <div className='w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin m-auto mb-4'></div>
                <p className='font-medium text-slate-600'>Loading specialist clinical profile...</p>
            </div>
        )
    }

    return (
        <div className='py-6'>
            {/* ----- Doctor Details Hero Card ----- */}
            <div className='bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-medical flex flex-col sm:flex-row gap-6 md:gap-8'>
                <div className='sm:w-72 flex-shrink-0'>
                    <div className='relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-sky-50 border border-slate-200/60 h-72 sm:h-full'>
                        <img className='w-full h-full object-cover object-top' src={docInfo.image} alt={docInfo.name} />
                        <div className='absolute top-3 left-3'>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border ${docInfo.available ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-700/80 text-slate-200 border-slate-600'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${docInfo.available ? 'bg-white animate-pulse' : 'bg-slate-400'}`}></span>
                                {docInfo.available ? 'Accepting Patients' : 'Not Available'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='flex-1 flex flex-col justify-between'>
                    <div>
                        <div className='flex flex-wrap items-center justify-between gap-3'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900'>{docInfo.name}</h1>
                                <img className='w-5 h-5' src={assets.verified_icon} alt="Board Certified" title="Board Certified Medical Professional" />
                            </div>
                            <span className='px-3.5 py-1 bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-bold rounded-full'>
                                {docInfo.experience} Clinical Experience
                            </span>
                        </div>

                        <div className='flex items-center gap-2 mt-2 text-sm text-slate-600 font-medium'>
                            <span className='text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100 font-bold'>
                                {docInfo.speciality}
                            </span>
                            <span>•</span>
                            <span className='text-slate-500'>{docInfo.degree}</span>
                        </div>

                        <div className='mt-6 pt-5 border-t border-slate-100'>
                            <div className='flex items-center gap-2 text-sm font-bold text-slate-800 mb-1.5'>
                                <svg className="w-4 h-4 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                                </svg>
                                <span>About Specialist</span>
                            </div>
                            <p className='text-sm text-slate-600 leading-relaxed max-w-3xl'>
                                {docInfo.about}
                            </p>
                        </div>
                    </div>

                    <div className='mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70 p-4 rounded-2xl'>
                        <div>
                            <span className='text-xs text-slate-500 font-semibold block'>Consultation Fee</span>
                            <span className='text-2xl font-extrabold text-slate-900'>
                                {currencySymbol}{docInfo.fees}
                            </span>
                            <span className='text-xs text-slate-400 font-normal ml-1.5'>/ 30 min session</span>
                        </div>
                        <div className='text-xs text-slate-500 flex items-center gap-2'>
                            <span className='w-2 h-2 rounded-full bg-blue-600'></span>
                            Instant Confirmation via SMS & Email
                        </div>
                    </div>
                </div>
            </div>

            {/* ----- Booking Slots Calendar Section ----- */}
            <div className='mt-10 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-medical'>
                <div className='flex items-center gap-2.5 mb-2'>
                    <div className='w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0'>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                    </div>
                    <h2 className='text-xl font-extrabold text-slate-900'>Select Consultation Slot</h2>
                </div>
                <p className='text-xs sm:text-sm text-slate-500 mb-6'>
                    Choose a date within the next 7 days, then select your preferred available timing.
                </p>

                {/* Day selector tabs */}
                <div className='flex gap-3 items-center w-full overflow-x-auto pb-3'>
                    {docSlots.length > 0 && docSlots.map((item, index) => {
                        const targetDate = new Date()
                        targetDate.setDate(targetDate.getDate() + index)
                        const isSelected = slotIndex === index
                        return (
                            <button
                                type="button"
                                onClick={() => { setSlotIndex(index); setSlotTime(''); }}
                                key={index}
                                className={`text-center py-4 px-4 min-w-[76px] rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center border ${
                                    isSelected
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 border-blue-600 scale-105'
                                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                                }`}
                            >
                                <span className={`text-[11px] font-bold tracking-wider ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                                    {daysOfWeek[targetDate.getDay()]}
                                </span>
                                <span className='text-xl font-extrabold mt-0.5'>
                                    {targetDate.getDate()}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* Time slot pills */}
                <div className='mt-6 pt-5 border-t border-slate-100'>
                    <p className='text-xs font-bold uppercase tracking-wider text-slate-400 mb-3'>
                        Available Timings
                    </p>
                    <div className='flex flex-wrap items-center gap-2.5'>
                        {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].length > 0 ? (
                            docSlots[slotIndex].map((item, index) => {
                                const isTimeSelected = item.time === slotTime
                                return (
                                    <button
                                        type="button"
                                        onClick={() => setSlotTime(item.time)}
                                        key={index}
                                        className={`text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-all border flex items-center gap-1.5 ${
                                            isTimeSelected
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105'
                                                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50/60'
                                        }`}
                                    >
                                        <svg className={`w-3.5 h-3.5 ${isTimeSelected ? 'text-white' : 'text-blue-600'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"/>
                                            <polyline points="12 6 12 12 16 14"/>
                                        </svg>
                                        <span>{item.time}</span>
                                    </button>
                                )
                            })
                        ) : (
                            <div className='p-4 bg-slate-50 rounded-xl text-sm text-slate-500 w-full italic'>
                                No slots remaining for this date. Please pick another day from the calendar above.
                            </div>
                        )}
                    </div>
                </div>

                {/* Action button */}
                <div className='mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4'>
                    <div className='text-sm text-slate-600'>
                        {slotTime ? (
                            <span className='font-medium'>
                                Selected Slot: <strong className='text-blue-700 font-bold'>{slotTime}</strong> on{' '}
                                <strong className='text-slate-900 font-bold'>Day {slotIndex + 1}</strong>
                            </span>
                        ) : (
                            <span className='text-slate-400'>Please select a time slot above to proceed.</span>
                        )}
                    </div>
                    <button
                        onClick={bookAppointment}
                        disabled={!slotTime}
                        className='w-full sm:w-auto btn-medical text-white font-bold text-sm sm:text-base px-10 py-3.5 rounded-full shadow-md hover:shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none'
                    >
                        Confirm Appointment
                    </button>
                </div>
            </div>

            {/* ----- Related Doctors in Same Speciality ----- */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    )
}

export default Appointment

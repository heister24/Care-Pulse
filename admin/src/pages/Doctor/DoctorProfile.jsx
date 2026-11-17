import { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: Number(profileData.fees),
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.error(error)
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken, getProfileData])

    return profileData && (
        <div className='p-4 sm:p-6 max-w-5xl mx-auto'>

            {/* Header section */}
            <div className='mb-6'>
                <div className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-1.5'>
                    <span className='w-2 h-2 rounded-full bg-blue-600'></span>
                    Practitioner Profile
                </div>
                <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>
                    Doctor <span className='text-blue-600'>Credentials</span>
                </h1>
                <p className='text-slate-500 text-xs sm:text-sm mt-0.5'>
                    Manage your medical biography, consultation rates, and clinic availability status.
                </p>
            </div>

            {/* Profile Card */}
            <div className='bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-medical'>
                
                <div className='flex flex-col md:flex-row gap-8 items-start pb-8 border-b border-slate-100'>
                    
                    {/* Doctor Photo */}
                    <div className='relative w-full md:w-56 shrink-0'>
                        <img 
                            className='w-full h-56 sm:h-64 object-cover object-top rounded-2xl bg-gradient-to-b from-blue-50 to-sky-50/50 border border-slate-200 shadow-sm' 
                            src={profileData.image} 
                            alt={profileData.name} 
                        />
                        <div className='absolute bottom-3 left-3 right-3'>
                            <span className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold backdrop-blur-md shadow-sm border ${
                                profileData.available 
                                    ? 'bg-blue-50/95 text-blue-800 border-blue-200' 
                                    : 'bg-slate-100/95 text-slate-600 border-slate-200'
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${profileData.available ? 'bg-blue-600 animate-pulse' : 'bg-slate-400'}`}></span>
                                {profileData.available ? 'Available for Appointments' : 'Off Duty'}
                            </span>
                        </div>
                    </div>

                    {/* Details */}
                    <div className='flex-1 flex flex-col justify-between'>
                        <div>
                            <div className='flex flex-wrap items-center gap-2 mb-2'>
                                <span className='inline-block text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full'>
                                    {profileData.speciality}
                                </span>
                                <span className='inline-block text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full'>
                                    {profileData.experience} Clinical Experience
                                </span>
                            </div>

                            <h2 className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>
                                {profileData.name}
                            </h2>
                            <p className='text-sm text-slate-500 font-medium mt-0.5'>
                                {profileData.degree}
                            </p>
                        </div>

                        {/* Fee and Availability */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100'>
                            <div className='bg-slate-50/70 p-4 rounded-2xl border border-slate-100'>
                                <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1'>Consultation Fee</p>
                                {isEdit ? (
                                    <div className='flex items-center gap-2'>
                                        <span className='text-slate-700 font-bold text-lg'>{currency}</span>
                                        <input 
                                            type='number' 
                                            min="0" 
                                            className='w-32 px-3 py-1.5 text-base font-bold bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30' 
                                            onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} 
                                            value={profileData.fees} 
                                        />
                                    </div>
                                ) : (
                                    <p className='text-xl font-bold text-slate-800'>{currency} {profileData.fees}</p>
                                )}
                            </div>

                            <div className='bg-slate-50/70 p-4 rounded-2xl border border-slate-100 flex flex-col justify-center'>
                                <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5'>Booking Status</p>
                                <label className={`inline-flex items-center gap-2.5 ${isEdit ? 'cursor-pointer' : 'cursor-default'}`}>
                                    <input 
                                        type="checkbox" 
                                        id="profile-available" 
                                        onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
                                        checked={Boolean(profileData.available)} 
                                        disabled={!isEdit} 
                                        className='w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer' 
                                    />
                                    <span className='text-xs font-semibold text-slate-700'>
                                        Accepting patient appointments
                                    </span>
                                </label>
                            </div>
                        </div>

                    </div>

                </div>

                {/* About Section */}
                <div className='pt-8 pb-6 border-b border-slate-100'>
                    <h3 className='text-sm font-bold text-slate-800 uppercase tracking-wider mb-2'>
                        Physician Biography
                    </h3>
                    {isEdit ? (
                        <textarea 
                            onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} 
                            className='w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all text-slate-800' 
                            rows={5} 
                            value={profileData.about || ''} 
                        />
                    ) : (
                        <p className='text-sm text-slate-600 leading-relaxed max-w-3xl'>
                            {profileData.about}
                        </p>
                    )}
                </div>

                {/* Practice Location */}
                <div className='pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6'>
                    <div>
                        <h3 className='text-sm font-bold text-slate-800 uppercase tracking-wider mb-1'>
                            Clinic / Hospital Address
                        </h3>
                        {isEdit ? (
                            <div className='flex flex-col gap-2 mt-2'>
                                <input 
                                    type='text' 
                                    className='w-72 px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl' 
                                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                    value={profileData.address?.line1 || ''} 
                                    placeholder='Address Line 1' 
                                />
                                <input 
                                    type='text' 
                                    className='w-72 px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl' 
                                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                    value={profileData.address?.line2 || ''} 
                                    placeholder='Address Line 2' 
                                />
                            </div>
                        ) : (
                            <p className='text-sm text-slate-600'>
                                {profileData.address?.line1 || 'Main Medical Center'} <br /> 
                                {profileData.address?.line2 || 'Hospital OPD Wing'}
                            </p>
                        )}
                    </div>

                    <div>
                        {isEdit ? (
                            <div className='flex items-center gap-3'>
                                <button 
                                    onClick={() => setIsEdit(false)} 
                                    className='px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all'
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={updateProfile} 
                                    className='btn-medical text-white px-7 py-2.5 text-xs sm:text-sm font-semibold rounded-xl shadow-medical hover:scale-[1.02] transition-transform'
                                >
                                    Save Changes
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => setIsEdit(true)} 
                                className='px-7 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-blue-600 text-blue-700 hover:bg-blue-50 transition-all'
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default DoctorProfile

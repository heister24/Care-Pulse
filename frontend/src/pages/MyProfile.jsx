import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            if (!userData.name || !userData.phone) {
                return toast.error("Full Name and Phone Number are required")
            }

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address || { line1: '', line2: '' }))
            formData.append('gender', userData.gender || 'Not Selected')
            formData.append('dob', userData.dob || 'Not Selected')

            if (image) formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    if (!userData) return null

    return (
        <div className='py-6 max-w-2xl m-auto'>
            <div className='bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-medical'>
                {/* Header Profile Title */}
                <div className='flex items-center justify-between pb-6 mb-6 border-b border-slate-100'>
                    <div>
                        <h1 className='text-2xl font-extrabold text-slate-900'>Patient Health Profile</h1>
                        <p className='text-xs text-slate-500 mt-1'>Manage your verified contact info and patient records.</p>
                    </div>
                    <span className='px-3.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold rounded-full'>
                        Verified Patient
                    </span>
                </div>

                {/* Avatar and Name */}
                <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
                    {isEdit ? (
                        <label htmlFor='image' className='cursor-pointer group'>
                            <div className='relative w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-blue-100 group-hover:ring-blue-300 transition-all'>
                                <img
                                    className='w-full h-full object-cover group-hover:opacity-75 transition-opacity'
                                    src={image ? URL.createObjectURL(image) : (userData.image || assets.profile_pic)}
                                    alt="Patient Avatar"
                                />
                                <div className='absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center text-white text-[11px] font-bold gap-1'>
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                                        <circle cx="12" cy="13" r="3"/>
                                    </svg>
                                    <span>Change Photo</span>
                                </div>
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
                        </label>
                    ) : (
                        <div className='w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-sky-100/80 shadow-sm flex-shrink-0'>
                            <img className='w-full h-full object-cover' src={userData.image || assets.profile_pic} alt="" />
                        </div>
                    )}

                    <div className='flex-1 w-full text-center sm:text-left'>
                        {isEdit ? (
                            <div className='mb-2'>
                                <label className='text-xs font-bold text-slate-400 block mb-1'>Patient Name</label>
                                <input
                                    className='bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-lg font-bold text-slate-900 w-full focus:outline-sky-600'
                                    type="text"
                                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                    value={userData.name}
                                />
                            </div>
                        ) : (
                            <h2 className='text-2xl font-extrabold text-slate-900'>{userData.name}</h2>
                        )}
                        <p className='text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md inline-block w-fit mt-1 border border-sky-100'>
                            ID: #{userData._id ? userData._id.slice(-6).toUpperCase() : 'CAREPULSE'}
                        </p>
                    </div>
                </div>

                {/* Contact Information */}
                <div className='mt-8 pt-6 border-t border-slate-100'>
                    <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400 mb-4'>
                        Contact Information
                    </h3>
                    <div className='grid grid-cols-[1fr_2.5fr] gap-y-3.5 text-xs sm:text-sm items-center'>
                        <span className='font-bold text-slate-500'>Email Address:</span>
                        <span className='font-semibold text-slate-800 truncate'>{userData.email}</span>

                        <span className='font-bold text-slate-500'>Phone Number:</span>
                        {isEdit ? (
                            <input
                                className='bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-medium text-slate-800 w-full focus:outline-sky-600'
                                type="text"
                                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                value={userData.phone || ''}
                            />
                        ) : (
                            <span className='font-semibold text-slate-800'>{userData.phone || 'Not Provided'}</span>
                        )}

                        <span className='font-bold text-slate-500 self-start pt-1.5'>Residential Address:</span>
                        {isEdit ? (
                            <div className='flex flex-col gap-1.5 w-full'>
                                <input
                                    className='bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-sky-600'
                                    type="text"
                                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...(prev.address || {}), line1: e.target.value } }))}
                                    value={userData.address?.line1 || ''}
                                    placeholder='Address Line 1'
                                />
                                <input
                                    className='bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-sky-600'
                                    type="text"
                                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...(prev.address || {}), line2: e.target.value } }))}
                                    value={userData.address?.line2 || ''}
                                    placeholder='Address Line 2 (City, State)'
                                />
                            </div>
                        ) : (
                            <span className='text-slate-700 leading-relaxed'>
                                {userData.address?.line1 || ''} {userData.address?.line2 ? `, ${userData.address?.line2}` : ''}
                            </span>
                        )}
                    </div>
                </div>

                {/* Basic Demographics */}
                <div className='mt-8 pt-6 border-t border-slate-100'>
                    <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400 mb-4'>
                        Demographics & Details
                    </h3>
                    <div className='grid grid-cols-[1fr_2.5fr] gap-y-3.5 text-xs sm:text-sm items-center'>
                        <span className='font-bold text-slate-500'>Gender:</span>
                        {isEdit ? (
                            <select
                                className='bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-medium text-slate-800 w-fit focus:outline-sky-600'
                                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                value={userData.gender || 'Not Selected'}
                            >
                                <option value="Not Selected">Not Selected</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        ) : (
                            <span className='font-semibold text-slate-800'>{userData.gender || 'Not Selected'}</span>
                        )}

                        <span className='font-bold text-slate-500'>Date of Birth:</span>
                        {isEdit ? (
                            <input
                                className='bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-medium text-slate-800 w-fit focus:outline-sky-600'
                                type='date'
                                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                value={userData.dob && userData.dob !== 'Not Selected' ? userData.dob : ''}
                            />
                        ) : (
                            <span className='font-semibold text-slate-800'>{userData.dob || 'Not Selected'}</span>
                        )}
                    </div>
                </div>

                {/* Edit / Save Action Button */}
                <div className='mt-8 pt-6 border-t border-slate-100 flex justify-end'>
                    {isEdit ? (
                        <div className='flex gap-3'>
                            <button
                                onClick={() => setIsEdit(false)}
                                className='px-6 py-2.5 rounded-full border border-slate-300 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateUserProfileData}
                                className='btn-medical text-white font-bold text-xs px-8 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all'
                            >
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEdit(true)}
                            className='inline-flex items-center gap-2 px-7 py-2.5 rounded-full border border-blue-600 text-blue-700 font-bold text-xs hover:bg-blue-50 transition-colors'
                        >
                            <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9"/>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                            </svg>
                            <span>Edit Profile</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyProfile

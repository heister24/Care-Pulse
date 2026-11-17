import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.error(error)
        }

    }

    return (
        <div className='p-4 sm:p-6 max-w-5xl mx-auto'>

            {/* Header section */}
            <div className='mb-6'>
                <div className='inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-1.5'>
                    <span className='w-2 h-2 rounded-full bg-sky-600'></span>
                    Physician Credentialing
                </div>
                <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>
                    Add <span className='text-sky-600'>New Doctor</span>
                </h1>
                <p className='text-slate-500 text-xs sm:text-sm mt-0.5'>
                    Register certified medical practitioners into the CarePulse Hospital network.
                </p>
            </div>

            {/* Main Form Card */}
            <form onSubmit={onSubmitHandler} className='bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-medical'>
                
                {/* Profile Photo Upload */}
                <div className='flex items-center gap-5 pb-8 mb-8 border-b border-slate-100'>
                    <label htmlFor="doc-img" className='relative cursor-pointer group'>
                        <img 
                            className='w-20 h-20 sm:w-24 sm:h-24 object-cover bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl group-hover:border-sky-500 transition-colors shadow-sm' 
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                            alt="Upload preview" 
                        />
                        <span className='absolute bottom-1 right-1 w-6 h-6 bg-sky-600 text-white rounded-lg flex items-center justify-center text-xs shadow-sm'>
                            +
                        </span>
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" accept="image/*" hidden />
                    <div>
                        <p className='text-sm font-bold text-slate-800'>Physician Profile Picture</p>
                        <p className='text-xs text-slate-400 mt-0.5'>JPG, PNG or WebP. Clinical headshots recommended.</p>
                        <label htmlFor="doc-img" className='mt-2 inline-block text-xs font-semibold text-sky-600 hover:text-sky-700 cursor-pointer'>
                            {docImg ? 'Change Photo' : 'Upload Photo'} &rarr;
                        </label>
                    </div>
                </div>

                {/* Form Fields Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                    {/* Left Column */}
                    <div className='flex flex-col gap-4'>

                        <div>
                            <label className='block text-xs font-semibold text-slate-700 mb-1.5'>
                                Full Name & Title
                            </label>
                            <input 
                                onChange={e => setName(e.target.value)} 
                                value={name} 
                                className='w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800' 
                                type="text" 
                                placeholder='e.g. Dr. Richard James' 
                                required 
                            />
                        </div>

                        <div>
                            <label className='block text-xs font-semibold text-slate-700 mb-1.5'>
                                Work Email Address
                            </label>
                            <input 
                                onChange={e => setEmail(e.target.value)} 
                                value={email} 
                                className='w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800' 
                                type="email" 
                                placeholder='richard@carepulse.com' 
                                required 
                            />
                        </div>

                        <div>
                            <label className='block text-xs font-semibold text-slate-700 mb-1.5'>
                                Login Password (min 8 chars)
                            </label>
                            <input 
                                onChange={e => setPassword(e.target.value)} 
                                value={password} 
                                className='w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800' 
                                type="password" 
                                placeholder='Set secure temporary password' 
                                minLength={8} 
                                required 
                            />
                        </div>

                        <div>
                            <label className='block text-xs font-semibold text-slate-700 mb-1.5'>
                                Clinical Experience
                            </label>
                            <select 
                                onChange={e => setExperience(e.target.value)} 
                                value={experience} 
                                className='w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800'
                            >
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Years</option>
                                <option value="3 Year">3 Years</option>
                                <option value="4 Year">4 Years</option>
                                <option value="5 Year">5 Years</option>
                                <option value="6 Year">6 Years</option>
                                <option value="7 Year">7 Years</option>
                                <option value="8 Year">8 Years</option>
                                <option value="9 Year">9 Years</option>
                                <option value="10 Year">10+ Years</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-xs font-semibold text-slate-700 mb-1.5'>
                                Consultation Fee (INR / USD)
                            </label>
                            <input 
                                onChange={e => setFees(e.target.value)} 
                                value={fees} 
                                className='w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800' 
                                type="number" 
                                min="0" 
                                placeholder='e.g. 50' 
                                required 
                            />
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className='flex flex-col gap-4'>

                        <div>
                            <label className='block text-xs font-semibold text-slate-700 mb-1.5'>
                                Clinical Speciality
                            </label>
                            <select 
                                onChange={e => setSpeciality(e.target.value)} 
                                value={speciality} 
                                className='w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800'
                            >
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-xs font-semibold text-slate-700 mb-1.5'>
                                Medical Qualifications / Degree
                            </label>
                            <input 
                                onChange={e => setDegree(e.target.value)} 
                                value={degree} 
                                className='w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800' 
                                type="text" 
                                placeholder='e.g. MBBS, MD - Internal Medicine' 
                                required 
                            />
                        </div>

                        <div>
                            <label className='block text-xs font-semibold text-slate-700 mb-1.5'>
                                Hospital / Clinic Address
                            </label>
                            <input 
                                onChange={e => setAddress1(e.target.value)} 
                                value={address1} 
                                className='w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800 mb-2' 
                                type="text" 
                                placeholder='Address Line 1 (Clinic / Floor)' 
                                required 
                            />
                            <input 
                                onChange={e => setAddress2(e.target.value)} 
                                value={address2} 
                                className='w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800' 
                                type="text" 
                                placeholder='Address Line 2 (Area, City)' 
                            />
                        </div>

                    </div>

                </div>

                {/* About Doctor Textarea */}
                <div className='mt-5'>
                    <label className='block text-xs font-semibold text-slate-700 mb-1.5'>
                        Physician Biography & Specializations
                    </label>
                    <textarea 
                        onChange={e => setAbout(e.target.value)} 
                        value={about} 
                        className='w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800' 
                        rows={4} 
                        placeholder='Provide a concise summary of clinical expertise, patient philosophy, and background...' 
                        required 
                    />
                </div>

                {/* Submit button */}
                <div className='mt-8 pt-6 border-t border-slate-100 flex items-center justify-end'>
                    <button 
                        type='submit' 
                        className='btn-medical text-white font-semibold px-8 py-3 rounded-xl shadow-medical hover:scale-[1.02] transition-transform text-sm'
                    >
                        Register Doctor &rarr;
                    </button>
                </div>

            </form>

        </div>
    )
}

export default AddDoctor

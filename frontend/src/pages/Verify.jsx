import axios from 'axios';
import { useContext, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {

    const [searchParams] = useSearchParams()

    const success = searchParams.get("success")
    const appointmentId = searchParams.get("appointmentId")
    const sessionId = searchParams.get("session_id")

    const { backendUrl, token } = useContext(AppContext)

    const navigate = useNavigate()

    // Function to verify stripe payment
    const verifyStripe = useCallback(async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/user/verifyStripe",
                { success, appointmentId, session_id: sessionId },
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

            navigate("/my-appointments")

        } catch (error) {
            toast.error(error.message)
            console.error(error)
            navigate("/my-appointments")
        }
    }, [backendUrl, token, success, appointmentId, sessionId, navigate])

    useEffect(() => {
        if (token && appointmentId && success !== null) {
            verifyStripe()
        }
    }, [token, appointmentId, success, verifyStripe])

    return (
        <div className='min-h-[60vh] flex flex-col items-center justify-center gap-4'>
            <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            <p className='text-gray-500 text-sm'>Verifying payment status, please wait...</p>
        </div>
    )
}

export default Verify

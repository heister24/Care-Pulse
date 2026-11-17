import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)

    // Getting Doctors using API
    const getDoctorsData = useCallback(async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }, [backendUrl])

    // Getting User Profile using API
    const loadUserProfileData = useCallback(async () => {
        if (!token) {
            setUserData(false)
            return
        }
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
            if (data.success && data.userData) {
                setUserData(data.userData)
            } else {
                // If token is invalid or user not found, clear stale token
                localStorage.removeItem('token')
                setToken('')
                setUserData(false)
            }
        } catch (error) {
            console.error("Error loading user profile:", error)
            // Clear invalid or expired token
            localStorage.removeItem('token')
            setToken('')
            setUserData(false)
        }
    }, [backendUrl, token])

    useEffect(() => {
        getDoctorsData()
    }, [getDoctorsData])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token, loadUserProfileData])

    const value = {
        doctors,
        getDoctosData: getDoctorsData,
        getDoctorsData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData,
        loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider

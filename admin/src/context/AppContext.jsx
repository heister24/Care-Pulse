import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY || '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Function to format the date eg. ( 20_11_2026 => 20 Nov 2026 )
    const slotDateFormat = (slotDate) => {
        if (!slotDate) return ''
        const dateArray = slotDate.split('_')
        if (dateArray.length < 3) return slotDate
        const monthIndex = Number(dateArray[1]) - 1
        const monthName = months[monthIndex] || dateArray[1]
        return `${dateArray[0]} ${monthName} ${dateArray[2]}`
    }

    // Function to calculate the age eg. ( 2000-01-20 => 24 )
    const calculateAge = (dob) => {
        if (!dob || dob === 'Not Selected') return 'N/A'
        const birthDate = new Date(dob)
        if (isNaN(birthDate.getTime())) return 'N/A'
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age >= 0 ? age : 'N/A'
    }

    const value = {
        backendUrl,
        currency,
        slotDateFormat,
        calculateAge,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider

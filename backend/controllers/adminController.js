import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import fs from "fs";

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.error("Admin login error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all appointments
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })
    } catch (error) {
        console.error("Appointments fetch error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API for admin to cancel appointment and release slot
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' })
        }

        if (appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment is already cancelled' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // Release the booked slot in doctor model
        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)

        if (doctorData && doctorData.slots_booked && doctorData.slots_booked[slotDate]) {
            let slots_booked = doctorData.slots_booked
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
            await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        }

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.error("Admin appointment cancel error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API for adding a doctor
const addDoctor = async (req, res) => {
    const imageFile = req.file

    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!imageFile) {
            return res.json({ success: false, message: "Doctor image is required" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password (minimum 8 characters)" })
        }

        const existingDoctor = await doctorModel.findOne({ email })
        if (existingDoctor) {
            return res.json({ success: false, message: "A doctor with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        let parsedAddress
        try {
            parsedAddress = typeof address === 'string' ? JSON.parse(address) : address
        } catch {
            parsedAddress = { line1: address, line2: '' }
        }

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees: Number(fees),
            address: parsedAddress,
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: 'Doctor Added' })

    } catch (error) {
        console.error("Add doctor error:", error)
        res.json({ success: false, message: error.message })
    } finally {
        if (imageFile && fs.existsSync(imageFile.path)) {
            try {
                fs.unlinkSync(imageFile.path)
            } catch (err) {
                console.error("Failed to delete temp file:", err)
            }
        }
    }
}

// API to get all doctors
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
    } catch (error) {
        console.error("All doctors fetch error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API for admin dashboard data
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        let revenue = 0
        let paidAppointments = 0
        appointments.forEach((item) => {
            if (item.payment) {
                revenue += (item.amount || 0)
                paidAppointments += 1
            }
        })

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            revenue,
            paidAppointments,
            latestAppointments: appointments.slice(-10).reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.error("Admin dashboard error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API for admin to update payment status (e.g. for reception cash collection)
const appointmentPaymentStatus = async (req, res) => {
    try {
        const { appointmentId, payment } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' })
        }

        const newPaymentStatus = payment !== undefined ? payment : !appointmentData.payment
        await appointmentModel.findByIdAndUpdate(appointmentId, { payment: newPaymentStatus })

        res.json({ 
            success: true, 
            message: `Payment status updated to ${newPaymentStatus ? 'Paid' : 'Unpaid'}` 
        })
    } catch (error) {
        console.error("Payment status update error:", error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginAdmin,
    appointmentsAdmin,
    appointmentCancel,
    addDoctor,
    allDoctors,
    adminDashboard,
    appointmentPaymentStatus
}

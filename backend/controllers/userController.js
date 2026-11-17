import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary'
import stripe from "stripe";
import razorpay from 'razorpay';
import fs from "fs";
import crypto from "crypto";

const stripeInstance = process.env.STRIPE_SECRET_KEY ? new stripe(process.env.STRIPE_SECRET_KEY) : null;

const getRazorpayInstance = () => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (keyId && keySecret && !keyId.includes('---') && !keySecret.includes('---')) {
        return new razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });
    }
    return null;
};

// API to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password (minimum 8 characters)" })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: "User already exists with this email" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token, message: "Account created successfully" })

    } catch (error) {
        console.error("User registration error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token, message: "Login successful" })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.error("User login error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId
        const userData = await userModel.findById(userId).select('-password')

        if (!userData) {
            return res.json({ success: false, message: 'User not found' })
        }

        res.json({ success: true, userData })

    } catch (error) {
        console.error("Get profile error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {
    const imageFile = req.file

    try {
        const userId = req.userId || req.body.userId
        const { name, phone, address, dob, gender } = req.body

        if (!name || !phone) {
            return res.json({ success: false, message: "Name and phone are required" })
        }

        let parsedAddress
        try {
            parsedAddress = typeof address === 'string' ? JSON.parse(address) : address
        } catch {
            parsedAddress = { line1: address || '', line2: '' }
        }

        const updateData = {
            name,
            phone,
            address: parsedAddress,
            dob: dob || 'Not Selected',
            gender: gender || 'Not Selected'
        }

        await userModel.findByIdAndUpdate(userId, updateData)

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.error("Update profile error:", error)
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

// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId
        const { docId, slotDate, slotTime } = req.body

        if (!docId || !slotDate || !slotTime) {
            return res.json({ success: false, message: 'Missing appointment details' })
        }

        const docData = await doctorModel.findById(docId).select("-password")
        if (!docData) {
            return res.json({ success: false, message: 'Doctor not found' })
        }

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor is currently not available' })
        }

        let slots_booked = docData.slots_booked || {}

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot already booked. Please choose another slot.' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = [slotTime]
        }

        const userData = await userModel.findById(userId).select("-password")
        if (!userData) {
            return res.json({ success: false, message: 'User not found' })
        }

        const docDataObj = docData.toObject ? docData.toObject() : { ...docData }
        delete docDataObj.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData: userData.toObject ? userData.toObject() : userData,
            docData: docDataObj,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.error("Book appointment error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' })
        }

        if (appointmentData.userId.toString() !== userId.toString()) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        if (appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment is already cancelled' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // Release the slot
        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)

        if (doctorData && doctorData.slots_booked && doctorData.slots_booked[slotDate]) {
            let slots_booked = doctorData.slots_booked
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
            await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        }

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.error("Cancel appointment error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user appointments
const listAppointment = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.error("List appointments error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment of appointment using Razorpay
const paymentRazorpay = async (req, res) => {
    try {
        const razorpayInstance = getRazorpayInstance();
        if (!razorpayInstance) {
            return res.json({ success: false, message: 'Razorpay is not configured on server' })
        }

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled or not found' })
        }

        const options = {
            amount: Math.round(appointmentData.amount * 100),
            currency: process.env.CURRENCY || 'INR',
            receipt: appointmentId.toString(),
        }

        const order = await razorpayInstance.orders.create(options)
        res.json({ 
            success: true, 
            order, 
            key: process.env.RAZORPAY_KEY_ID 
        })

    } catch (error) {
        console.error("Razorpay payment error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify payment of Razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body
        const razorpayInstance = getRazorpayInstance();

        if (razorpay_signature && razorpay_order_id && razorpay_payment_id) {
            const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`)
            const generated_signature = hmac.digest('hex')

            if (generated_signature === razorpay_signature) {
                let targetId = appointmentId;
                if (!targetId && razorpayInstance) {
                    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
                    targetId = orderInfo.receipt;
                }
                if (targetId) {
                    await appointmentModel.findByIdAndUpdate(targetId, { payment: true })
                    return res.json({ success: true, message: "Payment Successful" })
                }
            }
        }

        if (razorpay_order_id && razorpayInstance) {
            const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
            if (orderInfo.status === 'paid') {
                const targetId = appointmentId || orderInfo.receipt;
                await appointmentModel.findByIdAndUpdate(targetId, { payment: true })
                return res.json({ success: true, message: "Payment Successful" })
            }
        }

        res.json({ success: false, message: 'Payment Verification Failed' })

    } catch (error) {
        console.error("Razorpay verification error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment using Stripe
const paymentStripe = async (req, res) => {
    try {
        if (!stripeInstance) {
            return res.json({ success: false, message: 'Stripe is not configured' })
        }

        const { appointmentId } = req.body
        const { origin } = req.headers

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled or not found' })
        }

        const currency = (process.env.CURRENCY || 'inr').toLowerCase()

        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: `Appointment Fees - ${appointmentData.docData?.name || 'Doctor'}`
                },
                unit_amount: Math.round(appointmentData.amount * 100)
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&appointmentId=${appointmentData._id}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/verify?success=false&appointmentId=${appointmentData._id}`,
            line_items: line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Stripe payment error:", error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify Stripe payment
const verifyStripe = async (req, res) => {
    try {
        const { appointmentId, success, session_id } = req.body

        if (session_id && stripeInstance) {
            const session = await stripeInstance.checkout.sessions.retrieve(session_id)
            if (session.payment_status === 'paid') {
                await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
                return res.json({ success: true, message: 'Payment Successful' })
            }
        } else if (success === "true" || success === true) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
            return res.json({ success: true, message: 'Payment Successful' })
        }

        res.json({ success: false, message: 'Payment Failed' })

    } catch (error) {
        console.error("Stripe verification error:", error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    paymentRazorpay,
    verifyRazorpay,
    paymentStripe,
    verifyStripe
}

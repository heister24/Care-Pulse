import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await doctorModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Doctor login error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor appointments
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId || req.body.docId;
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Doctor appointments fetch error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API for doctor to cancel appointment and release slot
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.docId || req.body.docId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (
      !appointmentData ||
      appointmentData.docId.toString() !== docId.toString()
    ) {
      return res.json({
        success: false,
        message: "Unauthorized or appointment not found",
      });
    }

    if (appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment is already cancelled",
      });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Release the doctor's slot
    const { slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (
      doctorData &&
      doctorData.slots_booked &&
      doctorData.slots_booked[slotDate]
    ) {
      let slots_booked = doctorData.slots_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime,
      );
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    return res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.error("Doctor appointment cancel error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API for doctor to complete appointment
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docId || req.body.docId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (
      appointmentData &&
      appointmentData.docId.toString() === docId.toString()
    ) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    }

    res.json({
      success: false,
      message: "Unauthorized or appointment not found",
    });
  } catch (error) {
    console.error("Doctor appointment complete error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get public list of doctors
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.error("Doctor list fetch error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to toggle doctor availability
const changeAvailablity = async (req, res) => {
  try {
    const docId = req.body.docId || req.docId;
    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.error("Change availability error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor profile data
const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId || req.body.docId;
    const profileData = await doctorModel.findById(docId).select("-password");
    if (!profileData) {
      return res.json({ success: false, message: "Doctor profile not found" });
    }

    res.json({ success: true, profileData });
  } catch (error) {
    console.error("Doctor profile fetch error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId || req.body.docId;
    const { fees, address, about, available } = req.body;

    const updateFields = {};
    if (fees !== undefined) updateFields.fees = fees;
    if (address !== undefined) updateFields.address = address;
    if (about !== undefined) updateFields.about = about;
    if (available !== undefined) updateFields.available = available;

    await doctorModel.findByIdAndUpdate(docId, updateFields);

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error("Doctor profile update error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API for doctor dashboard
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId || req.body.docId;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    const patientsSet = new Set();

    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
      if (item.userId) {
        patientsSet.add(item.userId.toString());
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patientsSet.size,
      latestAppointments: appointments.slice(-10).reverse(),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error("Doctor dashboard error:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  doctorList,
  changeAvailablity,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};

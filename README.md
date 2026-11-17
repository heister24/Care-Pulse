# Prescripto - Doctor Appointment Booking System

Prescripto is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed for booking and managing doctor appointments with multi-role support for Patients, Doctors, and Administrators.

---

## 🚀 Architecture Overview

The repository is structured into three distinct packages:

- **`backend/`**: Node.js & Express REST API with MongoDB (Mongoose), JWT authentication, Cloudinary media upload, and Stripe/Razorpay payment gateways.
- **`frontend/`**: Vite + React patient portal for browsing doctors, booking appointment time-slots, online payments, and managing profiles.
- **`admin/`**: Vite + React administrative dashboard for clinic admins and doctors to manage appointments, doctor rosters, earnings, and availability.

---

## 📁 Project Structure

```
Prescripto/
├── backend/
│   ├── config/             # MongoDB & Cloudinary configurations
│   ├── controllers/        # Admin, Doctor, and User controllers
│   ├── middleware/         # Auth (admin, doctor, user) & Multer file uploads
│   ├── models/             # Mongoose schemas (Doctor, User, Appointment)
│   ├── routes/             # Express API routes
│   └── server.js           # Express app entrypoint
├── frontend/
│   ├── public/             # Static icons & vectors
│   └── src/
│       ├── assets/         # App assets & doctor images
│       ├── components/     # Navbar, Header, TopDoctors, Footer, etc.
│       ├── context/        # AppContext (global state, auth, API calls)
│       └── pages/          # Home, Doctors, Appointment, MyAppointments, MyProfile, Login, Verify
├── admin/
│   ├── public/             # Static icons
│   └── src/
│       ├── assets/         # Admin & doctor panel icons
│       ├── components/     # Navbar & Sidebar
│       ├── context/        # AdminContext, DoctorContext, AppContext
│       └── pages/          # Admin Dashboard, DoctorsList, AddDoctor, DoctorDashboard, etc.
└── .gitignore              # Repository gitignore rules
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB Database (Atlas or Local)
- Cloudinary Account
- Razorpay / Stripe Account (optional, for payments)

### 2. Environment Setup

Copy `.env.example` in each folder to create your `.env` files:

#### Backend (`backend/.env`):
```env
PORT=5000
CURRENCY=INR
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Prescripto
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

#### Frontend (`frontend/.env`):
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

#### Admin (`admin/.env`):
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_CURRENCY=₹
```

---

## 💻 Running the Application

### 1. Backend Server
```bash
cd backend
npm install
npm run dev
```

### 2. Frontend User Application
```bash
cd frontend
npm install
npm run dev
```

### 3. Admin & Doctor Portal
```bash
cd admin
npm install
npm run dev
```

---

## 🔑 Key Features & Role Matrix

| Feature | Patient (Frontend) | Doctor (Admin Panel) | Administrator (Admin Panel) |
|---|:---:|:---:|:---:|
| Browse Doctors & Filter by Speciality | ✅ | — | — |
| Book 7-Day Available Slots | ✅ | — | — |
| Pay Online (Razorpay & Stripe) | ✅ | — | — |
| Cancel Appointment & Release Slot | ✅ | ✅ | ✅ |
| Update Personal Profile & Avatar | ✅ | ✅ | — |
| View Earnings & Patient Stats | — | ✅ | — |
| Mark Appointments Completed | — | ✅ | — |
| Toggle Availability | — | ✅ | ✅ |
| Add Doctors with Degree/Experience | — | — | ✅ |
| Global Metrics (Doctors/Patients) | — | — | ✅ |

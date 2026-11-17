import { useContext } from "react";
import { DoctorContext } from "./context/DoctorContext";
import { AdminContext } from "./context/AdminContext";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import Login from "./pages/Login";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  return dToken || aToken ? (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="flex-1 p-2 sm:p-4">
          <Routes>
            <Route
              path="/"
              element={
                aToken ? (
                  <Navigate to="/admin-dashboard" replace />
                ) : (
                  <Navigate to="/doctor-dashboard" replace />
                )
              }
            />
            <Route
              path="/admin-dashboard"
              element={aToken ? <Dashboard /> : <Navigate to="/" replace />}
            />
            <Route
              path="/all-appointments"
              element={
                aToken ? <AllAppointments /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/add-doctor"
              element={aToken ? <AddDoctor /> : <Navigate to="/" replace />}
            />
            <Route
              path="/doctor-list"
              element={aToken ? <DoctorsList /> : <Navigate to="/" replace />}
            />
            <Route
              path="/doctor-dashboard"
              element={
                dToken ? <DoctorDashboard /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/doctor-appointments"
              element={
                dToken ? <DoctorAppointments /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/doctor-profile"
              element={dToken ? <DoctorProfile /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
};

export default App;

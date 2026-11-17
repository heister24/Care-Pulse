import { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import HospitalLogo from "./HospitalLogo";

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext);
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();
  const patientUrl =
    import.meta.env.VITE_PATIENT_URL || "http://localhost:5173";

  const logout = () => {
    navigate("/");
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_2px_16px_-4px_rgba(37,99,235,0.06)]">
      <div className="flex justify-between items-center px-4 sm:px-8 h-[72px]">
        {/* Left: Brand Identity & Clinical Role Badge */}
        <div className="flex gap-3 items-center sm:gap-4">
          <div onClick={() => navigate("/")} className="shrink-0">
            <HospitalLogo
              size="md"
              subtitle={aToken ? "ADMINISTRATION" : "DOCTOR PORTAL"}
            />
          </div>

          <div className="hidden w-px h-5 bg-slate-200 sm:block"></div>

          <div className="hidden gap-2 items-center sm:flex">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                aToken
                  ? "bg-blue-50 text-blue-800 border-blue-200"
                  : "bg-indigo-50 text-indigo-800 border-indigo-200"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span>
                {aToken ? "Hospital Administrator" : "Clinical Practitioner"}
              </span>
            </span>

            <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-full">
              <span>CarePulse Live &bull; Operational</span>
            </span>
          </div>
        </div>

        {/* Right: Quick Links & Authentication */}
        <div className="flex gap-3 items-center sm:gap-4">
          {/* Quick link to live public patient site */}
          <a
            href={patientUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 px-3.5 py-2 rounded-full border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all shadow-xs"
            title="Preview Patient Booking Website"
          >
            <svg
              className="w-3.5 h-3.5 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>Patient Site</span>
          </a>

          {/* User Sign Out */}
          <button
            onClick={logout}
            className="inline-flex gap-2 items-center px-4 py-2 text-xs font-bold rounded-full border transition-all text-slate-700 hover:text-rose-600 border-slate-200 hover:border-rose-200 hover:bg-rose-50 shadow-xs"
          >
            <svg
              className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

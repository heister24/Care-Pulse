import { Link } from "react-router-dom";
import HospitalLogo from "./HospitalLogo";

const Footer = () => {
  return (
    <footer className="pt-12 pb-8">
      <div className="flex flex-col sm:grid grid-cols-[2.5fr_1fr_1fr_1.2fr] gap-10 text-sm">
        <div>
          <div className="mb-4">
            <HospitalLogo size="md" />
          </div>
          <p className="w-full text-slate-500 leading-relaxed text-sm">
            CarePulse is a premier hospital appointment management and digital
            healthcare platform. Dedicated to providing compassionate, timely,
            and evidence-based clinical care for individuals and families.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200/80 px-3 py-1.5 rounded-xl w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Hospital Care &bull; Dedicated Support
          </div>
        </div>

        <div>
          <p className="text-sm font-bold tracking-wider text-slate-900 mb-4 uppercase">
            Quick Links
          </p>
          <ul className="flex flex-col gap-2.5 text-slate-600 font-medium">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/doctors"
                className="hover:text-blue-600 transition-colors"
              >
                Find a Doctor
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 transition-colors"
              >
                About Hospital
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-600 transition-colors"
              >
                Contact & Emergency
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold tracking-wider text-slate-900 mb-4 uppercase">
            Departments
          </p>
          <ul className="flex flex-col gap-2.5 text-slate-600 font-medium">
            <li>
              <Link
                to="/doctors/General physician"
                className="hover:text-blue-600 transition-colors"
              >
                General Medicine
              </Link>
            </li>
            <li>
              <Link
                to="/doctors/Gynecologist"
                className="hover:text-blue-600 transition-colors"
              >
                Gynecology
              </Link>
            </li>
            <li>
              <Link
                to="/doctors/Pediatricians"
                className="hover:text-blue-600 transition-colors"
              >
                Pediatrics
              </Link>
            </li>
            <li>
              <Link
                to="/doctors/Neurologist"
                className="hover:text-blue-600 transition-colors"
              >
                Neurology
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold tracking-wider text-slate-900 mb-4 uppercase">
            Emergency & Support
          </p>
          <ul className="flex flex-col gap-2.5 text-slate-600">
            <li className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <span className="font-semibold text-slate-800">
                +1-212-456-7890
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className="font-semibold text-slate-800">
                care@carepulse.com
              </span>
            </li>
            <li className="text-xs text-slate-500 mt-2 pl-8">
              Shivajinagar Healthcare Center, Pune, India
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <p>
          © {new Date().getFullYear()} CarePulse Healthcare Network. All Rights
          Reserved.
        </p>
        <div className="flex gap-5">
          <span className="hover:text-sky-700 cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-sky-700 cursor-pointer">
            Terms of Service
          </span>
          <span className="hover:text-sky-700 cursor-pointer">
            Patient Rights
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

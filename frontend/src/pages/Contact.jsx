import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="pb-16">
      {/* Header section with hospital badge */}
      <div className="text-center pt-8 sm:pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          24/7 Patient Support & Helpline
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight">
          Contact <span className="text-blue-600">CarePulse Hospital</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto mt-2">
          Have questions or need assistance with your booking? Our dedicated
          medical helpdesk is available around the clock.
        </p>
      </div>

      {/* Main Contact Card */}
      <div className="my-8 sm:my-12 flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-14 bg-white p-6 sm:p-12 rounded-3xl border border-slate-100 shadow-medical max-w-5xl mx-auto">
        {/* Contact Image with Emergency Badge */}
        <div className="relative w-full md:w-5/12 max-w-[380px]">
          <img
            className="w-full rounded-2xl object-cover shadow-md border-4 border-slate-50"
            src={assets.contact_image}
            alt="CarePulse Hospital Reception"
          />
          <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-xs flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
              !
            </span>
            <div>
              <p className="font-bold text-rose-900">Medical Emergency?</p>
              <p className="text-rose-700/90">
                Dial 911 or call our priority ER desk immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Details & Cards */}
        <div className="flex flex-col justify-center items-start gap-6 md:w-7/12 text-sm text-slate-600 w-full">
          {/* Main Hospital Location */}
          <div className="w-full p-5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <h2 className="font-bold text-base text-slate-800">
                Main Hospital Campus
              </h2>
            </div>
            <p className="text-slate-600 pl-10">
              CarePulse Medical Tower, North Avenue, Shivajinagar, Pune,
              Maharashtra 411005, India
            </p>
          </div>

          {/* Direct Lines & Communications */}
          <div className="w-full p-5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                <svg
                  className="w-4 h-4"
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
              <h2 className="font-bold text-base text-slate-800">
                Helpline & Patient Services
              </h2>
            </div>
            <div className="text-slate-600 pl-10 space-y-1">
              <p>
                <span className="text-slate-400 font-medium">
                  General Inquiries:
                </span>{" "}
                <a
                  href="tel:+12124567890"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  +1 (212) 456-7890
                </a>
              </p>
              <p>
                <span className="text-slate-400 font-medium">Direct Desk:</span>{" "}
                <a
                  href="tel:4155550132"
                  className="text-slate-700 font-medium hover:underline"
                >
                  (415) 555-0132
                </a>
              </p>
              <p>
                <span className="text-slate-400 font-medium">Email Desk:</span>{" "}
                <a
                  href="mailto:contact@carepulse.com"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  contact@carepulse.com
                </a>
              </p>
            </div>
          </div>

          {/* Careers at CarePulse */}
          <div className="w-full p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <h2 className="font-bold text-base text-slate-800">
                Careers & Medical Fellowship
              </h2>
            </div>
            <p className="text-slate-600 pl-10 mb-3 text-xs sm:text-sm">
              Join our network of healthcare specialists, nurses, and medical
              operations professionals.
            </p>
            <div className="pl-10">
              <a
                href="#careers"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Please send your resume to careers@carepulse.com");
                }}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all"
              >
                Explore Medical Openings &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

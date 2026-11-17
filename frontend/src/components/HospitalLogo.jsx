import PropTypes from 'prop-types'

const HospitalLogo = ({ size = 'md', subtitle }) => {
  const isSm = size === 'sm'
  const isLg = size === 'lg'

  // Proportional sizing for the CarePulse emblem
  const emblemDim = isSm ? 'w-8 h-8' : isLg ? 'w-11 h-11' : 'w-9 h-9'

  return (
    <div className='flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group'>
      {/* Bespoke CarePulse Emblem: Vibrant Swiss Clinical Cross with Electric Blue & Azure Harmony */}
      <div className={`${emblemDim} shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm`}>
        <svg 
          viewBox="0 0 44 44" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Brilliant Royal Blue for the Vertical Pillar */}
            <linearGradient id="crossPillarV" x1="22" y1="4" x2="22" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            {/* Radiant Azure & Sky Blue for the Horizontal Arm */}
            <linearGradient id="crossPillarH" x1="4" y1="22" x2="40" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            {/* Glowing Shadow */}
            <filter id="nordicCrossGlow" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#2563eb" floodOpacity="0.25" />
            </filter>
          </defs>

          <g filter="url(#nordicCrossGlow)">
            {/* 1. Vertical Clinical Foundation Pill */}
            <rect 
              x="17" 
              y="4" 
              width="10" 
              height="36" 
              rx="5" 
              fill="url(#crossPillarV)" 
              stroke="#60a5fa"
              strokeWidth="1.2"
            />

            {/* 2. Horizontal Vital Pulse Care Arm */}
            <rect 
              x="4" 
              y="17" 
              width="36" 
              height="10" 
              rx="5" 
              fill="url(#crossPillarH)" 
              stroke="#93c5fd"
              strokeWidth="1.2"
            />

            {/* 3. Central Clinical Intersection Node */}
            <circle cx="22" cy="22" r="3" fill="#ffffff" />

            {/* 4. Precision Health Node Beacon */}
            <circle cx="36" cy="9" r="2.8" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
          </g>
        </svg>
      </div>

      {/* CarePulse Typography */}
      <div className='flex flex-col leading-none'>
        <div className='flex items-center'>
          <span 
            className={`${
              isSm ? 'text-lg font-black' : isLg ? 'text-2xl font-black' : 'text-xl font-black'
            } tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors`}
          >
            Care
          </span>
          <span 
            className={`${
              isSm ? 'text-lg font-black' : isLg ? 'text-2xl font-black' : 'text-xl font-black'
            } tracking-tight text-blue-600`}
          >
            Pulse
          </span>
          <span className={`${isSm ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-blue-500 ml-1 mb-1 animate-pulse`}></span>
        </div>
        <span className='text-[9px] font-extrabold tracking-[0.24em] text-blue-600 uppercase mt-0.5'>
          {subtitle || 'HEALTHCARE NETWORK'}
        </span>
      </div>
    </div>
  )
}

HospitalLogo.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  subtitle: PropTypes.string
}

export default HospitalLogo

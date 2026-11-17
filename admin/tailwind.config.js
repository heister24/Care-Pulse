/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(220px, 1fr))'
      },
      colors: {
        'primary': '#2563eb',       // Modern Royal Blue
        'primary-dark': '#1d4ed8',  // Deep Medical Blue
        'primary-light': '#eff6ff', // Soft Ice Blue Background
        'secondary': '#0284c7',     // Cerulean Blue
        'secondary-dark': '#0369a1',// Dark Cerulean Blue
        'secondary-light': '#f0f9ff',// Ice Cerulean Background
        'accent': '#3b82f6',       // Electric Medical Blue
        'medical-slate': '#0f172a', // Deep Slate
      },
      boxShadow: {
        'medical': '0 4px 20px -2px rgba(37, 99, 235, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'medical-lg': '0 10px 25px -4px rgba(37, 99, 235, 0.15), 0 4px 10px -2px rgba(15, 23, 42, 0.05)',
      }
    },
  },
  plugins: [],
}

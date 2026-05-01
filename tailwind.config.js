/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mist: '#d6eef9',
        night: '#0f172f',
        ember: '#f97316',
        sea: '#0284c7',
      },
      boxShadow: {
        glow: '0 20px 60px -20px rgba(15, 23, 47, 0.45)',
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        pulseSlow: 'pulseSlow 6s ease-in-out infinite',
        riseIn: 'riseIn 0.7s ease-out both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.65' },
          '50%': { opacity: '1' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

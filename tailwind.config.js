/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-start': '#0F0F0F',
        'gradient-mid': '#1A1410',
        'gradient-end': '#2D2220',
        'warm-orange': '#FF7F50',
        'burnt-yellow': '#FFB84D',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
            opacity: '1'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)',
            opacity: '0.8'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-orange': '0 0 30px rgba(255, 127, 80, 0.5)',
        'glow-amber': '0 0 30px rgba(255, 184, 77, 0.5)',
        'glow-gold': '0 0 30px rgba(255, 200, 100, 0.5)',
      },
    },
  },
  plugins: [],
}

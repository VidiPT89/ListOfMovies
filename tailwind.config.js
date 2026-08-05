/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-start': '#0f0f0f',
        'gradient-mid': '#1a1a2e',
        'gradient-end': '#16213e',
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
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.5)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.5)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.5)',
      },
    },
  },
  plugins: [],
}

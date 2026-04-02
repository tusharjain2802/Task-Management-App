/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        curse: ["Curse of the Zombie", "sans-serif"],
        comfy: ["Comfy Feeling", "sans-serif"],
        friday: ["Friday13SH", "sans-serif"],
        ffriday: ["Friday13 Bonus NFI", "sans-serif"],

      },
      colors: {
        color1: '#000000', // Dark gray
        color2: '#f5f5f5', // white
        color3: '#ff2222', // red
      },
      backgroundImage: {
        'gamemania-gradient': 'linear-gradient(to top right, #ff2222, #A15591, #f5f5f5)',
      },
      keyframes: {
        translateY: {
          '0%': { transform: 'translateY(-90px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        oscillate: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }, 
        },
      },
      animation: {
        'translate-y': 'translateY 1s ease-in-out',
        'oscillate': 'oscillate 1s ease-in-out infinite',
      },
    },

  },
  plugins: [],
}


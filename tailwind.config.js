
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: '#29dde0 ', 
        secondary: '#4A90E2', 
        accent: '#FFD700',
        third:'#FFABBA' 
      },
    },
  },
  variants: {},
  plugins: [],
}

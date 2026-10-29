/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // YEH LINE ADD KAREIN
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F26F21", 
          gold: "#D4AF37",   
          cream: "#FDFBF7",  
          dark: "#1A1A1A",
          "dark-card": "#242424", // Dark mode cards ke liye
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
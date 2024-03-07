/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'red': '#FF0000',
      'secondary': '#4169E1',
      'white':"#FFFFFF",
      'yellow':"#FFFF33",
      'blue':"#0000CC"
      
    }
  },
  plugins: [require("daisyui")],

}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primaryUser': '#DC9832',
      'primaryBusiness': '#4B99FA',
      'white':"#FFFFFF",
      'yellow':"#FFFF33",
      'blue':"#0000CC"
      
    }
  },
  plugins: [require("daisyui")],

}
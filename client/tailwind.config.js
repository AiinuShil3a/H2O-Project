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
      'secondUser': '#E1BF0E',
      'secondBusiness': '#72B1FF',
      'Smoke': '#848884  ',
      'white':"#FFFFFF",
    }
  },
  plugins: [require("daisyui")],

}
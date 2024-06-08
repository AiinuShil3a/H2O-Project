/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
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
      'dark':"#000",
    }
  },
  plugins: [daisyui],

}
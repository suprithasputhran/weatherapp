const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
       
       
      },
    },
   
    fontFamily:{
    Roboto:['Roboto','sans-serif']
    },
    
    screens: {
      'sm': {'min':'375px', 'max':'424px'},
     'md': {'min':'425px','max':'766px'},
      'lg': {'min':'767px','max':'1279px'},
      'xl': {'min':'1280px','max':'1535px'},
    },
  },
  plugins: [],
}


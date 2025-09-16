import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        secondary: {
         DEFAULT:colors.amber[200],
         hover:colors.amber[400],
         border:colors.amber[500],
         text:colors.amber[600],
         dark:colors.amber[800],
         customDark:colors.amber[950],
        },

      },
    },
  },
  plugins: [],
}

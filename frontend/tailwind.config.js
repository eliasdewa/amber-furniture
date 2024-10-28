/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#ed3849',
        secondary: '#0D0842',
        blackBg: '#F3F3F3',
        favorite: '#FF5841',
      },
      fontFamily: {
        'primary': ["Montserrat", "sans-serif"],
        'secondary': ["Poppins", "sans-serif"],
        'favorite': ["Nunito Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
};

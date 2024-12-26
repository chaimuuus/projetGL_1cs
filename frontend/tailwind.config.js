/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lightYellow: 'rgba(255, 215, 0, 0.2)',
        lightBlue: 'rgba(8, 142, 141, 1)',
        lightGreen: 'rgba(107, 142, 35, 1)',
        iconYellow: 'rgba(255, 215, 0, 1)',
        lightGrey:'rgba(224, 224, 224, 1)',
        textBlack:'rgba(114, 128, 149, 1)',
      },
      fontSize: {
        iconSize: '24px', // Define a custom size for icons
      },
    },
  },
  plugins: [],
}


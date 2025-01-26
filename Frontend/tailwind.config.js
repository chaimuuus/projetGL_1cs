/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom_yellow: '#FFD700',
        custom_Lyellow: '#FFF7CC',
        custom_green: '#6B8E23',
        custom_grey: '#E0E0E0',
        custom_Lgrey: '#C0BFBF',
        custom_black: '#333333',
        custom_blue: '#0F2744',

        primary: "#6B8E23",
        light: "#a3a3a3",
        light1: "#f8f8f8",
        
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
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        'exo2': ['Exo 2', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
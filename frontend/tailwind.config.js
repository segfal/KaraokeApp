/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      mainGreen: '#004643',
      mainWhite: '#fffffe',
      mainYellow: '#f9bc60',
    },
    fontWeight: {
      'extra-light': 100,
      'extra-normal': 200,
      'extra-medium': 300,
      'extra-semibold': 400,
      'extra-bold': 500,
      'extra-extrabold': 600,
      'extra-black': 700,
    },
    extend: {},
  },
  plugins: [],
};


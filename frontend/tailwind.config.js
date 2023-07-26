/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontWeight: {
        'extra-light': 100,
        'extra-normal': 200,
        'extra-medium': 300,
        'extra-semibold': 400,
        'extra-bold': 500,
        'extra-extrabold': 600,
        'extra-black': 700,
      },
      colors: {
        primary: '#004643',
        secondary: '#fffffe',
        tertiary: '#f9bc60',
      },
    },
  },
  plugins: [],
};


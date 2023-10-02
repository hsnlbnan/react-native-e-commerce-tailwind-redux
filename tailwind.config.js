/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./screens/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        danger: "#FF5A5A",
      },
      flex: {
        quarter: "0 0 25%",
        half: "0 0 50%",
        full: "0 0 100%",
      },
    },
  },
  plugins: [],
};

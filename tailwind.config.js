/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        main: "#1990FE",
        mainHover: "#1984FE",
        mainText: "#111111",
        secText: "#555555"
      }
    },
    fontFamily: {
      'tajwel': ['Tajawal', 'sans-serif']
    }
  },
  plugins: [],
}

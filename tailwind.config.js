/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/**/*.{php,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
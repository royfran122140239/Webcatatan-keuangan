/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark-green': '#1B4332',
        'primary-medium-green': '#40916C',
        'accent-light-green': '#95D5B2',
        'text-on-dark': '#F1FAEE',
        'violet-purple': '#8A2BE2',
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        cardGradient:
          'linear-gradient(to top, rgba(245, 246, 252, 0.12), rgba(0, 0, 0, 0.73))',
      },
    },
  },
  plugins: [],
}

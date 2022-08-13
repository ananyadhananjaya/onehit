/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'soft-ui':
          '-10px -10px 20px rgb(255, 255, 255,1), 10px 10px 20px rgb(172, 172, 179, 0.25)'
      }
    }
  },
  plugins: []
}

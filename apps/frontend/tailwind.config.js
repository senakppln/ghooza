/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './pages/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        'gray': '#9baabf',
        'brand-blue': '#1E3A8A',
        'brand-pink': '#EC4899',
      },
    },
  },

}

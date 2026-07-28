/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F4EDE3',
        softCream: '#E8DFD2',
        taupe: '#9A8064',
        sepia: '#7A644D',
        espresso: '#3F3328',
        antGold: '#B99A63',
        sage: '#A8B19D',
        softWhite: '#FBF7EF',
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['EB Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

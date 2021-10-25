module.exports = {
  purge: ['./pages/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
     extend: {},
     fill: theme => ({
      'red': theme('colors.red.500'),
    }),
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: []
}
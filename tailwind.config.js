module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

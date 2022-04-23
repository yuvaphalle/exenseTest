module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    extend: {
       animation: {
        fade: 'fadeOut 5s ease-in-out',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': { backgroundColor: theme('colors.green.300') },
          '100%': { backgroundColor: theme('colors.transparent') }
          ,
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

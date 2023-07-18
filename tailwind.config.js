module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        null: '0rem',
      },
      colors: {
        ToDo: {
          Green: '#CEDCBC',
          LightGreen: '#DAF1BC',
          DarkGreen: '#9CB08D',
          'gradient-purple': '#A8A1F9',
          'gradient-teal': '#CDFFDD',
        },
        tag: {
          important: '#FF9BAD',
          normal: '#FFE5A4',
          trivial: '#83A5FF',
        },
      },
      boxShadow: {
        'inner-xl': 'inset 0 -18px 12px -15px rgba(0, 0, 0, 0.1)',
      },
    },
    fontFamily: {
      sans: ['Inter Regular'],
      lemon: ['Lemon Regular'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

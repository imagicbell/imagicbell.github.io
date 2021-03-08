const colors = require('tailwindcss/colors');
const themeColor = colors.red;
const themeShadow = 'rgba(252, 165, 165, 0.12)'; /**color-red-300 */
// const themeColor = colors.coolGray;
// const themeShadow = 'rgba(0, 0, 0, 0.12)'; 


module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      colors: {
        theme: {
          meta: colors.coolGray[500],
          link: {
            DEFAULT: themeColor[500],
            highlight: themeColor[700],
            disable: themeColor[400],
          },
          bg: {
            DEFAULT: themeColor[300],
            light: themeColor[200],
            text: {
              DEFAULT: colors.coolGray[500],
              highlight: colors.coolGray[700]
            }
          },
          border: {
            DEFAULT: themeColor[300],
          },
          line: {
            DEFAULT: themeColor[200]
          }
        },
      },
      boxShadow: {
        sm: `0 5px 10px ${themeShadow}`,
        md: `0 8px 30px ${themeShadow}`,
      },

      padding: {
        container: '6rem',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
    },
  },
}

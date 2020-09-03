const sizing = {
  '1/10': '10%',
  '2/10': '20%',
  '3/10': '30%',
  '4/10': '40%',
  '5/10': '50%',
  '6/10': '60%',
  '7/10': '70%',
  '8/10': '80%',
  '9/10': '90%',
}

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.svelte',
      './src/**/*.html',
      './src/**/*.css',
      './index.html'
    ],
    options: {
      whitelistPatterns: [/svelte-/],
      defaultExtractor: (content) => {
        const regExp = new RegExp(/[A-Za-z0-9-_:/]+/g)
        const matchedTokens = [];
        let match = regExp.exec(content)
        while (match) {
          if (match[0].startsWith('class:')) {
            matchedTokens.push(match[0].substring(6))
          } else {
            matchedTokens.push(match[0])
          }
          match = regExp.exec(content)
        }
        return matchedTokens
      },
    },
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      scale: {
        'invert': '-1',
      },
      spacing: {
        ...sizing,
      },
      inset: {
        '1/2': '50%',
        '1/4': '20%',
        '2/5': '40%',
        ...sizing,
        'full': '100%',
      },
      borderRadius: {
        'xl': '1rem',
        'full': '10010px',
      },
      fontFamily: {
        sans: 'Roboto',
        satisfy: 'Satisfy',
      },
      colors: {
        'sky': {
          default: '#00AAFF',
          50: '#F2FBFF',
          100: '#E6F7FF',
          200: '#BFEAFF',
          300: '#99DDFF',
          400: '#4DC4FF',
          500: '#00AAFF',
          600: '#0099E6',
          700: '#006699',
          800: '#004D73',
          900: '#00334D',
        },
        'pinky': {
          default: '#EC008C',
          50: '#FEF2F9',
          100: '#FDE6F4',
          200: '#FABFE2',
          300: '#F799D1',
          400: '#F24DAF',
          500: '#EC008C',
          600: '#D4007E',
          700: '#8E0054',
          800: '#6A003F',
          900: '#47002A',
        },
      }
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
}

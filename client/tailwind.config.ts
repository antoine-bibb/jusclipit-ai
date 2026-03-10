import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brandRed: '#ef1b1b',
      },
    },
  },
  plugins: [],
}

export default config

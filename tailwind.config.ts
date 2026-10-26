import type { Config } from 'tailwindcss';
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F4EF', ink: '#253029', muted: '#6F786F', sage: '#788775',
        sand: '#C9B393', line: '#E3E3DC', deep: '#202B25', bone: '#ECE9E2'
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica Neue', 'sans-serif'],
        display: ['Iowan Old Style', 'Baskerville', 'Georgia', 'serif']
      },
      boxShadow: {
        floating: '0 24px 60px rgba(21,37,27,0.12)'
      }
    }
  },
  plugins: []
} satisfies Config;

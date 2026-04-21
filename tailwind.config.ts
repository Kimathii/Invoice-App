import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7C5DFA',
        'primary-light': '#9277FF',
        dark: '#1E2139',
        darker: '#141625',
        'text-primary': '#0C0E16',
        'text-secondary': '#7E88C3',
        'text-muted': '#888EB0',
        border: '#DFE3FA',
        background: '#FFFFFF',
        'background-light': '#F9FAFE',
        danger: '#EC5757',
        'danger-light': '#FF9797',

        // Status badge backgrounds (10% opacity of status color)
        'status-paid-bg': '#33D69F1A',
        'status-paid-text': '#33D69F',
        'status-pending-bg': '#FF8F001A',
        'status-pending-text': '#FF8F00',
        'status-draft-bg': '#DFE3FA1A',
        'status-draft-text': '#373B53',

        // Dark mode status draft text
        'status-draft-text-dark': '#DFE3FA',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '24px',
      },
      boxShadow: {
        dropdown: '0px 10px 20px rgba(72, 84, 159, 0.25)',
        card: '0px 10px 10px -10px rgba(72, 84, 159, 0.1)',
      },
      fontFamily: {
        sans: ["'League Spartan'", 'sans-serif'],
      },
      fontSize: {
        h1: ['36px', { lineHeight: '33px', letterSpacing: '-1.125px', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '22px', letterSpacing: '-0.75px', fontWeight: '700' }],
        h3: ['15px', { lineHeight: '24px', letterSpacing: '-0.25px', fontWeight: '700' }],
        'h3-variant': ['15px', { lineHeight: '15px', letterSpacing: '-0.25px', fontWeight: '700' }],
        body: ['13px', { lineHeight: '18px', letterSpacing: '-0.1px', fontWeight: '500' }],
        'body-variant': ['13px', { lineHeight: '15px', letterSpacing: '-0.1px', fontWeight: '500' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
  },
  plugins: [],
}

export default config

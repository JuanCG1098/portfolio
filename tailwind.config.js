/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:           '#050505',
        surface:      '#0D0C0A',
        'surface-2':  '#131210',
        border:       '#1C1A16',
        text:         '#F0EDE3',
        'text-2':     '#B0A899',
        'text-3':     '#857E72',
        gold:         '#C79A4B',
        'gold-light': '#D6B16A',
        'gold-warm':  '#B8873B',
        teal:         '#4AB8B2',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.025em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

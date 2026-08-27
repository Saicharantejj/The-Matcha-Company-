/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        camel: '#DFC9A9',
        card: '#F0E5D2',
        chocolate: '#2B1F16',
        olive: '#43481D',
        moss: '#7C8438',
        matcha: '#6F9E28',
        cream: '#F6EFC6',
      },
      fontFamily: {
        display: ['"Josefin Sans"', 'sans-serif'],
        body: ['"Instrument Sans"', 'sans-serif'],
        mono: ['"Courier Prime"', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '3px',
        DEFAULT: '3px',
        md: '4px',
        lg: '4px',
        xl: '4px',
        '2xl': '4px',
        '3xl': '4px',
        full: '4px',
      },
      boxShadow: {
        hard: '4px 4px 0px 0px #2B1F16',
        'hard-sm': '2px 2px 0px 0px #2B1F16',
        'hard-olive': '4px 4px 0px 0px #43481D',
      },
      letterSpacing: {
        display: '0.15em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeSlow: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        marqueeSlow: 'marqueeSlow 45s linear infinite',
      },
    },
  },
  plugins: [],
}

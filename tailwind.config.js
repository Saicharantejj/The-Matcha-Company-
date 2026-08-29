/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        camel: '#DFC9A9',
        card: '#F0E5D2',
        ink: '#4C382C',
        // Text tones, kept separate from ink so type can be a deeper, browner
        // colour than the structural ink used for borders, hard shadows and the
        // dark section backgrounds. Solid values on purpose: setting copy as ink
        // at 55-80% alpha let the camel page bleed through the glyphs, dropping
        // their saturation to ~17% and their contrast below the 4.5:1 AA floor.
        cocoa: '#412816',  // primary type — 8.50:1 on camel, 10.96:1 on card
        bark: '#563620',   // secondary type — 6.72:1 on camel, 8.67:1 on card
        linen: '#E3DCB5',  // on dark — 7.68:1 on ink, 6.95:1 on olive
        olive: '#43481D',
        moss: '#7C8438',
        matcha: '#6F9E28',
        cream: '#F6EFC6',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'sans-serif'],
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
        hard: '4px 4px 0px 0px #4C382C',
        'hard-sm': '2px 2px 0px 0px #4C382C',
        'hard-olive': '4px 4px 0px 0px #43481D',
      },
      letterSpacing: {
        // Archivo Black is a heavy grotesque like the wordmark — it wants to be
        // set tight, not letterspaced the way the old light display face was.
        display: '-0.02em',
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

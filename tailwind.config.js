/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Brand Direction 01: Ivory ───────────────────────────────────────
        // Warm ivory ground #E9E7D0, light ivory surface #F8F5EB, dark ink #232E1E,
        // and deep sage #4E6B3E.
        camel: '#E9E7D0',  // Ivory ground: warm ivory paper background
        card: '#F8F5EB',   // Card surface: lighter than ground (1.146:1 ratio)
        ink: '#232E1E',    // Dark ink: rules, borders, dark sections

        // Type tones
        cocoa: '#232E1E',  // Primary type — dark ink
        bark: '#4E6B3E',   // Secondary type — deep sage
        linen: '#C4D2B8',  // Pale sage fill/accent on dark

        // Working greens & fills
        olive: '#4E6B3E',  // Deep sage (text, action buttons)
        moss: '#C4D2B8',   // Pale sage (fills only)
        matcha: '#5C8A2E', // Product green (drink liquid only)

        cream: '#F8F5EB',  // Light ivory
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Instrument Sans"', 'sans-serif'],
        mono: ['"Courier Prime"', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
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
        hard: '4px 4px 0px 0px #232E1E',
        'hard-sm': '2px 2px 0px 0px #232E1E',
        'hard-olive': '4px 4px 0px 0px #4E6B3E',
      },
      fontSize: {
        mega: ['clamp(2.75rem, 8.5vw, 8rem)', { lineHeight: '0.82', letterSpacing: '-0.035em' }],
        major: ['clamp(2.25rem, 5.6vw, 4.5rem)', { lineHeight: '0.88', letterSpacing: '-0.028em' }],
        minor: ['clamp(1.75rem, 3.4vw, 2.75rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        lede: ['clamp(1.0625rem, 1.5vw, 1.375rem)', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        spec: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.16em' }],
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

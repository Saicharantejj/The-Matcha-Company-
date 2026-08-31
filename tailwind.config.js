/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── The brand is two colours ────────────────────────────────────────
        // Beige #F5F5DC and deep green #114817. Everything below is one of
        // those two, or a tint or shade of one, so the site never introduces a
        // third hue. The pair is unusually strong together — green on beige is
        // 9.7:1 either way round — which is what lets structure, type and the
        // dark sections all come from the same two values.
        camel: '#F5F5DC',  // the beige, and the ground the whole site stands on
        card: '#FCFAE9',   // the beige lifted, for panels sitting on the ground
        ink: '#114817',    // the green: every rule, border and dark section

        // Type tones, kept separate from ink so copy can be a deeper green
        // than the structural green used for borders and dark backgrounds.
        // Solid values on purpose: setting copy as ink at 55-80% alpha lets
        // the beige bleed through the glyphs and drops contrast below AA.
        cocoa: '#0D3612',  // primary type — 12.2:1 on beige, 12.9:1 on card
        bark: '#2C5E32',   // secondary type — 6.9:1 on beige, 7.3:1 on card
        linen: '#DCDCB8',  // on dark — 7.6:1 on ink, 4.7:1 on olive

        // The working greens, lightest last: olive carries actions and the
        // spec voice, moss and matcha fill the drawn sachets.
        olive: '#1E6B27',  // 6.0:1 on beige, and carries cream at 6.0:1
        moss: '#35803D',
        matcha: '#4A9C4F',

        // The brand beige again, named for what it does on green rather than
        // for what it is. Deliberately the same value as the ground: the light
        // in this palette is one colour, whether it is paper or type.
        cream: '#F5F5DC',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'sans-serif'],
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
        hard: '4px 4px 0px 0px #114817',
        'hard-sm': '2px 2px 0px 0px #114817',
        'hard-olive': '4px 4px 0px 0px #1E6B27',
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

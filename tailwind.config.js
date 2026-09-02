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

        // Glass surfaces (used via .glass utilities in index.css,
        // these tokens are for inline Tailwind where needed)
        'glass-ivory': 'rgba(248, 245, 235, 0.55)',
        'glass-warm': 'rgba(248, 245, 235, 0.65)',
        'glass-border': 'rgba(35, 46, 30, 0.08)',
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
        // Glass shadows — warm, soft, directional
        'glass': '0 1px 2px rgba(35,46,30,0.04), 0 4px 16px rgba(35,46,30,0.03)',
        'glass-lg': '0 2px 4px rgba(35,46,30,0.05), 0 8px 32px rgba(35,46,30,0.04)',
        'glass-xl': '0 4px 8px rgba(35,46,30,0.06), 0 16px 48px rgba(35,46,30,0.05)',
      },
      fontSize: {
        // Cinematic hero — even larger for editorial impact
        mega: ['clamp(3rem, 9vw, 8.5rem)', { lineHeight: '0.82', letterSpacing: '-0.035em' }],
        major: ['clamp(2.25rem, 5.6vw, 4.5rem)', { lineHeight: '0.88', letterSpacing: '-0.028em' }],
        minor: ['clamp(1.75rem, 3.4vw, 2.75rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        lede: ['clamp(1.0625rem, 1.5vw, 1.375rem)', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        spec: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.16em' }],
      },
      letterSpacing: {
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
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
        '1100': '1100ms',
      },
    },
  },
  plugins: [],
}

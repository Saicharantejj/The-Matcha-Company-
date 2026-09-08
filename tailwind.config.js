/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Brand Color Palette from User Spec ────────────────────────────────
        // FIRE RED:     #D23D2D (Primary vibrant action & headline accent)
        // VANILLA CREAM:#F8EECB (Primary ground & soft surface tone)
        // SAFFRON:      #F5C065 (Warm secondary highlight & badge tone)
        // RETRO GREEN:  #31603D (Deep vintage forest accent)
        // RUSSET:       #6E433D (Deep warm chocolate brown for text & dark rules)
        
        'fire-red': '#D23D2D',
        'vanilla': '#F8EECB',
        'saffron': '#F5C065',
        'retro-green': '#31603D',
        'russet': '#6E433D',

        // Semantic Mapping
        cream: '#F8EECB',       // Primary background (Vanilla Cream)
        surface: '#FFFFFF',     // Clean white surface card
        'surface-warm': '#FBF4DC', // Slightly lighter vanilla surface
        charcoal: '#6E433D',    // Primary text & dark borders (Russet)
        cocoa: '#6E433D',       // Dark chocolate text
        muted: '#8A5D57',       // Muted Russet secondary text
        accent: '#D23D2D',      // Primary Accent (Fire Red)
        'accent-green': '#31603D', // Secondary Accent (Retro Green)
        'accent-yellow': '#F5C065', // Secondary Accent (Saffron)

        // Glass surface tokens
        'glass-vanilla': 'rgba(248, 238, 203, 0.88)',
        'glass-white': 'rgba(255, 255, 255, 0.85)',
        'glass-dark': 'rgba(110, 67, 61, 0.92)',
        'glass-border': 'rgba(110, 67, 61, 0.12)',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '8px',
        DEFAULT: '16px',
        md: '20px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
        full: '9999px',
      },
      boxShadow: {
        'subtle': '0 4px 20px rgba(110, 67, 61, 0.04)',
        'card': '0 8px 30px rgba(110, 67, 61, 0.06)',
        'pop': '0 20px 40px rgba(110, 67, 61, 0.12)',
        'glass': '0 8px 32px rgba(110, 67, 61, 0.06)',
      },
      fontSize: {
        mega: ['clamp(3.5rem, 8.5vw, 7.5rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        major: ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        minor: ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        lede: ['clamp(1.1rem, 1.5vw, 1.35rem)', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        spec: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.12em' }],
      },
    },
  },
  plugins: [],
}

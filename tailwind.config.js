/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── CHASKA Master Brand Palette (Indigo & Ivory Signature) ───────────────
        // FOUNDATION (65%):       Midnight Indigo   #17245B
        // CANVAS NEUTRAL (25%):   Rice-Paper Ivory  #F5EEDD
        // APPETITE ACCENT (7%):   Toasted Saffron   #E2AE35
        // HEAT ACCENT (3%):       Chilli Lacquer    #A9223A
        // PURE SURFACE:           Crisp White       #FFFFFF
        
        'midnight-indigo': '#17245B',
        'midnight-indigo-dark': '#0F183D',
        'midnight-indigo-light': '#253578',
        'rice-paper-ivory': '#F5EEDD',
        'rice-paper-warm': '#FAF6ED',
        'toasted-saffron': '#E2AE35',
        'toasted-saffron-dark': '#C89726',
        'chilli-lacquer': '#A9223A',
        'chilli-lacquer-bright': '#D9381E',
        'chaska-orange': '#E2AE35',
        'chaska-orange-dark': '#C89726',
        'chaska-cream': '#F5EEDD',
        'chaska-cream-dark': '#EADFCA',
        'chaska-charcoal': '#17245B',
        'chaska-charcoal-soft': '#253578',
        'chaska-saffron': '#E2AE35',
        'chaska-crimson': '#A9223A',

        // Semantic mappings
        foundation: '#17245B',
        indigo: '#17245B',
        ivory: '#F5EEDD',
        saffron: '#E2AE35',
        lacquer: '#A9223A',
        chilli: '#A9223A',
        cream: '#F5EEDD',
        surface: '#FFFFFF',
        'surface-warm': '#FAF6ED',
        charcoal: '#17245B',
        cocoa: '#17245B',
        oxblood: '#A9223A',
        teal: '#17245B',
        muted: '#8A93AA',
        accent: '#E2AE35',
        'accent-heat': '#A9223A',
        'accent-yellow': '#E2AE35',

        // Glass & Surface tokens
        'glass-ivory': 'rgba(245, 238, 221, 0.94)',
        'glass-white': 'rgba(255, 255, 255, 0.94)',
        'glass-dark': 'rgba(23, 36, 91, 0.95)',
        'glass-border': 'rgba(23, 36, 91, 0.12)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
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
        'subtle': '0 4px 20px rgba(23, 36, 91, 0.04)',
        'card': '0 8px 30px rgba(23, 36, 91, 0.06)',
        'pop': '0 20px 40px rgba(23, 36, 91, 0.12)',
        'glass': '0 8px 32px rgba(23, 36, 91, 0.06)',
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

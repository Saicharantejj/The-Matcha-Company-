/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── CHASKA Master Brand Palette (Refined Editorial D2C) ──────────────
        // Canvas Background (Warm Ivory): #FAF8F5
        // Canvas Warm Surface:             #F5F2EB
        // Pure Surface Card:               #FFFFFF
        // Text Charcoal (Near Black):      #141414
        // Text Charcoal Muted:             #555555
        // Brand Appetite Accent (Orange):  #FF5400
        
        'chaska-bg': '#FAF8F5',
        'chaska-bg-warm': '#F5F2EB',
        'chaska-surface': '#FFFFFF',
        'chaska-charcoal': '#141414',
        'chaska-charcoal-muted': '#555555',
        'chaska-charcoal-soft': '#7E7E7E',
        'chaska-orange': '#FF5400',
        'chaska-orange-dark': '#E04800',
        'chaska-orange-light': '#FFF3EB',

        // Semantic tokens
        canvas: '#FAF8F5',
        'canvas-warm': '#F5F2EB',
        surface: '#FFFFFF',
        charcoal: '#141414',
        'charcoal-muted': '#555555',
        accent: '#FF5400',
        'accent-dark': '#E04800',
        'accent-light': '#FFF3EB',

        // Backward compatibility tokens
        'rice-paper-ivory': '#FAF8F5',
        'rice-paper-warm': '#F5F2EB',
        'midnight-indigo': '#141414',
        'midnight-indigo-dark': '#0A0A0A',
        'midnight-indigo-light': '#242424',
        'toasted-saffron': '#FF5400',
        'toasted-saffron-dark': '#E04800',
        'chilli-lacquer': '#E63946',
        'chaska-cream': '#FAF8F5',
        'chaska-cream-dark': '#F0ECE1',
        foundation: '#141414',
        indigo: '#141414',
        ivory: '#FAF8F5',
        saffron: '#FF5400',
        cream: '#FAF8F5',

        // Flavour Badges & Accents
        flavour: {
          peri: { text: '#E63946', bg: '#FFF1F2', border: '#FECDD3' },
          cheese: { text: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
          lime: { text: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
          garlic: { text: '#B91C1C', bg: '#FEF2F2', border: '#FECACA' },
          pudhina: { text: '#0D9488', bg: '#F0FDFA', border: '#99F6E4' },
        },
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
        xs: '6px',
        sm: '8px',
        DEFAULT: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px',
        '2xl': '32px',
        full: '9999px',
      },
      boxShadow: {
        '2xs': '0 1px 2px rgba(0, 0, 0, 0.03)',
        'xs': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.03)',
        'float': '0 12px 36px rgba(0, 0, 0, 0.06)',
        'pop': '0 20px 48px rgba(0, 0, 0, 0.08)',
      },
      fontSize: {
        hero: ['clamp(2.75rem, 6.5vw, 5.5rem)', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
        display: ['clamp(2rem, 4vw, 3.75rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        title: ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        lede: ['clamp(1rem, 1.25vw, 1.15rem)', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        spec: ['0.72rem', { lineHeight: '1.2', letterSpacing: '0.1em' }],
      },
    },
  },
  plugins: [],
}

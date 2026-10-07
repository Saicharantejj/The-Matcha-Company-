/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── CHASKA Master Brand Palette (Midnight Indigo & Ivory) ───────────
        // Canvas Ground (Light):          Warm Ivory       #FAF8F5
        // Canvas Ground (Dark):           Deep Midnight    #0C122C
        // Brand Foundation / Primary:     Midnight Indigo  #17245B
        // Brand Dark Surface:             Midnight Surface #131D4A / #17245B
        // Brand Dark Elevated:            Indigo Elevated  #1C2A6B
        // Brand Signature Accent:         Chaska Orange    #FF5400
        // Secondary Accent:               Toasted Saffron  #E2AE35
        
        'chaska-bg': '#FAF8F5',
        'chaska-bg-dark': '#0C122C',
        'chaska-bg-warm': '#F5F2EB',
        'chaska-surface': '#FFFFFF',
        'chaska-surface-dark': '#131D4A',
        'chaska-surface-dark-elevated': '#1C2A6B',
        'chaska-indigo': '#17245B',
        'chaska-indigo-dark': '#0C122C',
        'chaska-indigo-surface': '#131D4A',
        'chaska-indigo-light': '#1C2A6B',
        'chaska-charcoal': '#17245B',
        'chaska-charcoal-muted': '#556080',
        'chaska-charcoal-soft': '#7E8BA8',
        'chaska-orange': '#FF5400',
        'chaska-orange-dark': '#E04800',
        'chaska-orange-light': '#FFF3EB',

        // Semantic tokens
        canvas: '#FAF8F5',
        'canvas-dark': '#0C122C',
        'canvas-warm': '#F5F2EB',
        surface: '#FFFFFF',
        'surface-dark': '#131D4A',
        charcoal: '#17245B',
        'charcoal-muted': '#556080',
        accent: '#FF5400',
        'accent-dark': '#E04800',
        'accent-light': '#FFF3EB',

        // Brand Foundation tokens
        'midnight-indigo': '#17245B',
        'midnight-indigo-dark': '#0C122C',
        'midnight-indigo-surface': '#131D4A',
        'midnight-indigo-light': '#1C2A6B',
        'midnight-indigo-border': '#243373',
        'rice-paper-ivory': '#FAF8F5',
        'rice-paper-warm': '#F5F2EB',
        'toasted-saffron': '#E2AE35',
        'toasted-saffron-dark': '#C69420',
        'chilli-lacquer': '#E63946',
        'chaska-cream': '#FAF8F5',
        'chaska-cream-dark': '#F0ECE1',
        foundation: '#17245B',
        indigo: '#17245B',
        ivory: '#FAF8F5',
        saffron: '#E2AE35',
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
        sans: ['"TT Burn"', '"TRT Burn"', '"Bebas Neue"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"TT Burn"', '"TRT Burn"', '"Bebas Neue"', '"Bricolage Grotesque"', 'sans-serif'],
        heading: ['"TT Burn"', '"TRT Burn"', '"Bebas Neue"', 'sans-serif'],
        body: ['"TT Burn"', '"TRT Burn"', '"Bebas Neue"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
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

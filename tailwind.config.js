/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Master Colour System (Brand Spec) ─────────────────────────────────
        // FOUNDATION (65%):       Midnight Indigo   #17245B
        // CANVAS NEUTRAL (25%):   Rice-Paper Ivory  #F5EEDD
        // APPETITE ACCENT (7%):   Toasted Saffron   #E2AE35
        // HEAT ACCENT (3%):       Chilli Lacquer    #A9223A
        
        'midnight-indigo': '#17245B',
        'rice-paper-ivory': '#F5EEDD',
        'toasted-saffron': '#E2AE35',
        'chilli-lacquer': '#A9223A',

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
        oxblood: '#17245B',
        teal: '#17245B',
        muted: '#A5A29A',
        accent: '#E2AE35',
        'accent-heat': '#A9223A',
        'accent-yellow': '#E2AE35',

        // Glass surface tokens
        'glass-ivory': 'rgba(245, 238, 221, 0.92)',
        'glass-white': 'rgba(255, 255, 255, 0.92)',
        'glass-dark': 'rgba(23, 36, 91, 0.94)',
        'glass-border': 'rgba(23, 36, 91, 0.12)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Noto Sans Devanagari"', '"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', '"Noto Sans Devanagari"', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', '"Bricolage Grotesque"', 'sans-serif'],
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

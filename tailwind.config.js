/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── CHASKA 10/10 Premium Brand Palette ────────────────────────────────
        // Canvas Neutral: Warm Off-White / Cream  #FAF7F2
        // Brand Signature: Chaska Fiery Orange    #FF4D15
        // Brand Typography: Deep Charcoal         #141416
        // Secondary Accent: Toasted Saffron       #F59E0B
        // Heat Accent: Crimson Fire               #DC2626
        // Pure Surface: Crisp White               #FFFFFF
        
        'chaska-orange': '#FF4D15',
        'chaska-orange-dark': '#E63E07',
        'chaska-cream': '#FAF7F2',
        'chaska-cream-dark': '#F0ECE1',
        'chaska-charcoal': '#141416',
        'chaska-charcoal-soft': '#242428',
        'chaska-saffron': '#F59E0B',
        'chaska-crimson': '#DC2626',

        // Legacy compatibility mappings
        'midnight-indigo': '#141416',
        'rice-paper-ivory': '#FAF7F2',
        'toasted-saffron': '#F59E0B',
        'chilli-lacquer': '#FF4D15',

        foundation: '#141416',
        indigo: '#141416',
        ivory: '#FAF7F2',
        saffron: '#F59E0B',
        lacquer: '#FF4D15',
        chilli: '#DC2626',
        cream: '#FAF7F2',
        surface: '#FFFFFF',
        'surface-warm': '#F6F2EB',
        charcoal: '#141416',
        cocoa: '#141416',
        oxblood: '#DC2626',
        teal: '#141416',
        muted: '#8E8D88',
        accent: '#FF4D15',
        'accent-heat': '#DC2626',
        'accent-yellow': '#F59E0B',

        // Glass & Surface tokens
        'glass-ivory': 'rgba(250, 247, 242, 0.92)',
        'glass-white': 'rgba(255, 255, 255, 0.94)',
        'glass-dark': 'rgba(20, 20, 22, 0.95)',
        'glass-border': 'rgba(20, 20, 22, 0.08)',
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

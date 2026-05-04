/**
 * Optmizy | Digital Innovation Studio
 * Tailwind CSS Configuration
 */

tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary:        { DEFAULT: '#91D51F', dark: '#7ab319' },
        secondary:      '#29B6F6',
        accent:         '#4DD0E1',
        'bg-page':      '#020617',
        'bg-card':      '#0f172a',
        'bg-elevated':  '#1e293b',
        'text-primary':   '#f8fafc',
        'text-secondary': '#94a3b8',
        'text-muted':     '#64748b',
        'border-subtle':  'rgba(255,255,255,0.05)',
        'border-strong':  'rgba(255,255,255,0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    }
  }
};

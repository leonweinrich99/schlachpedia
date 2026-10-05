/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        // Alle Farben referenzieren CSS-Variablen -> Theme-Wechsel über [data-theme]
        surface: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          elevated: 'var(--bg-elevated)',
        },
        label: {
          primary: 'var(--label-primary)',
          secondary: 'var(--label-secondary)',
          tertiary: 'var(--label-tertiary)',
          quaternary: 'var(--label-quaternary)',
        },
        fill: {
          primary: 'var(--fill-primary)',
          secondary: 'var(--fill-secondary)',
          tertiary: 'var(--fill-tertiary)',
          quaternary: 'var(--fill-quaternary)',
        },
        separator: 'var(--separator)',
        ios: {
          blue: 'var(--ios-blue)',
          green: 'var(--ios-green)',
          red: 'var(--ios-red)',
          orange: 'var(--ios-orange)',
          yellow: 'var(--ios-yellow)',
          purple: 'var(--ios-purple)',
          pink: 'var(--ios-pink)',
          teal: 'var(--ios-teal)',
          indigo: 'var(--ios-indigo)',
        },
        // TODO: Hier pro App 1-2 Akzentfarben ergänzen (z.B. "brand: { primary, secondary }"),
        // die auf eigene CSS-Variablen in index.css zeigen. So bleibt das System konsistent,
        // jede App bekommt aber trotzdem ihre eigene Identität.
      },
      borderRadius: {
        ios: '0.5rem' /* 8px  – Buttons, Inputs, kleine Chips */,
        'ios-lg': '1rem' /* 16px – Karten */,
        'ios-xl': '1.5rem' /* 24px – große Elemente, Sheets */,
        'ios-2xl': '1.5rem',
      },
      boxShadow: {
        'ios-sm': '0 2px 8px rgba(0,0,0,0.08)',
        ios: '0 4px 12px rgba(0,0,0,0.10)',
        'ios-lg': '0 8px 24px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}

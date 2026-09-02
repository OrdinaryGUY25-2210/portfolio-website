/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-bg)',
        panel: 'var(--color-panel)',
        panel2: 'var(--color-panel2)',
        hair: 'var(--color-hair)',
        cream: 'var(--color-cream)',
        mute: 'var(--color-mute)',
        gold: {
          light: 'var(--color-gold-light)',
          DEFAULT: 'var(--color-gold)',
        },
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0908',
        panel: '#131110',
        panel2: '#1A1714',
        hair: 'rgba(242,237,228,0.12)',
        cream: '#F2EDE4',
        mute: '#9C9488',
        gold: {
          light: '#C9A96A',
          DEFAULT: '#AB892C',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        dark:   '#0d0f14',
        card:   '#161920',
        accent: '#c8a96e',
        muted:  '#7a7670',
      },
    },
  },
  plugins: [],
}
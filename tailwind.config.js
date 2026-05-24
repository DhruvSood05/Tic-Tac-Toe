/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        sketch: ['Kalam', 'cursive'],
        hand: ['Caveat', 'cursive'],
      },
      colors: {
        paper: '#fcfbf9',
        ink: '#2a2a2a',
        muted: '#8a8a8a',
        primary: '#3b82f6', // subtle blue for primary actions if needed
      },
      boxShadow: {
        'sketch': '4px 4px 0px rgba(42, 42, 42, 0.8)',
        'sketch-hover': '6px 6px 0px rgba(42, 42, 42, 0.6)',
      },
      borderRadius: {
        'sketch': '255px 15px 225px 15px/15px 225px 15px 255px',
      }
    },
  },
  plugins: [],
}

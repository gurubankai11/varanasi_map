/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        varanasi: {
          gold: '#FF9933',
          saffron: '#FF6F00',
          marigold: '#E65100',
          holyblue: '#0D47A1',
          ganga: '#E0F2F1',
          dark: '#0a0a0e',
          luxury: '#12121c',
        }
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        saffron: '0 8px 32px 0 rgba(255, 111, 0, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

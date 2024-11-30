/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-red': '#dd2b14',
        'custom-orange': '#e1b787'
      },
      transitionDuration: {
        'base-transition': '300ms',
      },
      screens: {
        'custom-569': '569px',
      },
    },
  },
  plugins: [],
}


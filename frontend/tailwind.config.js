/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // Добавляем safelist !!!!!
  safelist: ["glass-inner"],

  theme: {
    extend: {
      gridTemplateColumns: {
        40: 'repeat(40, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}

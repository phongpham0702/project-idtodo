/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-blue': '#1677ff',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}


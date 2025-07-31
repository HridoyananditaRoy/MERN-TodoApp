/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                 // ← For Vite
    "./src/**/*.{js,ts,jsx,tsx}",   // ← Covers all relevant files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

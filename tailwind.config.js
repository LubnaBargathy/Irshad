/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Tajawal"', 'sans-serif'],
      },
      colors: {
        background: '#F5F3E7', // Cream background from identity
        surface: '#FFFFFF',
        primary: {
          50: '#f4f8f3',
          100: '#e8f1e6',
          200: '#d1e2cd',
          300: '#b9d4b4',
          400: '#A8C69F', // Sage Green (Identity Primary)
          500: '#8ba783',
          600: '#6e8867',
          700: '#52694b',
        },
        secondary: {
          50: '#fefcf0',
          100: '#fdfae1',
          200: '#fbf5c3',
          300: '#f9f0a5',
          400: '#F1E066', // Pale Yellow (Identity Secondary)
          500: '#d9c85c',
          600: '#c1b151',
        },
        accent: {
          50: '#fff7f2',
          100: '#ffefdb',
          200: '#ffdcb3',
          300: '#ffc18a',
          400: '#fb9f5f',
          500: '#E99E75', // Peach/Terracotta (Identity Accent)
        },
        text: {
          primary: '#1A1A1A', // Dark charcoal from identity
          secondary: '#4A4A4A',
          muted: '#7A7A7A',
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'floating': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}

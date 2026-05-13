/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#667EEA',
        secondary: '#764BA2',
        background: '#FAFAFA',
        card: '#FFFFFF',
        border: '#E5E5E5',
        'dark-bg': '#1A1A2E',
        'dark-card': '#16213E',
        'dark-text': '#E5E5E5'
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
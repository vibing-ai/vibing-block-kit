/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './docs/stories/**/*.{js,ts,jsx,tsx}',
    './examples/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/react/dist/**/*.{js,mjs}'
  ],
  theme: {
    extend: {
      // Integration with HeroUI theme
      colors: {
        // Map Tailwind colors to HeroUI CSS variables
        primary: {
          50: 'var(--hero-color-primary-50)',
          100: 'var(--hero-color-primary-100)',
          200: 'var(--hero-color-primary-200)',
          300: 'var(--hero-color-primary-300)',
          400: 'var(--hero-color-primary-400)',
          500: 'var(--hero-color-primary-500)',
          600: 'var(--hero-color-primary-600)',
          700: 'var(--hero-color-primary-700)',
          800: 'var(--hero-color-primary-800)',
          900: 'var(--hero-color-primary-900)',
          DEFAULT: 'var(--hero-color-primary)'
        },
        secondary: {
          50: 'var(--hero-color-secondary-50)',
          100: 'var(--hero-color-secondary-100)',
          200: 'var(--hero-color-secondary-200)',
          300: 'var(--hero-color-secondary-300)',
          400: 'var(--hero-color-secondary-400)',
          500: 'var(--hero-color-secondary-500)',
          600: 'var(--hero-color-secondary-600)',
          700: 'var(--hero-color-secondary-700)',
          800: 'var(--hero-color-secondary-800)',
          900: 'var(--hero-color-secondary-900)',
          DEFAULT: 'var(--hero-color-secondary)'
        },
        background: 'var(--hero-color-background)',
        foreground: 'var(--hero-color-foreground)',
        muted: 'var(--hero-color-muted)',
        'muted-foreground': 'var(--hero-color-muted-foreground)',
        accent: 'var(--hero-color-accent)',
        card: 'var(--hero-color-card)',
        border: 'var(--hero-color-border)',
        input: 'var(--hero-color-input)',
      },
      borderRadius: {
        sm: 'var(--hero-border-radius-sm)',
        DEFAULT: 'var(--hero-border-radius-md)',
        md: 'var(--hero-border-radius-md)',
        lg: 'var(--hero-border-radius-lg)',
        xl: 'var(--hero-border-radius-xl)',
        '2xl': 'var(--hero-border-radius-2xl)',
        full: 'var(--hero-border-radius-full)',
      },
      fontFamily: {
        sans: 'var(--hero-font-sans)',
        mono: 'var(--hero-font-mono)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}; 
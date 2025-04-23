import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--bk-color-background)',
        foreground: 'var(--bk-color-foreground)',
        primary: {
          DEFAULT: 'var(--bk-color-primary)',
          foreground: 'var(--bk-color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--bk-color-secondary)',
          foreground: 'var(--bk-color-secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--bk-color-destructive)',
          foreground: 'var(--bk-color-destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--bk-color-muted)',
          foreground: 'var(--bk-color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--bk-color-accent)',
          foreground: 'var(--bk-color-accent-foreground)',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config; 
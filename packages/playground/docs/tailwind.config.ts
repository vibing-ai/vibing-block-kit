import type { Config } from 'tailwindcss';
import baseConfig from '../../../tailwind.config';

const config: Config = {
  ...baseConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@block-kit/core/dist/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config; 
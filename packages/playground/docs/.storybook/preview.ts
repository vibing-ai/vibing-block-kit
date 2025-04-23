import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';
import { withThemeProvider } from './ThemeToggleDecorator';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      current: 'light',
      darkClass: 'dark',
      lightClass: 'light',
      stylePreview: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
  },
  decorators: [withThemeProvider],
  globals: {
    theme: 'light',
  },
};

export default preview; 
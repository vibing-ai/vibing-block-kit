import { createTheme, Theme } from '@heroui/react';

/**
 * Generate a custom HeroUI theme with specified options
 */
export function createCustomTheme(options: {
  type?: 'light' | 'dark';
  primary?: string;
  secondary?: string;
  accent?: string;
  neutral?: string;
  [key: string]: any;
}): Theme {
  const { type = 'light', ...colorOptions } = options;
  
  return createTheme({
    type,
    colors: {
      // Allow custom colors to be passed in
      ...colorOptions
    }
  });
}

/**
 * Default light theme with Block Kit branding
 */
export const blockKitLightTheme = createCustomTheme({
  type: 'light',
  // You can customize your brand colors here
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    DEFAULT: '#0ea5e9'
  }
});

/**
 * Default dark theme with Block Kit branding
 */
export const blockKitDarkTheme = createCustomTheme({
  type: 'dark',
  // You can customize your brand colors here
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    DEFAULT: '#0ea5e9'
  }
});

/**
 * Get a theme based on a name
 */
export function getThemeByName(themeName: string | undefined): Theme {
  switch (themeName) {
    case 'dark':
      return blockKitDarkTheme;
    case 'light':
    default:
      return blockKitLightTheme;
  }
}

/**
 * Create a theme for a specific brand or client
 */
export function createBrandTheme(options: {
  name: string;
  type?: 'light' | 'dark';
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  [key: string]: any;
}): Theme {
  const { name, type = 'light', primaryColor, secondaryColor, accentColor, ...rest } = options;
  
  return createCustomTheme({
    type,
    primary: primaryColor,
    ...(secondaryColor ? { secondary: secondaryColor } : {}),
    ...(accentColor ? { accent: accentColor } : {}),
    ...rest
  });
} 
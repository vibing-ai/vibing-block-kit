/**
 * Simple theme type definition
 */
export interface ThemeConfig {
  type?: 'light' | 'dark';
  colors?: Record<string, any>;
  [key: string]: any;
}

/**
 * Generate a custom theme with specified options
 */
export function createCustomTheme(options: {
  type?: 'light' | 'dark';
  primary?: string | Record<string, string>;
  secondary?: string | Record<string, string>;
  accent?: string | Record<string, string>;
  neutral?: string | Record<string, string>;
  [key: string]: any;
}): ThemeConfig {
  const { type = 'light', ...colorOptions } = options;
  
  return {
    type,
    colors: {
      // Allow custom colors to be passed in
      ...colorOptions
    }
  };
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
export function getThemeByName(themeName: string | undefined): ThemeConfig {
  return { type: (themeName as 'light' | 'dark') || 'light' };
}

/**
 * Create a theme for a specific brand or client
 */
export function createBrandTheme(options: {
  name?: string;
  type?: 'light' | 'dark';
  primaryColor: string | Record<string, string>;
  secondaryColor?: string | Record<string, string>;
  accentColor?: string | Record<string, string>;
  [key: string]: any;
}): ThemeConfig {
  const { type = 'light', primaryColor, secondaryColor, accentColor, ...rest } = options;
  
  return createCustomTheme({
    type,
    primary: primaryColor,
    ...(secondaryColor ? { secondary: secondaryColor } : {}),
    ...(accentColor ? { accent: accentColor } : {}),
    ...rest
  });
} 
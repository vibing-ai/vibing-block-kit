/**
 * Type definitions for color values
 */
export type ColorValue = string;
export type ColorScale = Record<string | number, ColorValue>;
export type ColorObject = ColorValue | ColorScale;

/**
 * Type for theme additional properties
 */
export type ThemeAdditionalProps = Record<string, unknown>;

/**
 * Simple theme type definition
 */
export interface ThemeConfig {
  type?: 'light' | 'dark';
  colors?: Record<string, ColorObject>;
  [key: string]: unknown;
}

/**
 * Options for creating a custom theme
 */
export interface CustomThemeOptions extends ThemeAdditionalProps {
  type?: 'light' | 'dark';
  primary?: ColorObject;
  secondary?: ColorObject;
  accent?: ColorObject;
  neutral?: ColorObject;
}

/**
 * Generate a custom theme with specified options
 */
export function createCustomTheme(options: CustomThemeOptions): ThemeConfig {
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
 * Options for creating a brand theme
 */
export interface BrandThemeOptions extends ThemeAdditionalProps {
  name?: string;
  type?: 'light' | 'dark';
  primaryColor: ColorObject;
  secondaryColor?: ColorObject;
  accentColor?: ColorObject;
}

/**
 * Create a theme for a specific brand or client
 */
export function createBrandTheme(options: BrandThemeOptions): ThemeConfig {
  const { type = 'light', primaryColor, secondaryColor, accentColor, ...rest } = options;
  
  return createCustomTheme({
    type,
    primary: primaryColor,
    ...(secondaryColor ? { secondary: secondaryColor } : {}),
    ...(accentColor ? { accent: accentColor } : {}),
    ...rest
  });
} 
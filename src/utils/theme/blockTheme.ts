export interface BlockTheme {
  /**
   * Default background color
   */
  background: string;
  
  /**
   * Default text color
   */
  textColor: string;
  
  /**
   * Border color
   */
  borderColor: string;
  
  /**
   * Primary accent color
   */
  accentColor: string;
  
  /**
   * Error color
   */
  errorColor: string;
  
  /**
   * Success color
   */
  successColor: string;
  
  /**
   * Warning color
   */
  warningColor: string;
  
  /**
   * Info color
   */
  infoColor: string;
  
  /**
   * Border radius
   */
  borderRadius: string;
  
  /**
   * Font family
   */
  fontFamily: string;
  
  /**
   * Base spacing unit
   */
  spacingUnit: string;
  
  /**
   * Card background color
   */
  cardBackground: string;
  
  /**
   * Muted background color
   */
  mutedBackground: string;
  
  /**
   * Input background color
   */
  inputBackground: string;
}

/**
 * Default light theme
 */
export const lightTheme: BlockTheme = {
  background: 'var(--hero-color-background, #FFFFFF)',
  textColor: 'var(--hero-color-text, #1A1A1A)',
  borderColor: 'var(--hero-color-border, #E5E7EB)',
  accentColor: 'var(--hero-color-accent, #3B82F6)',
  errorColor: 'var(--hero-color-error, #EF4444)',
  successColor: 'var(--hero-color-success, #10B981)',
  warningColor: 'var(--hero-color-warning, #F59E0B)',
  infoColor: 'var(--hero-color-info, #3B82F6)',
  borderRadius: 'var(--hero-border-radius, 0.375rem)',
  fontFamily: 'var(--hero-font-family, "Inter", sans-serif)',
  spacingUnit: 'var(--hero-spacing-unit, 0.25rem)',
  cardBackground: 'var(--hero-color-card, #FFFFFF)',
  mutedBackground: 'var(--hero-color-muted, #F9FAFB)',
  inputBackground: 'var(--hero-color-input, #FFFFFF)',
};

/**
 * Default dark theme
 */
export const darkTheme: BlockTheme = {
  background: 'var(--hero-color-background, #1A1A1A)',
  textColor: 'var(--hero-color-text, #FFFFFF)',
  borderColor: 'var(--hero-color-border, #374151)',
  accentColor: 'var(--hero-color-accent, #60A5FA)',
  errorColor: 'var(--hero-color-error, #F87171)',
  successColor: 'var(--hero-color-success, #34D399)',
  warningColor: 'var(--hero-color-warning, #FBBF24)',
  infoColor: 'var(--hero-color-info, #60A5FA)',
  borderRadius: 'var(--hero-border-radius, 0.375rem)',
  fontFamily: 'var(--hero-font-family, "Inter", sans-serif)',
  spacingUnit: 'var(--hero-spacing-unit, 0.25rem)',
  cardBackground: 'var(--hero-color-card, #1F2937)',
  mutedBackground: 'var(--hero-color-muted, #111827)',
  inputBackground: 'var(--hero-color-input, #374151)',
};

/**
 * Get spacing value in multiples of the spacing unit
 */
export function getSpacing(theme: BlockTheme, multiplier: number): string {
  // Parse the spacing unit value
  const match = theme.spacingUnit.match(/^([\d.]+)(\w+)$/);
  if (!match) return `${multiplier * 0.25}rem`;
  
  const [, value, unit] = match;
  return `${parseFloat(value) * multiplier}${unit}`;
}

/**
 * Create a custom theme by extending the default theme
 */
export function createBlockTheme(
  baseTheme: 'light' | 'dark' | BlockTheme,
  overrides: Partial<BlockTheme> = {}
): BlockTheme {
  const base = typeof baseTheme === 'string'
    ? baseTheme === 'dark' ? darkTheme : lightTheme
    : baseTheme;
  
  return {
    ...base,
    ...overrides,
  };
} 
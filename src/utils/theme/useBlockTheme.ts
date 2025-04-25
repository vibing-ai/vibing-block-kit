import { useContext } from 'react';
import { useTheme as useHeroTheme } from '@heroui/react';
import { BlockTheme, lightTheme, darkTheme } from './blockTheme';

/**
 * @deprecated Use useTheme from '@vibing-ai/block-kit' instead
 */
export function useBlockTheme(): BlockTheme {
  const heroTheme = useHeroTheme();
  return heroTheme.type === 'dark' ? darkTheme : lightTheme;
}

/**
 * @deprecated Use useTheme from '@vibing-ai/block-kit' instead
 */
export function useCompatibleTheme() {
  const heroTheme = useHeroTheme();
  const blockTheme = heroTheme.type === 'dark' ? darkTheme : lightTheme;
  const isDarkMode = heroTheme.type === 'dark';
  
  return {
    blockTheme,
    heroTheme,
    isDarkMode
  };
}

/**
 * Options for the useThemeDetector hook
 */
export interface UseThemeDetectorOptions {
  /**
   * Default theme to use
   */
  defaultTheme?: 'light' | 'dark';
  
  /**
   * Whether to observe system theme changes
   */
  observeSystem?: boolean;
}

/**
 * @deprecated Use useTheme from '@vibing-ai/block-kit' instead
 */
export function useThemeDetector(options: UseThemeDetectorOptions = {}) {
  const { type } = useHeroTheme();
  const isDarkMode = type === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  return { theme, isDarkMode };
}

/**
 * @deprecated Use createTheme from '@heroui/react' instead
 */
export function useCustomBlockTheme(
  baseTheme: 'light' | 'dark' | BlockTheme,
  overrides: Partial<BlockTheme> = {}
): BlockTheme {
  // For backward compatibility only
  const base = typeof baseTheme === 'string'
    ? baseTheme === 'dark' ? darkTheme : lightTheme
    : baseTheme;
  
  return {
    ...base,
    ...overrides,
  };
}

// Re-export BlockThemeContext for backward compatibility
// This is a dummy context that isn't actually used anymore
import { createContext } from 'react';
export const BlockThemeContext = createContext<BlockTheme>(lightTheme); 
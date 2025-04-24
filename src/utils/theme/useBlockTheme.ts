import { createContext, useContext, useMemo } from 'react';
import { useTheme as useHeroTheme } from '@heroui/react';
import { BlockTheme, lightTheme, darkTheme, createBlockTheme } from './blockTheme';

/**
 * Context for providing the block theme
 */
export const BlockThemeContext = createContext<BlockTheme>(lightTheme);

/**
 * Hook for accessing the current block theme
 */
export function useBlockTheme(): BlockTheme {
  return useContext(BlockThemeContext);
}

/**
 * Hook for accessing HeroUI theme and converting to Block theme format if needed
 * This provides compatibility for components still using the old theme format
 */
export function useCompatibleTheme(): {
  blockTheme: BlockTheme;
  heroTheme: ReturnType<typeof useHeroTheme>;
  isDarkMode: boolean;
} {
  const blockTheme = useBlockTheme();
  const heroTheme = useHeroTheme();
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
 * Hook for detecting the system theme
 * @deprecated Use useHeroTheme from @heroui/react instead
 */
export function useThemeDetector(options: UseThemeDetectorOptions = {}) {
  const { defaultTheme = 'light', observeSystem = true } = options;
  const { type } = useHeroTheme();
  
  const isDarkMode = useMemo(() => {
    return type === 'dark';
  }, [type]);
  
  const theme = useMemo(() => {
    return isDarkMode ? darkTheme : lightTheme;
  }, [isDarkMode]);
  
  return { theme, isDarkMode };
}

/**
 * Hook for creating a custom block theme
 */
export function useCustomBlockTheme(
  baseTheme: 'light' | 'dark' | BlockTheme,
  overrides: Partial<BlockTheme> = {}
): BlockTheme {
  return useMemo(() => {
    return createBlockTheme(baseTheme, overrides);
  }, [baseTheme, overrides]);
} 
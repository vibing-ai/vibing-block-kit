import React from 'react';
import { HeroUIProvider, Theme, useTheme as useHeroTheme } from '@heroui/react';

export interface BlockKitProviderProps {
  /**
   * Children to render
   */
  children: React.ReactNode;
  
  /**
   * Theme to use - can be 'light', 'dark', or a custom HeroUI theme
   */
  theme?: 'light' | 'dark' | Theme;
  
  /**
   * Whether to use system preferred color scheme
   */
  useSystemTheme?: boolean;
}

/**
 * Main provider component for Block Kit applications
 */
export const BlockKitProvider: React.FC<BlockKitProviderProps> = ({
  children,
  theme = 'light',
  useSystemTheme = false,
}) => {
  // Detect system theme if needed
  const [systemTheme, setSystemTheme] = React.useState<'light' | 'dark'>('light');
  
  React.useEffect(() => {
    if (useSystemTheme && typeof window !== 'undefined') {
      // Get initial system preference
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setSystemTheme(darkModeQuery.matches ? 'dark' : 'light');
      
      // Listen for changes
      const listener = (e: MediaQueryListEvent) => {
        setSystemTheme(e.matches ? 'dark' : 'light');
      };
      
      darkModeQuery.addEventListener('change', listener);
      return () => darkModeQuery.removeEventListener('change', listener);
    }
  }, [useSystemTheme]);
  
  // Determine which theme to use
  const effectiveThemeName = useSystemTheme ? systemTheme : (typeof theme === 'string' ? theme : undefined);
  
  // Use the built-in HeroUI themes
  const heroTheme = typeof theme !== 'string' 
    ? theme 
    : { type: effectiveThemeName || 'light' };
  
  return (
    <HeroUIProvider theme={heroTheme}>
      {children}
    </HeroUIProvider>
  );
};

/**
 * Hook for accessing the current theme
 */
export function useTheme() {
  return useHeroTheme();
} 
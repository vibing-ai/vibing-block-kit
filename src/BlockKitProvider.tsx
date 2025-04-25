import React from 'react';
import { HeroUIProvider } from '@heroui/react';

// Define a more specific type for theme objects
export type ThemeObject = Record<string, string | number | boolean | ThemeObject>;

export interface BlockKitProviderProps {
  /**
   * Children to render
   */
  children: React.ReactNode;
  
  /**
   * Theme to use - can be 'light', 'dark', or a custom HeroUI theme
   */
  theme?: 'light' | 'dark' | ThemeObject;
  
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
  
  return (
    <HeroUIProvider>
      <div data-theme={effectiveThemeName}>
        {children}
      </div>
    </HeroUIProvider>
  );
};

/**
 * Hook for accessing the current theme
 */
export function useTheme() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  
  React.useEffect(() => {
    // Get current theme from data-theme attribute on body
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);
  
  return { theme, setTheme };
} 
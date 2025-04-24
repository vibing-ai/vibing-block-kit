import React from 'react';
import { HeroUIProvider, Theme } from '@heroui/react';
import { blockKitLightTheme, blockKitDarkTheme, getThemeByName } from './utils/theme/heroTheme';
import { lightTheme, darkTheme, BlockTheme } from './utils/theme/blockTheme';
import { BlockThemeContext } from './utils/theme/useBlockTheme';

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
   * Optional BlockTheme for backward compatibility
   */
  blockTheme?: BlockTheme;
  
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
  blockTheme,
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
  
  // Get the HeroUI theme
  const heroTheme = typeof theme !== 'string' ? theme : getThemeByName(effectiveThemeName);
  
  // Determine BlockTheme for backward compatibility
  const effectiveBlockTheme = blockTheme || (effectiveThemeName === 'dark' ? darkTheme : lightTheme);
  
  return (
    <HeroUIProvider theme={heroTheme}>
      <BlockThemeContext.Provider value={effectiveBlockTheme}>
        {children}
      </BlockThemeContext.Provider>
    </HeroUIProvider>
  );
}; 
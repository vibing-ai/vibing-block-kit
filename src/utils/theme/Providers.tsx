import React from 'react';
import { HeroUIProvider, Theme } from '@heroui/react';
import { useTheme } from '../../../src/BlockKitProvider';
import { BlockThemeContext } from './useBlockTheme';
import { lightTheme } from './blockTheme';

/**
 * @deprecated Use BlockKitProvider from root instead
 */
export const useTheme = () => {
  console.warn('useTheme from utils/theme/Providers is deprecated. Use useTheme from BlockKitProvider instead.');
  return useTheme();
};

// Theme provider component
interface ProvidersProps {
  children: React.ReactNode;
  theme?: Theme | 'light' | 'dark';
}

/**
 * @deprecated Use BlockKitProvider from root instead
 */
export const Providers: React.FC<ProvidersProps> = ({ 
  children, 
  theme = 'light'
}) => {
  console.warn('Providers from utils/theme is deprecated. Use BlockKitProvider instead.');
  
  // Determine the HeroUI theme to use
  const heroTheme = typeof theme === 'string' 
    ? { type: theme }
    : theme;

  return (
    <HeroUIProvider theme={heroTheme}>
      <BlockThemeContext.Provider value={lightTheme}>
        {children}
      </BlockThemeContext.Provider>
    </HeroUIProvider>
  );
}; 
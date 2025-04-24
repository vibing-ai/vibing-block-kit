import React, { createContext, useContext } from 'react';
import { HeroUIProvider, Theme } from '@heroui/react';
import { BlockTheme, lightTheme } from './blockTheme';
import { blockKitLightTheme, blockKitDarkTheme, getThemeByName } from './heroTheme';

// Create theme context for backward compatibility
const BlockThemeContext = createContext<BlockTheme>(lightTheme);

// Hook to use theme (for backward compatibility)
export const useTheme = () => useContext(BlockThemeContext);

// Theme provider component
interface ProvidersProps {
  children: React.ReactNode;
  theme?: Theme | 'light' | 'dark';
  blockTheme?: BlockTheme;
}

export const Providers: React.FC<ProvidersProps> = ({ 
  children, 
  theme = 'light',
  blockTheme = lightTheme
}) => {
  // Determine the HeroUI theme to use
  const heroTheme = typeof theme === 'string' 
    ? getThemeByName(theme)
    : theme;

  return (
    <HeroUIProvider theme={heroTheme}>
      <BlockThemeContext.Provider value={blockTheme}>
        {children}
      </BlockThemeContext.Provider>
    </HeroUIProvider>
  );
}; 
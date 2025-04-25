import { useState, useEffect } from 'react';
import { BlockTheme, lightTheme, darkTheme } from './blockTheme';

/**
 * @deprecated Use useTheme from '@vibing-ai/block-kit' instead
 */
export function useBlockTheme(): BlockTheme {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    // Get current theme from data-theme attribute
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
    if (currentTheme) {
      setTheme(currentTheme);
    }
    
    // Set up an observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          const newTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
          setTheme(newTheme || 'light');
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return theme === 'dark' ? darkTheme : lightTheme;
}

/**
 * @deprecated Use useTheme from '@vibing-ai/block-kit' instead
 */
export function useCompatibleTheme() {
  const theme = useBlockTheme();
  const isDarkMode = theme === darkTheme;
  
  return {
    blockTheme: theme,
    isDarkMode
  };
}

/**
 * Options for the useThemeDetector hook
 */
export interface UseThemeDetectorOptions {
  /**
   * Default theme to use if system preference is not available
   */
  defaultTheme?: 'light' | 'dark';
}

/**
 * Hook to get current theme (light or dark)
 */
export function useThemeDetector(options: UseThemeDetectorOptions = {}) {
  const { defaultTheme = 'light' } = options;
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(defaultTheme);
  
  useEffect(() => {
    // Check if window is available (for SSR)
    if (typeof window === 'undefined') return;
    
    // Get initial system preference
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(darkModeQuery.matches ? 'dark' : 'light');
    
    // Listen for changes
    const listener = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    darkModeQuery.addEventListener('change', listener);
    return () => darkModeQuery.removeEventListener('change', listener);
  }, [defaultTheme]);
  
  return systemTheme;
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
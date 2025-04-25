import { useState } from 'react';
import { BlockKitProvider, createCustomTheme } from '@vibing-ai/block-kit';
import Home from './index';

// Example of a custom theme
const customTheme = createCustomTheme({
  type: 'light',
  // Example of customizing the primary color
  primary: '#3498db',
  // Example of customizing the secondary color
  secondary: '#2ecc71',
});

export default function App() {
  // You can use state to manage theme changes in your app
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'custom' | 'system'>('light');
  
  // Handle theme toggling
  const toggleTheme = () => {
    setThemeMode(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'custom';
      if (prev === 'custom') return 'system';
      return 'light';
    });
  };
  
  // Determine which theme configuration to use
  const getThemeConfig = () => {
    switch (themeMode) {
      case 'light':
      case 'dark':
        return { theme: themeMode, useSystemTheme: false };
      case 'custom':
        return { theme: customTheme, useSystemTheme: false };
      case 'system':
        return { useSystemTheme: true };
    }
  };

  const themeConfig = getThemeConfig();
  
  return (
    <BlockKitProvider 
      theme={themeConfig.theme} 
      useSystemTheme={themeConfig.useSystemTheme}
    >
      <Home />
      <button 
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        Current: {themeMode} (Click to change)
      </button>
    </BlockKitProvider>
  );
} 
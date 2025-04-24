import React from 'react';
import { BlockKitProvider, blockKitLightTheme, blockKitDarkTheme } from '@vibing/block-kit';
import Home from './index';

// Example of a custom theme
import { createCustomTheme } from '@vibing/block-kit';

const customTheme = createCustomTheme({
  type: 'light',
  // Example of customizing the primary color
  primary: '#3498db',
  // Example of customizing the secondary color
  secondary: '#2ecc71',
});

export default function App() {
  // You can use state to manage theme changes in your app
  const [theme, setTheme] = React.useState('light');
  
  // Handle theme toggling
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    // Option 1: Use basic light/dark theme
    <BlockKitProvider theme={theme as 'light' | 'dark'}>
      <Home />
      <button onClick={toggleTheme}>Toggle Theme</button>
    </BlockKitProvider>
    
    // Option 2: Use system theme preference
    // <BlockKitProvider useSystemTheme>
    //   <Home />
    // </BlockKitProvider>
    
    // Option 3: Use custom theme
    // <BlockKitProvider theme={customTheme}>
    //   <Home />
    // </BlockKitProvider>
  );
} 
import React, { useEffect, useState } from 'react';
import { useGlobals } from '@storybook/preview-api';

export const ThemeToggleDecorator = (StoryFn: Function) => {
  const [{ theme }, updateGlobals] = useGlobals();
  const [currentTheme, setCurrentTheme] = useState(theme || 'light');
  
  // Update theme when global changes
  useEffect(() => {
    if (theme && theme !== currentTheme) {
      setCurrentTheme(theme);
    }
  }, [theme, currentTheme]);

  // Effect to apply theme class to body
  useEffect(() => {
    if (currentTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [currentTheme]);

  return (
    <div className={`${currentTheme} w-full p-4`}>
      <StoryFn />
    </div>
  );
};

export const withThemeProvider = (Story: any) => (
  <ThemeToggleDecorator>
    {() => <Story />}
  </ThemeToggleDecorator>
); 
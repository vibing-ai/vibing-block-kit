import React from 'react';
import { HeroUIProvider } from '@heroui/react';

export const Provider = ({ children, theme }: { children: React.ReactNode; theme: 'light' | 'dark' }) => {
  return (
    <HeroUIProvider>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </div>
    </HeroUIProvider>
  );
}; 
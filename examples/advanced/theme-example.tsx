import React, { useState, useEffect } from 'react';
import { 
  BlockKitProvider, 
  Button, 
  TextBlock, 
  BlockContainer, 
  CodeBlock,
  createCustomTheme,
  createBrandTheme,
  useCompatibleTheme
} from '@vibing/block-kit';

// Create a custom brand theme
const brandTheme = createBrandTheme({
  name: 'acme-corp',
  type: 'light',
  primaryColor: '#6366f1', // indigo
  secondaryColor: '#ec4899', // pink
  accentColor: '#f59e0b' // amber
});

// Sample code to display
const themeUsageCode = `// Create a custom theme
import { createCustomTheme } from '@vibing/block-kit';

const myTheme = createCustomTheme({
  type: 'light',
  primary: '#3498db',
  secondary: '#2ecc71',
  accent: '#f39c12'
});

// Use it in your app
<BlockKitProvider theme={myTheme}>
  <App />
</BlockKitProvider>`;

export default function ThemeExample() {
  // State for theme selection
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'brand'>('light');
  const [useSystem, setUseSystem] = useState(false);
  
  // Demo component that uses the theme
  const ThemeDemo = () => {
    const { heroTheme, isDarkMode } = useCompatibleTheme();
    
    return (
      <div className="p-4 rounded-lg border bg-card shadow-sm">
        <h3 className="text-lg font-medium mb-2">Current Theme Details</h3>
        <pre className="p-3 bg-muted rounded text-sm overflow-auto">
          {JSON.stringify({ 
            type: heroTheme.type,
            isDarkMode,
            primary: heroTheme.colors?.primary,
          }, null, 2)}
        </pre>
      </div>
    );
  };

  // Handle theme switching
  useEffect(() => {
    if (useSystem) {
      setCurrentTheme('light'); // This will be ignored when useSystemTheme is true
    }
  }, [useSystem]);
  
  // Get theme object based on selection
  const getSelectedTheme = () => {
    if (currentTheme === 'brand') return brandTheme;
    return currentTheme;
  };

  return (
    <BlockKitProvider 
      theme={getSelectedTheme()} 
      useSystemTheme={useSystem}
    >
      <div className="min-h-screen bg-background text-foreground p-8">
        <BlockContainer id="theme-example" spacing="lg">
          <TextBlock 
            id="title"
            heading="HeroUI Theme Integration"
            content="This example demonstrates how to use the HeroUI theming system with Block Kit."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <BlockContainer id="theme-controls" spacing="md" className="p-4 bg-card rounded-lg border shadow-sm">
                <TextBlock
                  id="controls-title"
                  heading="Theme Controls"
                  content="Try different theme options:"
                />
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="use-system"
                      checked={useSystem}
                      onChange={() => setUseSystem(!useSystem)}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="use-system">Use System Theme</label>
                  </div>
                  
                  <div className={`space-y-2 ${useSystem ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div>
                      <label className="text-sm font-medium">Select Theme:</label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={currentTheme === 'light' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentTheme('light')}
                      >
                        Light
                      </Button>
                      <Button 
                        variant={currentTheme === 'dark' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentTheme('dark')}
                      >
                        Dark
                      </Button>
                      <Button 
                        variant={currentTheme === 'brand' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentTheme('brand')}
                      >
                        Brand Theme
                      </Button>
                    </div>
                  </div>
                </div>
              </BlockContainer>
              
              <div className="mt-6">
                <ThemeDemo />
              </div>
            </div>
            
            <div>
              <BlockContainer id="theme-docs" spacing="md" className="p-4 bg-card rounded-lg border shadow-sm">
                <TextBlock
                  id="docs-title"
                  heading="Theme Documentation"
                  content="HeroUI provides a flexible theming system that integrates with Block Kit. Here's how to create and use custom themes:"
                />
                
                <CodeBlock
                  id="theme-code"
                  language="typescript"
                  code={themeUsageCode}
                />
              </BlockContainer>
            </div>
          </div>
          
          <BlockContainer id="components-demo" spacing="md" className="p-4 bg-card rounded-lg border shadow-sm">
            <TextBlock
              id="components-title"
              heading="Themed Components"
              content="All Block Kit components automatically use the current theme:"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="default">Default Button</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </BlockContainer>
        </BlockContainer>
      </div>
    </BlockKitProvider>
  );
} 
import React, { useState } from 'react';
import { 
  BlockKitProvider,
  TextBlock,
  BlockContainer,
  Surface,
  Button,
  VisualBlock
} from '@vibing-ai/block-kit';

export default function DarkModeExample() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <BlockKitProvider theme={isDarkMode ? 'dark' : 'light'}>
      <Surface className="min-h-screen transition-colors duration-300">
        <BlockContainer 
          id="header" 
          className="w-full p-6 border-b flex justify-between items-center"
        >
          <TextBlock
            id="title"
            heading="Dark Mode Example"
            headingClassName="text-2xl font-bold"
          />
          
          <Button 
            onClick={toggleDarkMode} 
            variant="outline"
            className="rounded-full px-4"
          >
            {isDarkMode ? '🔆 Light Mode' : '🌙 Dark Mode'}
          </Button>
        </BlockContainer>

        <BlockContainer id="content" className="p-6 max-w-4xl mx-auto" spacing="xl">
          <TextBlock
            id="intro"
            heading="Theme Switching with Block Kit"
            content="This example demonstrates how to implement a dark mode toggle using Block Kit's theme system. The theme can be controlled programmatically, allowing for user preference settings."
            headingClassName="text-3xl font-bold"
            contentClassName="text-lg"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BlockContainer 
              id="feature-card" 
              className="p-6 rounded-lg border shadow-sm bg-card"
              spacing="md"
            >
              <VisualBlock
                id="theme-icon"
                src={isDarkMode 
                  ? "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80"
                  : "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80"
                }
                alt={isDarkMode ? "Night sky" : "Sunny day"}
                width={400}
                height={300}
                className="rounded-lg w-full object-cover h-48"
              />
              <TextBlock
                id="card-text"
                heading={isDarkMode ? "Dark Theme Active" : "Light Theme Active"}
                content="The current theme affects all Block Kit components automatically, providing consistent styling across your application."
              />
            </BlockContainer>

            <BlockContainer 
              id="code-sample" 
              className="p-6 rounded-lg border bg-muted"
              spacing="md"
            >
              <TextBlock
                id="code-heading"
                heading="Implementation"
                content="Here's how to implement theme switching:"
              />
              <div className="font-mono text-sm p-4 rounded bg-card overflow-x-auto">
                <pre>{`
// Theme provider setup
<BlockKitProvider theme={isDarkMode ? 'dark' : 'light'}>
  {/* Your components */}
</BlockKitProvider>

// Toggle function
const toggleDarkMode = () => {
  setIsDarkMode(!isDarkMode);
};`}</pre>
              </div>
            </BlockContainer>
          </div>

          <BlockContainer 
            id="demo-controls" 
            className="p-6 rounded-lg border bg-card text-center"
            spacing="md"
          >
            <TextBlock
              id="demo-text"
              heading="Try It Yourself"
              content="Toggle between light and dark mode to see how the UI adapts."
              headingClassName="text-xl font-semibold"
            />
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={() => setIsDarkMode(false)} variant={!isDarkMode ? "default" : "outline"}>
                Light Mode
              </Button>
              <Button onClick={() => setIsDarkMode(true)} variant={isDarkMode ? "default" : "outline"}>
                Dark Mode
              </Button>
              <Button onClick={toggleDarkMode} variant="secondary">
                Toggle Theme
              </Button>
            </div>
          </BlockContainer>

          <TextBlock
            id="note"
            content={`Current theme: ${isDarkMode ? 'Dark' : 'Light'} Mode. Block Kit components automatically adjust to the current theme.`}
            contentClassName="text-sm text-muted-foreground text-center italic"
          />
        </BlockContainer>
      </Surface>
    </BlockKitProvider>
  );
} 
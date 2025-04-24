# Vibing Block Kit

Composable React + Tailwind component library for building Vibing apps, agents and plugins. Includes fully-typed props, dark-mode tokens and a Storybook playground.

## Installation

```bash
npm install @vibing/block-kit
```

## Usage

```jsx
import { TextBlock, AICompletionBlock, BlockKitProvider } from '@vibing/block-kit';

function MyApp() {
  return (
    <BlockKitProvider theme="light">
      <div>
        <TextBlock 
          id="intro-text"
          content="Welcome to Vibing Block Kit"
        />
        
        <AICompletionBlock
          id="ai-completion"
          initialPrompt="Tell me about Vibing"
        />
      </div>
    </BlockKitProvider>
  );
}
```

## HeroUI Integration

Block Kit is built on top of HeroUI components, providing a consistent design system. There are several ways to use and customize the theme:

### Basic Usage

Wrap your application with the `BlockKitProvider`:

```jsx
import { BlockKitProvider } from '@vibing/block-kit';

function App() {
  return (
    <BlockKitProvider theme="light">
      <YourApp />
    </BlockKitProvider>
  );
}
```

### Theme Options

```jsx
// Light/dark theme
<BlockKitProvider theme="light" />
<BlockKitProvider theme="dark" />

// System theme preference
<BlockKitProvider useSystemTheme />

// Custom theme
import { createCustomTheme } from '@vibing/block-kit';

const customTheme = createCustomTheme({
  type: 'light',
  primary: '#3498db',
  secondary: '#2ecc71',
});

<BlockKitProvider theme={customTheme} />
```

### Theme Switching

```jsx
import { useState } from 'react';
import { BlockKitProvider } from '@vibing/block-kit';

function App() {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  };
  
  return (
    <BlockKitProvider theme={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <YourApp />
    </BlockKitProvider>
  );
}
```

## Documentation

For full documentation, visit the [Storybook](https://vibing.github.io/vibing-block-kit).

## Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Build the library
npm run build
```

## License

MIT 
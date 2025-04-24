# Vibing Block Kit

[![npm version](https://img.shields.io/npm/v/@vibing-ai/block-kit.svg)](https://www.npmjs.com/package/@vibing-ai/block-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Composable React + Tailwind component library for building Vibing apps, agents and plugins. Includes fully-typed props, dark-mode tokens and a Storybook playground.

## Features

- 🧩 **Composable Components**: A comprehensive set of UI components designed to work seamlessly together
- 🎨 **Theme Support**: Built-in light and dark themes with customization options
- 📱 **Responsive Design**: Components work across desktop and mobile devices
- 🔍 **Accessibility**: WCAG 2.1 AA compliant components
- 🧠 **AI-Ready**: Special components designed for AI interactions
- 📦 **Tree-Shakeable**: Only import what you need
- 🔒 **Type-Safe**: Fully typed props for improved developer experience

## Installation

```bash
npm install @vibing-ai/block-kit
```

Or using yarn:

```bash
yarn add @vibing-ai/block-kit
```

## Quick Start

```jsx
import { TextBlock, AICompletionBlock, BlockKitProvider } from '@vibing-ai/block-kit';

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

## Core Components

Vibing Block Kit includes a variety of components:

- **Text Components**: `TextBlock`, `HeadingBlock`, `CodeBlock`
- **Input Components**: `InputBlock`, `SelectBlock`, `CheckboxBlock`
- **Layout Components**: `CardBlock`, `GridBlock`, `ContainerBlock`
- **AI Components**: `AICompletionBlock`, `AIImageBlock`, `AIFormBlock`
- **Interactive Components**: `ButtonBlock`, `ToggleBlock`, `SliderBlock`

## HeroUI Integration

Block Kit is built on top of HeroUI components, providing a consistent design system. There are several ways to use and customize the theme:

### Basic Usage

Wrap your application with the `BlockKitProvider`:

```jsx
import { BlockKitProvider } from '@vibing-ai/block-kit';

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
import { createCustomTheme } from '@vibing-ai/block-kit';

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
import { BlockKitProvider } from '@vibing-ai/block-kit';

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

# Run tests
npm test
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and suggest improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
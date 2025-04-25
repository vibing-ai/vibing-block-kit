# Vibing Block Kit

[![npm version](https://img.shields.io/npm/v/@vibing-ai/block-kit.svg)](https://www.npmjs.com/package/@vibing-ai/block-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Storybook](https://img.shields.io/badge/Storybook-deployed-ff4785)](https://vibing-ai.github.io/vibing-block-kit/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue)](https://www.typescriptlang.org/)

<p align="center">
  <strong>Composable React + Tailwind component library for building Vibing apps, agents and plugins. Includes fully-typed props, dark-mode tokens and a Storybook playground.</strong>
</p>

## Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage Examples](#usage-examples)
- [Component Categories](#component-categories)
- [Theming](#theming)
- [Documentation](#documentation)
- [Development](#development)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [License](#license)

## Features

- 🧩 **Composable Components**: Build interfaces by combining self-contained blocks
- 🎨 **Theme Support**: Built-in light and dark themes with customization options
- 📱 **Responsive Design**: All components adapt seamlessly across devices
- 🔍 **Accessibility**: WCAG 2.1 AA compliant components with keyboard navigation
- 🧠 **AI-Ready**: Specialized components for AI interactions and conversations
- 📦 **Tree-Shakeable**: Optimized bundle size - only import what you need
- 🔒 **Type-Safe**: Fully typed props for improved developer experience
- 📚 **Extensive Documentation**: Complete Storybook with examples and API references
- 🧪 **Tested**: Comprehensive test suite for reliability

## Installation

```bash
# Using npm
npm install @vibing-ai/block-kit

# Using yarn
yarn add @vibing-ai/block-kit

# Using pnpm
pnpm add @vibing-ai/block-kit
```

## Quick Start

Wrap your application with the `BlockKitProvider` and start using components:

```jsx
import { 
  BlockKitProvider, 
  TextBlock, 
  ButtonBlock, 
  BlockContainer 
} from '@vibing-ai/block-kit';

function App() {
  return (
    <BlockKitProvider theme="light">
      <BlockContainer>
        <TextBlock 
          id="welcome-text"
          content="Welcome to Vibing Block Kit"
        />
        
        <ButtonBlock
          id="start-button"
          label="Get Started"
          onClick={() => console.log('Button clicked!')}
        />
      </BlockContainer>
    </BlockKitProvider>
  );
}

export default App;
```

## Usage Examples

### AI Chat Interface

```jsx
import { 
  BlockKitProvider, 
  AIChatBlock, 
  BlockContainer 
} from '@vibing-ai/block-kit';

function AIChat() {
  const handleSend = async (message) => {
    // Call your AI service here
    return "This is a response from the AI";
  };

  return (
    <BlockKitProvider theme="dark">
      <BlockContainer>
        <AIChatBlock
          id="chat-interface"
          initialMessages={[
            { role: 'system', content: 'Welcome! How can I help you today?' }
          ]}
          onSendMessage={handleSend}
        />
      </BlockContainer>
    </BlockKitProvider>
  );
}
```

### Interactive Dashboard

```jsx
import { 
  BlockKitProvider, 
  TextBlock,
  ChartBlock,
  TableBlock,
  BlockGroup,
  WidgetGrid
} from '@vibing-ai/block-kit';

function Dashboard() {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 3, 5, 2]
    }]
  };

  const tableData = {
    headers: ['ID', 'Name', 'Value'],
    rows: [
      ['1', 'Item A', '$100'],
      ['2', 'Item B', '$200'],
      ['3', 'Item C', '$300']
    ]
  };

  return (
    <BlockKitProvider theme="light">
      <TextBlock id="dashboard-title" content="Sales Dashboard" variant="heading" />
      
      <WidgetGrid columns={2}>
        <ChartBlock
          id="sales-chart"
          title="Monthly Sales"
          data={chartData}
          type="bar"
        />
        
        <TableBlock
          id="sales-table"
          title="Top Products"
          data={tableData}
        />
      </WidgetGrid>
    </BlockKitProvider>
  );
}
```

## Component Categories

Vibing Block Kit organizes components into intuitive categories:

### Content Blocks
- `TextBlock`: Display rich text content
- `MarkdownBlock`: Render markdown content
- `CodeBlock`: Display formatted code with syntax highlighting
- `ImageBlock`: Display images with optional captions

### Input Blocks
- `InputBlock`: Text input fields with validation
- `FormBlock`: Complete form with multiple field types
- `SliderBlock`: Range selection control
- `CheckboxBlock`: Binary selection controls

### Data Visualization
- `TableBlock`: Display tabular data
- `ChartBlock`: Visualize data with charts
- `DataGridBlock`: Advanced data grid with sorting and filtering

### AI Components
- `AIChatBlock`: Interactive AI chat interface
- `AICompletionBlock`: Text completion interface
- `AIControlBlock`: Control panel for AI settings

### Layout & Composition
- `BlockContainer`: Wrapper for blocks with consistent styling
- `BlockGroup`: Group related blocks together
- `BoardView`: Kanban-style board layout
- `DocumentView`: Document-oriented layout

### Surfaces
- `BlockModal`: Modal dialog for focused interactions
- `ContextPanel`: Side panel for contextual information
- `ToolPalette`: Floating toolbar
- `Widget`: Self-contained component for dashboards

## Theming

Block Kit provides several ways to customize the appearance:

### Basic Theme Selection

```jsx
// Light theme
<BlockKitProvider theme="light" />

// Dark theme
<BlockKitProvider theme="dark" />

// Use system preference
<BlockKitProvider useSystemTheme />
```

### Custom Theme

```jsx
import { createCustomTheme, BlockKitProvider } from '@vibing-ai/block-kit';

const customTheme = createCustomTheme({
  base: 'light', // or 'dark'
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#9b59b6',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#e74c3c',
    background: '#f5f5f5',
    text: '#333333',
  },
  borderRadius: '8px',
  fontFamily: '"Inter", sans-serif',
});

function App() {
  return (
    <BlockKitProvider theme={customTheme}>
      <YourApp />
    </BlockKitProvider>
  );
}
```

### Theme Toggle

```jsx
import { useState } from 'react';
import { BlockKitProvider, ButtonBlock } from '@vibing-ai/block-kit';

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <BlockKitProvider theme={theme}>
      <ButtonBlock
        id="theme-toggle"
        label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      <YourApp />
    </BlockKitProvider>
  );
}
```

## Documentation

For complete documentation and interactive examples:

- [Storybook](https://vibing-ai.github.io/vibing-block-kit/): Browse components and try them out
- [API Reference](https://vibing-ai.github.io/vibing-block-kit/docs): Detailed API documentation
- [Examples](https://github.com/vibing-ai/vibing-block-kit/tree/main/examples): Sample code for common use cases

## Development

```bash
# Clone the repository
git clone https://github.com/vibing-ai/vibing-block-kit.git
cd vibing-block-kit

# Install dependencies
npm install

# Start Storybook development environment
npm run storybook

# Run tests
npm test

# Build the library
npm run build
```

## Contributing

We welcome contributions from the community! Whether it's bug fixes, feature enhancements, or documentation improvements, please check our [CONTRIBUTING.md](CONTRIBUTING.md) guide for:

- How to set up your development environment
- Coding standards and guidelines
- Pull request process
- Testing requirements

## Roadmap

Upcoming features and improvements:

- [ ] Advanced data visualization components
- [ ] Animation and transition utilities
- [ ] Customizable block templates
- [ ] Mobile-specific optimizations
- [ ] Server-side rendering improvements
- [ ] Additional AI integration components

## FAQ

**Q: Does Vibing Block Kit work with Next.js?**  
A: Yes, Block Kit is fully compatible with Next.js projects, including both the Pages and App Router.

**Q: Can I use Block Kit with other UI libraries like MUI or Chakra UI?**  
A: Yes, Block Kit components can be used alongside other UI libraries. We recommend wrapping Block Kit components within their own `BlockKitProvider` to avoid style conflicts.

**Q: How do I contribute a new component?**  
A: See our [CONTRIBUTING.md](CONTRIBUTING.md) guide, which includes detailed instructions for component development and submission.

**Q: Is there a size limit concern for production apps?**  
A: Block Kit is fully tree-shakeable, meaning unused components won't be included in your final bundle, keeping the size optimized.

## License

Vibing Block Kit is licensed under the [MIT License](LICENSE) - see the LICENSE file for details. 
# @block-kit/ui

Theme helpers and UI providers for the Block Kit component ecosystem.

## Purpose

This package contains theme providers and UI utilities that help with the integration of Block Kit components into applications. It provides:

- Provider components that wrap your application to enable theming
- Theme toggle functionality for light/dark mode
- Utility components for storybook and testing

## Installation

```bash
# npm
npm install @block-kit/ui

# pnpm
pnpm add @block-kit/ui

# yarn
yarn add @block-kit/ui
```

## Usage

```tsx
import React from 'react';
import { Providers } from '@block-kit/ui';
import { Button } from '@block-kit/core';

function App() {
  return (
    <Providers>
      <div>
        <h1>My App</h1>
        <Button>Click Me</Button>
      </div>
    </Providers>
  );
}
```

## Peer Dependencies

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

## License

MIT

## Development

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Build the package
pnpm build

# Run linting
pnpm lint
```

## Architecture

This package serves as the foundation for the Block Kit ecosystem, providing:

1. **Providers** - React context providers that wrap HeroUI and AssistantUI
2. **Styling** - Tailwind CSS configuration and global styles
3. **Theme** - Color system and typography settings 
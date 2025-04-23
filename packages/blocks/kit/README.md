# @block-kit/blocks

Core primitive UI components for the Block Kit design system.

## Purpose

This package contains the foundational UI components with no dependencies on higher-level libraries like `assistant-ui` or `hero-ui`. These primitives serve as building blocks for more complex components and applications.

## Installation

```bash
# npm
npm install @block-kit/core

# pnpm
pnpm add @block-kit/core

# yarn
yarn add @block-kit/core
```

## Peer Dependencies

This package requires the following peer dependencies:

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

## Usage

### Button Component

```tsx
import React from 'react';
import { Button } from '@block-kit/core';

function MyComponent() {
  return (
    <Button 
      variant="primary" 
      size="md" 
      onClick={() => console.log('Button clicked!')}
    >
      Click Me
    </Button>
  );
}
```

Available variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`  
Available sizes: `default`, `sm`, `lg`

## License

MIT 
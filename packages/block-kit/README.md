# @block-kit/core

Opinionated composite UI components for Block Kit, building on the primitive components.

## Purpose

This package contains higher-level, opinionated components that are built using the primitive components from `@block-kit/blocks`. These components may have dependencies on assistant-ui and provide more complete UI solutions for common patterns.

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

```tsx
import React from 'react';
import { Button } from '@block-kit/core';
import { Card } from '@block-kit/core';

function MyComponent() {
  return (
    <Card>
      <Card.Header>Example Card</Card.Header>
      <Card.Body>
        <p>This is an example of a composite component</p>
        <Button variant="primary">Action</Button>
      </Card.Body>
    </Card>
  );
}
```

## Relationship to Other Packages

- **@block-kit/blocks**: This package builds upon the primitive components from @block-kit/blocks
- **assistant-ui**: Some components in this package may have dependencies on assistant-ui for specialized functionality

## License

MIT 
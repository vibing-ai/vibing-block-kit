# Design Tokens

This directory contains the design tokens for the Block Kit component library, using [Style Dictionary](https://amzn.github.io/style-dictionary/) for token management and transformation.

## Overview

Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use these values throughout our component library to maintain a consistent visual language.

## Directory Structure

- `colors/`: Color tokens for the design system
- `spacing/`: Spacing scale tokens
- `config.json`: Style Dictionary configuration
- `dist/`: Generated token files (CSS variables, JS)

## Usage

### Building Tokens

To build the tokens into usable formats (CSS variables, JavaScript):

```bash
npm run tokens:build
```

### Adding New Tokens

1. Create or edit JSON files in the appropriate subdirectory following the Style Dictionary format
2. Run `npm run tokens:build` to generate the updated token files

### Consuming Tokens

In CSS:
```css
.my-element {
  color: var(--bk-color-primary);
  padding: var(--bk-spacing-md);
}
```

In JavaScript:
```js
import tokens from '../tokens/dist/tokens.js';
console.log(tokens.color.primary); // #1a73e8
```

In Tailwind (via the tailwind.config.ts):
```js
theme: {
  extend: {
    colors: {
      primary: 'var(--bk-color-primary)'
    }
  }
}
```

## Token Structure

Style Dictionary uses a structured format for tokens. For example:

```json
{
  "color": {
    "primary": { "value": "#1a73e8" },
    "text": { 
      "primary": { "value": "#202124" },
      "secondary": { "value": "#5f6368" }
    }
  }
}
```

## Contributing

When adding or modifying tokens, ensure they follow the established naming conventions and hierarchies. All token changes should be documented in the PR description. 
# Block Kit Examples

This directory contains examples showcasing how to use the Block Kit component library.

## Setup

The examples directory has its own `tsconfig.json` which extends the root configuration. Make sure to run the TypeScript compiler from the root directory for proper compilation:

```bash
# From the root directory
npm run dev
```

## Common Issues and Solutions

### TypeScript Errors for JSX

If you're seeing TypeScript errors about JSX, ensure that:

1. You have the `tsconfig.json` in the examples directory (already provided)
2. You're using the correct import paths from `@vibing-ai/block-kit`

### Component Import Issues

If you're seeing errors about missing components, check the following:

1. Ensure all components are properly imported from `@vibing-ai/block-kit`
2. The component names should match the exports from the library 
3. The latest export names are:
   - `BlockKitProvider`
   - `Button`
   - `TextBlock`
   - `BlockContainer`
   - `CodeBlock`
   - `InputBlock`
   - `ActionBlock`
   - `Surface`
   - `VisualBlock`

### Theme Issues

The recommended way to use themes:

```jsx
// For light/dark themes
<BlockKitProvider theme="light">...</BlockKitProvider>
<BlockKitProvider theme="dark">...</BlockKitProvider>

// For system preference
<BlockKitProvider useSystemTheme>...</BlockKitProvider>

// For custom themes
const customTheme = createCustomTheme({
  type: 'light',
  primary: '#3498db',
  secondary: '#2ecc71',
});

<BlockKitProvider theme={customTheme}>...</BlockKitProvider>
```

## Example List

- **Basic Usage**: Simple example of Block Kit components
- **Form**: Form implementation with Block Kit
- **Dark Mode**: Theme switching demonstration
- **Responsive**: Responsive layout examples
- **App**: Demo application with theme switching

## Running Examples

You can run these examples by importing them into your application or by creating a simple wrapper around them. 
# Block Kit Documentation

This package contains the Storybook documentation for Block Kit components.

## Purpose

This is a documentation-only package that:
- Composes Storybook instances from all Block Kit packages
- Provides a unified documentation experience for the entire component library
- Is never published to npm (internal development use only)

## Usage

```bash
# Start Storybook development server
pnpm dev

# Build static Storybook site
pnpm build
```

## Storybook Composition

This package uses Storybook's composition feature to aggregate stories from all the component packages:

- `@block-kit/core` - Primitive components
- `@block-kit/ui` - Theme providers and utilities
- `@block-kit/block-kit` - Composite components

## License

MIT 
# Examples Changelog

## Fixes and Improvements

### Configuration
- Added a dedicated `tsconfig.json` for the examples directory that extends the root config
- Added a Vite configuration (`vite.config.ts`) to serve the examples
- Created entry points for the examples (main.tsx, run-examples.tsx)

### Code Fixes
- Fixed inconsistent package imports (changed `@block-kit/core` to `@vibing-ai/block-kit`)
- Fixed TypeScript errors by adding proper type definitions for messages
- Corrected component usage in app.tsx (fixed multiple JSX providers issue)
- Corrected ActionBlock component usage in responsive.tsx
- Fixed theme-example.tsx:
  - Updated `useCompatibleTheme` to `useTheme` to match current API
  - Fixed component references from `heroTheme` to `theme`
  - Corrected TextBlock props to use `content` and `variant` instead of `title` and `description`
  - Removed HeroUI references and replaced with Block Kit

### Documentation
- Added README.md with usage instructions and common issues
- Added HTML landing page with instructions for running examples
- Created a changelog to track fixes

### Development Scripts
- Added `examples` script to package.json to easily run the examples

### New Features
- Created an example runner interface to browse all examples
- Examples can now be run in a consolidated view

## How to Run Examples

You can now run all examples with:

```bash
npm run examples
```

This will start a development server and open the examples in your browser. 
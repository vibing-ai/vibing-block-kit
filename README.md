# Reality Agent Block Kit

A monorepo for the Reality Agent Block Kit component library.

[![CI](https://github.com/marvelai-org/block-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/marvelai-org/block-kit/actions/workflows/ci.yml)
[![Package Size](https://img.shields.io/badge/package%20size-<150kB-brightgreen)](https://github.com/marvelai-org/block-kit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Project Layers

| Directory | Purpose |
|-----------|---------|
| `apps/` | Applications that consume the Block Kit components |
| `packages/blocks/kit` | Core primitive components (buttons, inputs, etc.) with no dependencies on higher-level libraries |
| `packages/block-kit` | Opinionated composite components that depend on `@block-kit/blocks` and may use `assistant-ui` |
| `packages/ui` | Theme helpers and UI providers for the component ecosystem |
| `tokens/` | Design tokens using Style Dictionary for consistent visual language |

## Quick Start

```bash
# Install dependencies
pnpm i

# Build all packages
turbo run build

# Start Storybook documentation
turbo run storybook
```

## Design Tokens

Block Kit uses a design token system powered by Style Dictionary to ensure consistent theming across all components.

### Updating Design Tokens

1. Edit the token files in the `tokens/` directory
   - Color tokens: `tokens/colors/`
   - Spacing tokens: `tokens/spacing/`

2. Build the tokens:
   ```bash
   npm run tokens:build
   ```

3. The built tokens will be available in:
   - CSS Variables: `tokens/dist/variables.css`
   - JavaScript: `tokens/dist/tokens.js`

## What's inside?

This monorepo uses [pnpm](https://pnpm.io) as a package manager and [Turborepo](https://turbo.build/repo) for builds. It includes the following packages/apps:

### Apps and Packages

- `blocks/kit`: Core component library built with React 18, TypeScript 5, and Tailwind CSS
- `playground/docs`: Storybook documentation app for browsing and testing components
- `shared/tsconfig`: Shared TypeScript configurations
- `shared/eslint-config`: ESLint configurations

### Utilities

This repository has some additional tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Husky](https://typicode.github.io/husky/) for Git hooks
- [Commitlint](https://commitlint.js.org/) for commit message linting
- [Semantic Release](https://semantic-release.gitbook.io/) for automated versioning and releases

## Prerequisites

- Node.js 18+
- pnpm 8+ (install with `npm install -g pnpm`)

## Getting Started

1. Install pnpm if you don't have it already:
   ```
   npm install -g pnpm
   ```

2. Clone the repository:
   ```
   git clone https://github.com/marvelai-org/block-kit.git
   cd block-kit
   ```

3. Install dependencies:
   ```
   pnpm install
   ```

4. Build packages:
   ```
   pnpm build
   ```

5. Start Storybook:
   ```
   pnpm --filter docs dev
   ```

## Development

To develop all apps and packages:

```
pnpm dev
```

### Useful commands

- `pnpm build` - Build all packages and apps
- `pnpm dev` - Develop all packages and apps
- `pnpm lint` - Lint all packages
- `pnpm test` - Test all packages
- `pnpm format` - Format all files with Prettier

## Using Conventional Commits

This repository follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. This helps with semantic versioning and automated releases.

Examples:
- `feat: add new button component` - For new features
- `fix: resolve button focus issue` - For bug fixes
- `docs: update README` - For documentation updates
- `chore: update dependencies` - For maintenance tasks

## Accessibility

This component library follows [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/) standards for accessibility.

## License

MIT 

## Quality & Testing

### Running Tests Locally

```bash
# Run unit tests
yarn test

# Run tests in watch mode
cd packages/blocks/kit && yarn test:watch

# Run E2E tests
yarn e2e

# Run E2E tests in UI mode
cd apps/web && yarn playwright test --ui
```

### Design Tokens

Block Kit uses a design token system powered by Style Dictionary to ensure consistent theming across all components.

#### Updating Design Tokens

1. Edit the token files in the `tokens/` directory
   - Color tokens: `tokens/colors/`
   - Spacing tokens: `tokens/spacing/`

2. Build the tokens:
   ```bash
   yarn tokens:build
   ```

3. The built tokens will be available in:
   - CSS Variables: `tokens/dist/variables.css`
   - JavaScript: `tokens/dist/tokens.js`

#### Adding New Tokens

1. Create or edit JSON files in the `tokens/` directory following the Style Dictionary format
2. Reference tokens in the tailwind config using CSS variables with the `--bk-` prefix
3. Build tokens using `yarn tokens:build`
4. Update relevant Tailwind config files to use the new tokens

### Chromatic Visual Testing

Block Kit uses Chromatic for visual regression testing through Storybook.

#### Approving Chromatic Changes

1. When you open a PR, Chromatic will run automatically
2. Visit the Chromatic link in the PR comment
3. Review visual changes
4. Approve or reject changes based on whether they're intentional

## CI/CD

Block Kit uses GitHub Actions for CI/CD:

- **CI Workflow**: Runs build, lint, tests, and E2E tests
- **Chromatic Workflow**: Publishes Storybook to Chromatic for visual regression testing 
# Reality Agent Block Kit

A monorepo for the Reality Agent Block Kit component library.

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
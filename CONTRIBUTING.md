# Contributing to Vibing Block Kit

Thank you for considering contributing to Vibing Block Kit! This document outlines the process for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Install dependencies** with `npm install`
4. **Create a branch** for your changes

## Development Workflow

```bash
# Start Storybook for development
npm run storybook

# Run tests
npm test

# Run linting
npm run lint

# Build the library
npm run build
```

### Storybook

We use Storybook for component development and testing. Each component should have a corresponding story that demonstrates its usage and variants.

```jsx
// Example story structure
import { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  title: 'Components/MyComponent',
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

## Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass** by running `npm test`
4. **Update the README.md** with details of changes if applicable
5. **Submit your pull request** with a clear description of the changes

## Coding Standards

- Follow the existing code style
- Use TypeScript for type safety
- Component props should be defined as interfaces
- All components should be responsive and accessible
- Maintain backward compatibility when possible

### Naming Conventions

- Component files: `PascalCase.tsx`
- Utility files: `camelCase.ts`
- Test files: `ComponentName.test.tsx`
- Story files: `ComponentName.stories.tsx`

## Component Structure

```tsx
import React from 'react';
import { cn } from '../utils/cn';

export interface ButtonProps {
  /** Description of the prop */
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(
        'button-base',
        `button-${variant}`,
        `button-${size}`,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

## Reporting Bugs

When reporting bugs, please include:

1. A clear and descriptive title
2. Steps to reproduce the issue
3. Expected behavior
4. Actual behavior
5. Screenshots if applicable
6. Version information:
   - Browser
   - Node.js version
   - npm/yarn version
   - Block Kit version

## Feature Requests

Feature requests are welcome! Please provide:

1. A clear description of the feature
2. The problem it solves
3. Examples of how it would be used
4. Any relevant design or implementation details

## Versioning

We follow [Semantic Versioning](https://semver.org/). When submitting changes, consider the impact:

- **Patch** (1.0.x): Bug fixes and minor changes
- **Minor** (1.x.0): New features, non-breaking changes
- **Major** (x.0.0): Breaking changes

## License

By contributing to Vibing Block Kit, you agree that your contributions will be licensed under the project's [MIT License](LICENSE). 
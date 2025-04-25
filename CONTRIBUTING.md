# Contributing to Vibing Block Kit

Thank you for considering contributing to Vibing Block Kit! This document outlines the process for contributing to the project.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/vibing-ai/vibing-block-kit.git
cd vibing-block-kit

# Install dependencies
npm install

# Start Storybook for development
npm run storybook

# Run tests
npm test
```

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Finding Issues to Work On](#finding-issues-to-work-on)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)
- [Communication](#communication)
- [FAQs](#faqs)

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all contributors. We expect everyone participating in the Vibing Block Kit project to be respectful and considerate of others. 

Key principles:
- Be kind and courteous to others
- Be respectful of differing opinions and experiences
- Gracefully accept constructive criticism
- Focus on what's best for the community
- Show empathy toward community members

Unacceptable behavior includes:
- The use of offensive language or imagery
- Harassment of any kind
- Publishing others' private information without permission
- Any conduct that could reasonably be considered inappropriate in a professional setting

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/YOUR-USERNAME/vibing-block-kit.git
   cd vibing-block-kit
   ```
3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/vibing-ai/vibing-block-kit.git
   ```
4. **Install dependencies**
   ```bash
   npm install
   ```
5. **Create a branch** for your changes
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Common Commands

```bash
# Start Storybook for component development
npm run storybook

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run linting
npm run lint

# Fix linting issues automatically
npm run lint -- --fix

# Build the library
npm run build

# Clean build files
npm run clean
```

### Storybook

We use Storybook for component development and testing. Each component should have a corresponding story that demonstrates its usage and variants.

To create a new story:

1. Create a `.stories.tsx` file next to your component
2. Follow this structure:

```jsx
import { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  title: 'Category/MyComponent',
  argTypes: {
    // Define control types for your props
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // Default props
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};
```

3. Run `npm run storybook` to see your component in action

## Project Structure

```
src/
├── blocks/           # Block components (core UI elements)
├── components/       # Base components
├── composition/      # Component composition layers
├── surfaces/         # Surface components
├── utils/            # Utility functions
└── index.ts          # Public API exports
```

### Key Concepts

- **Blocks**: Core UI elements for displaying content (Text, Image, etc.)
- **Composition**: Ways to arrange blocks (Container, Group, etc.)
- **Surfaces**: Higher-level components that combine blocks (Modal, Card, etc.)

## Finding Issues to Work On

1. Check our [Issues](https://github.com/vibing-ai/vibing-block-kit/issues) page
2. Look for issues labeled `good first issue`, `help wanted`, or `bug`
3. Comment on the issue you'd like to work on to avoid duplicate efforts
4. If you have an idea that's not listed, open a new issue for discussion before submitting a PR

## Pull Request Process

1. **Keep PRs focused** on a single feature or bug fix
2. **Update documentation** for any changed functionality
3. **Add tests** for new features or bug fixes
4. **Ensure all tests pass** by running `npm test`
5. **Update the README.md** with details of changes if applicable
6. **Submit your PR** with a clear description:
   - What problem does it solve?
   - How does it solve the problem?
   - Any breaking changes?
   - Screenshot/recording if applicable

### PR Template

```markdown
## Description
Brief description of the changes

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How has this been tested?
Describe the tests that you ran

## Screenshots (if applicable)

## Checklist
- [ ] My code follows the project's coding style
- [ ] I have added tests for my changes
- [ ] All tests pass locally
- [ ] I have updated documentation accordingly
- [ ] My changes don't introduce new warnings
```

## Coding Standards

- Use TypeScript for type safety
- Follow existing code patterns and style
- Component guidelines:
  - Props should be defined as interfaces with JSDoc comments
  - Components should be responsive and accessible
  - Maintain backward compatibility when possible

### Naming Conventions

- Component files: `PascalCase.tsx`
- Utility files: `camelCase.ts`
- Test files: `ComponentName.test.tsx`
- Story files: `ComponentName.stories.tsx`

### Component Structure

```tsx
import React from 'react';
import { cn } from '../utils/cn';

/**
 * Button component for user interactions
 */
export interface ButtonProps {
  /** Style variant of the button */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Button content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
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

## Testing Guidelines

- Write unit tests for all components and utilities
- Aim for high test coverage (>80%)
- Tests should be located next to the file they're testing
- Use React Testing Library for component tests

Example test:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Documentation

- Document all public APIs and components
- Use JSDoc comments for props and functions
- Update examples when adding new features
- Keep README and other docs up to date

## Troubleshooting

### Common Issues

**Problem**: Storybook fails to start
**Solution**: Try clearing the Storybook cache:
```bash
npx storybook@latest cache --clear
```

**Problem**: Build errors
**Solution**: Check for TypeScript errors:
```bash
npx tsc --noEmit
```

**Problem**: Test failures
**Solution**: Run tests in watch mode to debug:
```bash
npm test -- --watch
```

## Communication

- For quick questions, use [GitHub Discussions](https://github.com/vibing-ai/vibing-block-kit/discussions)
- For bug reports and feature requests, use [GitHub Issues](https://github.com/vibing-ai/vibing-block-kit/issues)
- For more complex discussions, join our [Discord server](#)

## Versioning

We follow [Semantic Versioning](https://semver.org/). When submitting changes, consider the impact:

- **Patch** (1.0.x): Bug fixes and minor changes
- **Minor** (1.x.0): New features, non-breaking changes
- **Major** (x.0.0): Breaking changes

## FAQs

**Q: How do I add a new block component?**
A: Create a new file in the appropriate subfolder of `src/blocks/`. Follow the existing patterns, write tests, and create a Storybook story.

**Q: How do I upgrade dependencies?**
A: Create an issue first to discuss the implications, then submit a PR with the changes and make sure all tests pass.

**Q: Can I add third-party libraries?**
A: Yes, but discuss it first. We prefer to keep dependencies minimal.

## License

By contributing to Vibing Block Kit, you agree that your contributions will be licensed under the project's [MIT License](LICENSE). 
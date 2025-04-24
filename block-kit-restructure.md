# Prompt for Restructuring vibing-block-kit

## Objective
Restructure the `vibing-block-kit` repository from a monorepo into a simpler, focused component library structure that aligns with its purpose as a publishable npm package (`@vibing/block-kit`).

## Step-by-Step Implementation Process

### Step 1: Backup Current Repository
```bash
# Create a backup branch before making changes
git checkout -b backup/monorepo-structure
git push origin backup/monorepo-structure

# Return to main branch
git checkout main
```

### Step 2: Create New Directory Structure
```bash
# Create the new directories
mkdir -p src/{blocks,surfaces,composition,utils}
mkdir -p docs/{.storybook,stories/{blocks,surfaces,composition}}
mkdir -p examples/{basic,advanced}
```

### Step 3: Move Core Component Files
```bash
# Move block-kit source files
cp -r packages/block-kit/src/blocks/* src/blocks/
cp -r packages/block-kit/src/surfaces/* src/surfaces/
cp -r packages/block-kit/src/composition/* src/composition/
cp -r packages/block-kit/src/utils/* src/utils/
cp packages/block-kit/src/types.ts src/
cp packages/block-kit/src/index.ts src/

# Remove any references to primitives in code files
# We'll use HeroUI directly instead
```

### Step 4: Move Documentation and Examples
```bash
# Move Storybook configuration
cp -r packages/playground/docs/.storybook/* docs/.storybook/

# Move stories
cp -r packages/playground/docs/src/stories/* docs/stories/

# Create basic examples from the web app
cp -r apps/web/src/app/page.tsx examples/basic/index.tsx
# Add any other examples as needed
```

### Step 5: Update Configuration Files

#### A. Create new package.json
```bash
# Create a new package.json with the correct structure
cat > package.json << 'EOL'
{
  "name": "@vibing/block-kit",
  "version": "0.1.0",
  "description": "Composable React + Tailwind component library for building Vibing apps, agents and plugins",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint \"src/**/*.{ts,tsx}\"",
    "test": "vitest run",
    "storybook": "storybook dev -p 6006 -c docs/.storybook",
    "build-storybook": "storybook build -c docs/.storybook",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "@heroui/react": "^0.1.0",
    "@heroui/theme": "^0.1.0",
    "@heroui/system": "^0.1.0",
    "@iconify/react": "^4.1.1",
    "usehooks-ts": "^2.9.1",
    "recharts": "^2.7.2",
    "framer-motion": "^10.16.4"
  },
  "devDependencies": {
    "@storybook/addon-essentials": "^7.0.0",
    "@storybook/addon-interactions": "^7.0.0",
    "@storybook/react": "^7.0.0",
    "@storybook/react-vite": "^7.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^5.59.0",
    "@typescript-eslint/parser": "^5.59.0",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.38.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-storybook": "^0.6.11",
    "postcss": "^8.4.23",
    "tailwindcss": "^3.3.2",
    "tsup": "^6.7.0",
    "typescript": "^5.0.4",
    "vite": "^4.3.1",
    "vitest": "^0.30.1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/vibing/vibing-block-kit.git"
  },
  "keywords": [
    "react",
    "components",
    "ui",
    "tailwind",
    "vibing",
    "block-kit"
  ],
  "author": "Vibing",
  "license": "MIT"
}
EOL
```

#### B. Create new tsconfig.json
```bash
# Create a new tsconfig.json
cat > tsconfig.json << 'EOL'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOL
```

#### C. Create tsconfig.node.json
```bash
# Create a new tsconfig.node.json
cat > tsconfig.node.json << 'EOL'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts", "tsup.config.ts"]
}
EOL
```

#### D. Create tsup.config.ts
```bash
# Create a new tsup.config.ts
cat > tsup.config.ts << 'EOL'
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
});
EOL
```

#### E. Create tailwind.config.js
```bash
# Create a new tailwind.config.js
cat > tailwind.config.js << 'EOL'
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './docs/stories/**/*.{js,ts,jsx,tsx}',
    './examples/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // Integration with HeroUI theme will go here
    },
  },
  plugins: [],
};
EOL
```

#### F. Create postcss.config.js
```bash
# Create a new postcss.config.js
cat > postcss.config.js << 'EOL'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOL
```

#### G. Update README.md
```bash
# Create a new README.md
cat > README.md << 'EOL'
# Vibing Block Kit

Composable React + Tailwind component library for building Vibing apps, agents and plugins. Includes fully-typed props, dark-mode tokens and a Storybook playground.

## Installation

```bash
npm install @vibing/block-kit
```

## Usage

```jsx
import { TextBlock, AICompletionBlock } from '@vibing/block-kit';

function MyApp() {
  return (
    <div>
      <TextBlock 
        id="intro-text"
        content="Welcome to Vibing Block Kit"
      />
      
      <AICompletionBlock
        id="ai-completion"
        initialPrompt="Tell me about Vibing"
      />
    </div>
  );
}
```

## Documentation

For full documentation, visit the [Storybook](https://vibing.github.io/vibing-block-kit).

## Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Build the library
npm run build
```

## License

MIT
EOL
```

### Step 6: Update .storybook Configuration

```bash
# Update the main.ts file to point to the new structure
cat > docs/.storybook/main.ts << 'EOL'
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
EOL
```

### Step 7: Clean Up Old Files

```bash
# Remove old directories (after confirming the new structure works)
rm -rf apps packages
rm -rf .turbo turbo.json pnpm-workspace.yaml
```

### Step 8: Update .gitignore

```bash
# Create a new .gitignore file
cat > .gitignore << 'EOL'
# Dependencies
node_modules
.pnp
.pnp.js

# Build output
dist
build
storybook-static

# Testing
coverage

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
EOL
```

### Step 9: Test the New Structure

```bash
# Install dependencies
npm install

# Make sure Storybook runs
npm run storybook

# Try building the package
npm run build

# Check that all imports are working properly
```

### Step 10: Commit Changes

```bash
# Add all files to git
git add .

# Commit the changes
git commit -m "Restructure repository from monorepo to focused component library"

# Push changes
git push origin main
```

## Post-Restructuring Tasks

1. **Check all imports**: Make sure all component imports in stories and examples are correctly updated to the new paths.

2. **Update documentation**: Make sure the documentation reflects the new structure.

3. **Test in a consuming project**: Create a test project that imports the library to ensure it works correctly.

4. **Set up GitHub Actions**: Create a CI/CD workflow for testing and publishing the package.

5. **Configure package publishing**: Set up npm publishing for the package.

This restructuring will significantly simplify your codebase while maintaining all the functionality, making it more aligned with the purpose of being a focused, publishable component library like Slack's Block Kit.

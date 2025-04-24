module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:storybook/recommended',
    'prettier',
    'plugin:boundaries/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jsx-a11y',
    'boundaries',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'boundaries/elements': [
      {
        type: 'blocks-kit',
        pattern: 'packages/blocks/kit/src/**/*',
      },
      {
        type: 'block-kit',
        pattern: 'packages/block-kit/src/**/*',
      },
      {
        type: 'ui',
        pattern: 'packages/ui/src/**/*',
      },
    ],
    'boundaries/ignore': ['**/*.test.*', '**/*.spec.*', '**/*.stories.*'],
  },
  rules: {
    'react/prop-types': 'off', // TypeScript checks this
    'react/jsx-uses-react': 'off', // Not needed with React 18
    'react/react-in-jsx-scope': 'off', // Not needed with React 18
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'boundaries/element-types': [
      'error',
      {
        default: 'allow',
        rules: [
          {
            from: ['blocks-kit'],
            disallow: ['block-kit', 'assistant-ui', 'hero-ui'],
            message: 'Blocks Kit cannot import from higher-level components',
          },
          {
            from: ['block-kit'],
            disallow: ['assistant-ui', 'hero-ui'],
            message: 'Block Kit should only import from Blocks Kit, not assistant-ui directly',
          },
        ],
      },
    ],
  },
  ignorePatterns: ['dist', '.turbo', 'node_modules', 'storybook-static'],
}; 
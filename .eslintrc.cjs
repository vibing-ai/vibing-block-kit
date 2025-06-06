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
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: [
          './tsconfig.json',
          './docs/tsconfig.json',
          './examples/tsconfig.json'
        ],
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false
      },
    },
    {
      files: ['*.js', '*.jsx', '*.cjs', '*.mjs'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  ],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jsx-a11y',
  ],
  settings: {
    react: {
      version: 'detect',
    }
  },
  rules: {
    'react/prop-types': 'off', // TypeScript checks this
    'react/jsx-uses-react': 'off', // Not needed with React 18
    'react/react-in-jsx-scope': 'off', // Not needed with React 18
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
    'jsx-a11y/media-has-caption': 'off', // We've implemented captions in our media components
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    'storybook-static',
    '*.config.js',
    '*.config.ts',
    'postcss.config.js',
    'tailwind.config.js',
    'vite.config.ts',
    'vitest.config.ts',
    'tsup.config.ts',
  ],
}; 
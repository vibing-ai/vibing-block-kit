import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from '@vibing/block-kit';

const meta: Meta<typeof CodeBlock> = {
  title: 'Blocks/Code/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  argTypes: {
    code: { control: 'text' },
    language: { control: 'text' },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const JavaScript: Story = {
  args: {
    id: 'code-block-js-example',
    language: 'javascript',
    code: `function greeting(name) {
  return \`Hello, \${name}!\`;
}

console.log(greeting('World'));`,
  },
};

export const TypeScript: Story = {
  args: {
    id: 'code-block-ts-example',
    language: 'typescript',
    code: `interface User {
  id: number;
  name: string;
  email: string;
}

function getUserInfo(user: User): string {
  return \`Name: \${user.name}, Email: \${user.email}\`;
}

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};

console.log(getUserInfo(user));`,
  },
};

export const WithLineNumbers: Story = {
  args: {
    id: 'code-block-line-numbers-example',
    language: 'javascript',
    code: `function add(a, b) {
  return a + b;
}

const sum = add(5, 10);
console.log(sum);`,
    showLineNumbers: true,
  },
}; 
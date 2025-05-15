import  { Meta, StoryObj } from '@storybook/react';
import { EnhancedCodeBlock } from '../../../src/blocks/code-block/EnhancedCodeBlock';

// Define the metadata for the component
const meta = {
  title: 'Blocks/Code/EnhancedCodeBlock',
  component: EnhancedCodeBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    code: { control: 'text' },
    language: { control: 'select', options: [
      'html', 'css', 'javascript', 'typescript', 'python', 'java'
    ]},
    showLineNumbers: { control: 'boolean' },
  },
} satisfies Meta<typeof EnhancedCodeBlock>;

// Define the default export
export default meta;

// Define the Story type
type Story = StoryObj<typeof meta>;

// HTML example
export const HTML: Story = {
  args: {
    id: 'enhanced-code-block-html',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  },
};

// JavaScript example
export const JavaScript: Story = {
  args: {
    id: 'enhanced-code-block-js',
    language: 'javascript',
    code: `function greeting(name) {
  return \`Hello, \${name}!\`;
}

console.log(greeting('World'));`,
  },
};

// Python example without line numbers
export const Python: Story = {
  args: {
    id: 'enhanced-code-block-python',
    language: 'python',
    code: `def fibonacci(n):
    """Generate the Fibonacci sequence up to n."""
    a, b = 0, 1
    while a < n:
        yield a
        a, b = b, a + b
        
# Print the Fibonacci sequence up to 1000
for num in fibonacci(1000):
    print(num)`,
    showLineNumbers: false,
  },
}; 
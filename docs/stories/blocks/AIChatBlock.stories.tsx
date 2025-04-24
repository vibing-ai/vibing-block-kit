import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AIChatBlock } from '@vibing/block-kit';

const meta: Meta<typeof AIChatBlock> = {
  title: 'Blocks/AI/AIChatBlock',
  component: AIChatBlock,
  tags: ['autodocs'],
  argTypes: {
    messages: { control: 'object' },
    onSendMessage: { action: 'messageSent' },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof AIChatBlock>;

export const Basic: Story = {
  args: {
    id: 'ai-chat-block-example',
    messages: [
      { id: '1', role: 'system', content: 'I am an AI assistant here to help you with coding questions.' },
      { id: '2', role: 'user', content: 'How do I create a React component?' },
      { id: '3', role: 'assistant', content: 'To create a React component, you can use either a function or a class. Here is a simple functional component example:\n\n```jsx\nimport React from \'react\';\n\nconst MyComponent = ({ name }) => {\n  return <div>Hello, {name}!</div>;\n};\n\nexport default MyComponent;\n```\n\nYou would then use it in your application like this:\n\n```jsx\nimport MyComponent from \'./MyComponent\';\n\nfunction App() {\n  return <MyComponent name="World" />;\n}\n```' },
    ],
    placeholder: 'Ask a question...',
    inputPosition: 'bottom',
  },
};

export const Loading: Story = {
  args: {
    id: 'ai-chat-block-loading-example',
    messages: [
      { id: '1', role: 'user', content: 'What is the capital of France?' },
    ],
    placeholder: 'Ask a question...',
    isLoading: true,
    inputPosition: 'bottom',
  },
};

export const WithSuggestions: Story = {
  args: {
    id: 'ai-chat-block-suggestions-example',
    messages: [
      { id: '1', role: 'assistant', content: 'I can help you with various topics. What would you like to know about?' },
    ],
    placeholder: 'Ask a question...',
    suggestions: [
      'How to use React hooks?',
      'Explain CSS Grid',
      'JavaScript promises example',
    ],
    inputPosition: 'bottom',
  },
}; 
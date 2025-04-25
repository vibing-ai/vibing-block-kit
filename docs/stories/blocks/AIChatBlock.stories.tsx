import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AIChatBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof AIChatBlock> = {
  title: 'Blocks/AI/AIChatBlock',
  component: AIChatBlock,
  tags: ['autodocs'],
  argTypes: {
    messages: { control: 'object' },
    isLoading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof AIChatBlock>;

export const Basic: Story = {
  args: {
    id: 'ai-chat-block-example',
    messages: [
      { role: 'system', content: 'I am an AI assistant here to help you with coding questions.' },
      { role: 'user', content: 'How do I create a React component?' },
      { role: 'assistant', content: 'To create a React component, you can use either a function or a class. Here is a simple functional component example:\n\n```jsx\nimport * as React from \'react\';\n\nconst MyComponent = ({ name }) => {\n  return <div>Hello, {name}!</div>;\n};\n\nexport default MyComponent;\n```\n\nYou would then use it in your application like this:\n\n```jsx\nimport MyComponent from \'./MyComponent\';\n\nfunction App() {\n  return <MyComponent name="World" />;\n}\n```' },
    ],
  },
};

export const Loading: Story = {
  args: {
    id: 'ai-chat-block-loading-example',
    messages: [
      { role: 'user', content: 'What is the capital of France?' },
    ],
    isLoading: true,
  },
};

export const WithAvatars: Story = {
  args: {
    id: 'ai-chat-block-avatars-example',
    messages: [
      { role: 'assistant', content: 'I can help you with various topics. What would you like to know about?' },
      { role: 'user', content: 'Tell me about React hooks.' },
      { role: 'assistant', content: 'React Hooks are functions that let you "hook into" React state and lifecycle features from function components.' },
    ],
  },
}; 
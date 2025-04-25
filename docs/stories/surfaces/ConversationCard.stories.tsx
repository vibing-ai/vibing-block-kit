import type { Meta, StoryObj } from '@storybook/react';
import { ConversationCard } from '@vibing-ai/block-kit';

// Define a custom interface for the story
interface ConversationCardStoryProps {
  id: string;
  title?: string;
  messages: Array<{
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: Date;
    metadata?: Record<string, unknown>;
    status?: 'sending' | 'sent' | 'error' | 'streaming';
  }>;
  isGenerating?: boolean;  // Using proper prop name from component
  onSendMessage?: (content: string) => void;
  onStopGeneration?: () => void;
  inputPlaceholder?: string;
}

const meta = {
  title: 'Surfaces/Conversation/ConversationCard',
  component: ConversationCard,
  tags: ['autodocs'],
  // Type argTypes as a generic Record to avoid type errors
  argTypes: {} as Record<string, unknown>,
} satisfies Meta<typeof ConversationCard>;

export default meta;
type Story = StoryObj<ConversationCardStoryProps>;

export const Basic: Story = {
  args: {
    id: 'conversation-card-example',
    title: 'Chat with AI Assistant',
    messages: [
      { id: '1', role: 'user', content: 'Hello, can you help me with a JavaScript question?' },
      { id: '2', role: 'assistant', content: 'Of course! I\'d be happy to help with your JavaScript question. What would you like to know?' },
      { id: '3', role: 'user', content: 'How do I create a Promise in JavaScript?' },
      { id: '4', role: 'assistant', content: 'Creating a Promise in JavaScript is straightforward. Here\'s an example:\n\n```javascript\nconst myPromise = new Promise((resolve, reject) => {\n  // Asynchronous operation\n  const success = true;\n  \n  if (success) {\n    resolve(\'Operation completed successfully!\');\n  } else {\n    reject(\'Operation failed!\');\n  }\n});\n\n// Using the Promise\nmyPromise\n  .then(result => {\n    // Handle successful result\n    return result; // Operation completed successfully!\n  })\n  .catch(error => {\n    // Handle error appropriately\n    throw new Error(error);\n  });\n```\n\nThis creates a Promise that immediately resolves or rejects based on the `success` variable. In real applications, you would typically have actual asynchronous operations like API calls inside the Promise executor function.' },
    ],
    inputPlaceholder: 'Type your message...',
  },
};

export const WithTypingIndicator: Story = {
  args: {
    id: 'conversation-card-typing-example',
    title: 'Chat with AI Assistant',
    messages: [
      { id: '1', role: 'user', content: 'Can you explain what React hooks are?' },
    ],
    isGenerating: true,
    inputPlaceholder: 'Type your message...',
  },
};

export const WithActions: Story = {
  args: {
    id: 'conversation-card-actions-example',
    title: 'Chat with AI Assistant',
    messages: [
      { id: '1', role: 'user', content: 'Can you help me analyze this data?' },
      { id: '2', role: 'assistant', content: 'I can help you analyze your data. Would you like me to create a visualization or provide statistical analysis?' },
    ],
    onSendMessage: () => {
      // Handle sending message
    },
    inputPlaceholder: 'Type your message...',
  },
}; 
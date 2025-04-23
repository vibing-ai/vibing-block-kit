import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ChatContainer from './ChatContainer';

const meta: Meta<typeof ChatContainer> = {
  title: 'BlockKit/ChatContainer',
  component: ChatContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSendMessage: { action: 'sent message' },
    isLoading: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ChatContainer>;

// Sample messages
const sampleMessages = [
  {
    id: '1',
    role: 'system' as const,
    content: 'Hello! How can I help you today?',
    timestamp: new Date('2023-04-23T10:00:00'),
  },
  {
    id: '2',
    role: 'user' as const,
    content: 'I need help with the Block Kit components.',
    timestamp: new Date('2023-04-23T10:01:00'),
  },
  {
    id: '3',
    role: 'assistant' as const,
    content: 'Sure! The Block Kit provides reusable UI components built on top of HeroUI and AssistantUI. What specific component are you looking for?',
    timestamp: new Date('2023-04-23T10:02:00'),
  },
];

export const Default: Story = {
  args: {
    messages: sampleMessages,
    isLoading: false,
    placeholder: 'Type your message...',
  },
};

export const Loading: Story = {
  args: {
    messages: sampleMessages,
    isLoading: true,
    placeholder: 'Waiting for response...',
  },
};

export const Empty: Story = {
  args: {
    messages: [],
    isLoading: false,
    placeholder: 'Start a new conversation...',
  },
}; 
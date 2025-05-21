import type { Meta, StoryObj } from '@storybook/react';
import { PromptContainerEmptyFeatureCards } from '../../../../src/blocks/prompt/PromptContainerEmptyFeatureCards';
import { FiMessageSquare, FiImage, FiCode } from 'react-icons/fi';

const meta: Meta<typeof PromptContainerEmptyFeatureCards> = {
  title: 'Blocks/Prompt/PromptContainerEmptyFeatureCards',
  component: PromptContainerEmptyFeatureCards,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PromptContainerEmptyFeatureCards>;

const sampleFeatures = [
  {
    id: '1',
    icon: <FiMessageSquare size={24} />,
    title: 'Start a Conversation',
    description: 'Begin a new chat with AI to explore ideas and get answers.',
    onClick: () => console.log('Start conversation clicked'),
  },
  {
    id: '2',
    icon: <FiImage size={24} />,
    title: 'Generate Images',
    description: 'Create unique images using AI-powered image generation.',
    onClick: () => console.log('Generate image clicked'),
  },
  {
    id: '3',
    icon: <FiCode size={24} />,
    title: 'Code Assistant',
    description: 'Get help with coding tasks and debugging.',
    onClick: () => console.log('Code assistant clicked'),
  },
];

export const Default: Story = {
  args: {
    features: sampleFeatures,
  },
};

export const WithCustomStyling: Story = {
  args: {
    features: sampleFeatures,
    className: 'max-w-4xl',
    cardClassName: 'hover:shadow-lg',
  },
};

export const SingleCard: Story = {
  args: {
    features: [sampleFeatures[0]],
  },
}; 
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof TextBlock> = {
  title: 'Blocks/Text/TextBlock',
  component: TextBlock,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    variant: { 
      control: 'select', 
      options: ['paragraph', 'heading', 'subheading', 'caption']
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']
    }
  },
};

export default meta;
type Story = StoryObj<typeof TextBlock>;

export const Basic: Story = {
  args: {
    id: 'text-block-example',
    content: 'This is a basic text block',
  },
};

export const Formatted: Story = {
  args: {
    id: 'formatted-text-block-example',
    content: 'This text has **bold** and *italic* formatting',
    variant: 'paragraph',
    weight: 'medium',
  },
};

export const WithHeading: Story = {
  args: {
    id: 'heading-text-block-example',
    content: 'Text block with a heading',
    variant: 'heading',
    size: '2xl',
  },
}; 
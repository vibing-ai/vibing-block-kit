import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof TextBlock> = {
  title: 'Blocks/Text/TextBlock',
  component: TextBlock,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    // Add other controls as needed
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
    allowFormatting: true,
  },
};

export const WithHeading: Story = {
  args: {
    id: 'heading-text-block-example',
    content: 'Text block with a heading',
    heading: 'Section Title',
  },
}; 
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof FormBlock> = {
  title: 'Blocks/Interactive/FormBlock',
  component: FormBlock,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
};

export default meta;
type Story = StoryObj<typeof FormBlock>;

export const Basic: Story = {
  args: {
    id: 'form-block-example',
    children: 'Form content goes here', // In actual usage, this would be form field components
  },
};

export const WithCustomLabels: Story = {
  args: {
    id: 'form-block-custom-labels-example',
    children: 'Form content goes here',
  },
};

export const WithoutReset: Story = {
  args: {
    id: 'form-block-no-reset-example',
    children: 'Form content goes here',
  },
}; 
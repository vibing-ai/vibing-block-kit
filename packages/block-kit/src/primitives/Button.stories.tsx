import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@block-kit/core';

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: 'BlockKit/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg'],
    },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
}; 
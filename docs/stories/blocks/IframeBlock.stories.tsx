import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IframeBlock } from '@vibing/block-kit';

const meta: Meta<typeof IframeBlock> = {
  title: 'Blocks/Embed/IframeBlock',
  component: IframeBlock,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    title: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof IframeBlock>;

export const Basic: Story = {
  args: {
    id: 'iframe-block-example',
    src: 'https://www.example.com',
    title: 'Example Website',
    width: '100%',
    height: '400px',
  },
};

export const WithBorder: Story = {
  args: {
    id: 'iframe-block-border-example',
    src: 'https://www.example.com',
    title: 'Example Website with Border',
    width: '100%',
    height: '400px',
    hasBorder: true,
  },
};

export const Sandbox: Story = {
  args: {
    id: 'iframe-block-sandbox-example',
    src: 'https://www.example.com',
    title: 'Sandboxed Example',
    width: '100%',
    height: '400px',
    sandbox: 'allow-scripts allow-same-origin',
  },
}; 
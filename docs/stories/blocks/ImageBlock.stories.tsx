import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ImageBlock } from '@vibing/block-kit';

const meta: Meta<typeof ImageBlock> = {
  title: 'Blocks/Media/ImageBlock',
  component: ImageBlock,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof ImageBlock>;

export const Basic: Story = {
  args: {
    id: 'image-block-example',
    src: 'https://placehold.co/600x400',
    alt: 'Example image',
  },
};

export const WithCaption: Story = {
  args: {
    id: 'image-block-caption-example',
    src: 'https://placehold.co/600x400',
    alt: 'Example image with caption',
    caption: 'This is a caption for the image',
  },
};

export const WithBorder: Story = {
  args: {
    id: 'image-block-border-example',
    src: 'https://placehold.co/600x400',
    alt: 'Example image with border',
    hasBorder: true,
  },
}; 
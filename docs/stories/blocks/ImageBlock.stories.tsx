import type { Meta, StoryObj } from '@storybook/react';
import { ImageBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof ImageBlock> = {
  title: 'Blocks/Media/ImageBlock',
  component: ImageBlock,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    caption: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    rounded: { control: 'boolean' },
    loading: { control: 'radio', options: ['eager', 'lazy'] },
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

export const Rounded: Story = {
  args: {
    id: 'image-block-rounded-example',
    src: 'https://placehold.co/600x400',
    alt: 'Example image with rounded corners',
    rounded: true,
  },
}; 
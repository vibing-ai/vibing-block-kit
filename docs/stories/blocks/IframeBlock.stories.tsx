import type { Meta, StoryObj } from '@storybook/react';
import { IframeBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof IframeBlock> = {
  title: 'Blocks/Embed/IframeBlock',
  component: IframeBlock,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    title: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    allowFullScreen: { control: 'boolean' },
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

export const WithAllowFullscreen: Story = {
  args: {
    id: 'iframe-block-fullscreen-example',
    src: 'https://www.example.com',
    title: 'Example Website with Fullscreen Option',
    width: '100%',
    height: '400px',
    allowFullScreen: true,
  },
};

export const CustomDimensions: Story = {
  args: {
    id: 'iframe-block-dimensions-example',
    src: 'https://www.example.com',
    title: 'Custom Sized Example',
    width: '600px',
    height: '300px',
  },
}; 
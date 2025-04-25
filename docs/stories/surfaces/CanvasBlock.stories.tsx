import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CanvasBlock } from '@vibing-ai/block-kit';

// Define a custom interface for story props based on the actual component props
interface CanvasBlockStoryProps {
  id?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  isSelected?: boolean;
  isEditing?: boolean;
  onSelect?: () => void;
  onMove?: (x: number, y: number) => void;
  onResize?: (width: number, height: number) => void;
}

const meta = {
  title: 'Surfaces/Canvas/CanvasBlock',
  component: CanvasBlock,
  tags: ['autodocs'],
  // Type argTypes as a generic Record to avoid type errors
  argTypes: {} as Record<string, any>,
} satisfies Meta<typeof CanvasBlock>;

export default meta;
type Story = StoryObj<CanvasBlockStoryProps>;

export const Basic: Story = {
  args: {
    id: 'canvas-block-basic-example',
    x: 50,
    y: 50,
    width: 200,
    height: 100,
  },
};

export const Selected: Story = {
  args: {
    id: 'canvas-block-selected-example',
    x: 100,
    y: 100,
    width: 250,
    height: 150,
    isSelected: true,
  },
};

export const Editing: Story = {
  args: {
    id: 'canvas-block-editing-example',
    x: 150,
    y: 150,
    width: 300,
    height: 200,
    isEditing: true,
  },
}; 
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CanvasBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof CanvasBlock> = {
  title: 'Surfaces/Canvas/CanvasBlock',
  component: CanvasBlock,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof CanvasBlock>;

export const Empty: Story = {
  args: {
    id: 'canvas-block-empty-example',
    width: '100%',
    height: '400px',
    background: 'grid',
  },
};

export const WithElements: Story = {
  args: {
    id: 'canvas-block-elements-example',
    width: '100%',
    height: '400px',
    background: 'grid',
    elements: [
      {
        id: 'rect-1',
        type: 'rectangle',
        x: 100,
        y: 100,
        width: 150,
        height: 80,
        fill: '#e2e8f0',
        label: 'Rectangle',
      },
      {
        id: 'circle-1',
        type: 'circle',
        x: 350,
        y: 200,
        radius: 50,
        fill: '#cbd5e1',
        label: 'Circle',
      },
      {
        id: 'text-1',
        type: 'text',
        x: 250,
        y: 300,
        text: 'Canvas Text',
        fontSize: 16,
      },
    ],
  },
};

export const Interactive: Story = {
  args: {
    id: 'canvas-block-interactive-example',
    width: '100%',
    height: '400px',
    background: 'grid',
    elements: [
      {
        id: 'rect-1',
        type: 'rectangle',
        x: 100,
        y: 100,
        width: 150,
        height: 80,
        fill: '#e2e8f0',
        label: 'Drag Me',
      },
      {
        id: 'circle-1',
        type: 'circle',
        x: 350,
        y: 200,
        radius: 50,
        fill: '#cbd5e1',
        label: 'Drag Me Too',
      },
    ],
    interactive: true,
    allowPan: true,
    allowZoom: true,
    tools: [
      { id: 'select', icon: 'cursor', label: 'Select' },
      { id: 'rectangle', icon: 'square', label: 'Rectangle' },
      { id: 'circle', icon: 'circle', label: 'Circle' },
      { id: 'text', icon: 'type', label: 'Text' },
    ],
  },
}; 
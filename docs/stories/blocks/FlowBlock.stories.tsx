import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FlowBlock } from '@vibing/block-kit';

const meta: Meta<typeof FlowBlock> = {
  title: 'Blocks/Connector/FlowBlock',
  component: FlowBlock,
  tags: ['autodocs'],
  argTypes: {
    nodes: { control: 'object' },
    edges: { control: 'object' },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof FlowBlock>;

export const Basic: Story = {
  args: {
    id: 'flow-block-example',
    nodes: [
      {
        id: 'node-1',
        type: 'input',
        data: { label: 'Input Node' },
        position: { x: 100, y: 100 },
      },
      {
        id: 'node-2',
        type: 'default',
        data: { label: 'Process Node' },
        position: { x: 300, y: 200 },
      },
      {
        id: 'node-3',
        type: 'output',
        data: { label: 'Output Node' },
        position: { x: 500, y: 100 },
      },
    ],
    edges: [
      {
        id: 'edge-1-2',
        source: 'node-1',
        target: 'node-2',
        animated: true,
      },
      {
        id: 'edge-2-3',
        source: 'node-2',
        target: 'node-3',
      },
    ],
    height: '400px',
  },
};

export const WithCustomNodes: Story = {
  args: {
    id: 'flow-block-custom-nodes-example',
    nodes: [
      {
        id: 'node-1',
        type: 'custom',
        data: { 
          label: 'Data Source',
          icon: 'database',
        },
        position: { x: 100, y: 150 },
      },
      {
        id: 'node-2',
        type: 'custom',
        data: { 
          label: 'Transform',
          icon: 'cog',
        },
        position: { x: 300, y: 150 },
      },
      {
        id: 'node-3',
        type: 'custom',
        data: { 
          label: 'Visualization',
          icon: 'chart-bar',
        },
        position: { x: 500, y: 150 },
      },
    ],
    edges: [
      {
        id: 'edge-1-2',
        source: 'node-1',
        target: 'node-2',
        type: 'step',
      },
      {
        id: 'edge-2-3',
        source: 'node-2',
        target: 'node-3',
        type: 'step',
      },
    ],
    height: '400px',
  },
};

export const Interactive: Story = {
  args: {
    id: 'flow-block-interactive-example',
    nodes: [
      {
        id: 'node-1',
        type: 'input',
        data: { label: 'Start' },
        position: { x: 250, y: 50 },
      },
      {
        id: 'node-2',
        type: 'default',
        data: { label: 'Process A' },
        position: { x: 150, y: 150 },
      },
      {
        id: 'node-3',
        type: 'default',
        data: { label: 'Process B' },
        position: { x: 350, y: 150 },
      },
      {
        id: 'node-4',
        type: 'output',
        data: { label: 'End' },
        position: { x: 250, y: 250 },
      },
    ],
    edges: [
      {
        id: 'edge-1-2',
        source: 'node-1',
        target: 'node-2',
      },
      {
        id: 'edge-1-3',
        source: 'node-1',
        target: 'node-3',
      },
      {
        id: 'edge-2-4',
        source: 'node-2',
        target: 'node-4',
      },
      {
        id: 'edge-3-4',
        source: 'node-3',
        target: 'node-4',
      },
    ],
    height: '400px',
    interactive: true,
  },
}; 
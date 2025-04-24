import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToolPalette } from '@vibing-ai/block-kit';

const meta: Meta<typeof ToolPalette> = {
  title: 'Surfaces/Tool/ToolPalette',
  component: ToolPalette,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof ToolPalette>;

export const Basic: Story = {
  args: {
    id: 'tool-palette-example',
    placement: 'left',
    orientation: 'vertical',
    tools: [
      { id: 'select', icon: 'cursor', label: 'Select', tooltip: 'Select tool' },
      { id: 'pen', icon: 'pen', label: 'Pen', tooltip: 'Pen tool' },
      { id: 'eraser', icon: 'eraser', label: 'Eraser', tooltip: 'Eraser tool' },
      { id: 'text', icon: 'type', label: 'Text', tooltip: 'Text tool' },
    ],
    activeToolId: 'select',
    onToolSelect: (toolId) => console.log(`Selected tool: ${toolId}`),
  },
};

export const WithGroups: Story = {
  args: {
    id: 'tool-palette-groups-example',
    placement: 'left',
    orientation: 'vertical',
    toolGroups: [
      {
        id: 'selection',
        label: 'Selection Tools',
        tools: [
          { id: 'select', icon: 'cursor', label: 'Select', tooltip: 'Select objects' },
          { id: 'lasso', icon: 'lasso', label: 'Lasso', tooltip: 'Lasso selection' },
        ],
      },
      {
        id: 'drawing',
        label: 'Drawing Tools',
        tools: [
          { id: 'pen', icon: 'pen', label: 'Pen', tooltip: 'Pen tool' },
          { id: 'brush', icon: 'brush', label: 'Brush', tooltip: 'Brush tool' },
          { id: 'eraser', icon: 'eraser', label: 'Eraser', tooltip: 'Eraser tool' },
        ],
      },
      {
        id: 'shapes',
        label: 'Shape Tools',
        tools: [
          { id: 'rectangle', icon: 'square', label: 'Rectangle', tooltip: 'Rectangle tool' },
          { id: 'circle', icon: 'circle', label: 'Circle', tooltip: 'Circle tool' },
          { id: 'line', icon: 'minus', label: 'Line', tooltip: 'Line tool' },
        ],
      },
    ],
    activeToolId: 'select',
    onToolSelect: (toolId) => console.log(`Selected tool: ${toolId}`),
  },
};

export const Horizontal: Story = {
  args: {
    id: 'tool-palette-horizontal-example',
    placement: 'top',
    orientation: 'horizontal',
    tools: [
      { id: 'home', icon: 'home', label: 'Home', tooltip: 'Go to home' },
      { id: 'search', icon: 'search', label: 'Search', tooltip: 'Search content' },
      { id: 'settings', icon: 'settings', label: 'Settings', tooltip: 'Open settings' },
      { id: 'help', icon: 'help-circle', label: 'Help', tooltip: 'Get help' },
    ],
    showLabels: true,
    activeToolId: 'home',
    onToolSelect: (toolId) => console.log(`Selected tool: ${toolId}`),
  },
}; 
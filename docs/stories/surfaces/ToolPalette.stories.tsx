import type { Meta, StoryObj } from '@storybook/react';
import { ToolPalette } from '@vibing-ai/block-kit';

// Define a complete Tool interface for the story
interface Tool {
  id: string;
  icon: string;
  label: string;
  tooltip?: string;
}

// Define a custom props interface for storybook
interface ToolPaletteStoryProps {
  id?: string;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  orientation?: 'vertical' | 'horizontal';
  tools?: Tool[];
  toolGroups?: Array<{
    id: string;
    label: string;
    tools: Tool[];
  }>;
  activeToolId?: string;
  onToolSelect?: (toolId: string) => void;
  showLabels?: boolean;
}

const meta = {
  title: 'Surfaces/Tool/ToolPalette',
  component: ToolPalette,
  tags: ['autodocs'],
  // Type argTypes as a generic Record to avoid type errors
  argTypes: {} as Record<string, unknown>,
} satisfies Meta<typeof ToolPalette>;

export default meta;
type Story = StoryObj<ToolPaletteStoryProps>;

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
    onToolSelect: () => {},
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
    onToolSelect: () => {},
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
    onToolSelect: () => {},
  },
}; 
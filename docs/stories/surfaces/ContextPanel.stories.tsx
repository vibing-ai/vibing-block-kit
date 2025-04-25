import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContextPanel, TextBlock } from '@vibing-ai/block-kit';

// Define a custom interface for the story props
interface ContextPanelStoryProps {
  id?: string;
  title?: string;
  placement?: 'left' | 'right';
  width?: string;
  children?: React.ReactNode;
  sections?: Array<{
    id: string;
    title: string;
    content: string;
    isCollapsible?: boolean;
    defaultCollapsed?: boolean;
  }>;
  isCollapsible?: boolean;
}

const meta = {
  title: 'Surfaces/Context/ContextPanel',
  component: ContextPanel,
  tags: ['autodocs'],
  // Type argTypes as a generic Record to avoid type errors
  argTypes: {} as Record<string, any>,
} satisfies Meta<typeof ContextPanel>;

export default meta;
type Story = StoryObj<ContextPanelStoryProps>;

export const Basic: Story = {
  args: {
    id: 'context-panel-example',
    title: 'Documentation',
    placement: 'right',
    width: '300px',
    children: React.createElement(TextBlock, {
      id: "context-text",
      content: "This is contextual information that provides additional details about the current task or topic. It can include references, documentation, or related content."
    }),
  },
};

export const WithSections: Story = {
  args: {
    id: 'context-panel-sections-example',
    title: 'Project Information',
    placement: 'right',
    width: '350px',
    sections: [
      {
        id: 'section-1',
        title: 'Description',
        content: 'This project demonstrates the use of Block Kit components for building AI-powered interfaces.',
      },
      {
        id: 'section-2',
        title: 'Resources',
        content: '- [Documentation](https://example.com/docs)\n- [GitHub Repository](https://github.com/example/repo)\n- [Community Forum](https://example.com/forum)',
      },
      {
        id: 'section-3',
        title: 'Team Members',
        content: '1. John Doe (Project Lead)\n2. Jane Smith (UI/UX Designer)\n3. Alice Johnson (Developer)',
      },
    ],
  },
};

export const Collapsible: Story = {
  args: {
    id: 'context-panel-collapsible-example',
    title: 'Help & Resources',
    placement: 'right',
    width: '320px',
    isCollapsible: true,
    sections: [
      {
        id: 'section-1',
        title: 'Quick Start Guide',
        content: 'Follow these steps to get started with the Block Kit:\n\n1. Install the package\n2. Import the components\n3. Use them in your application',
        isCollapsible: true,
      },
      {
        id: 'section-2',
        title: 'Common Issues',
        content: '**Issue 1**: Components not rendering\nSolution: Make sure you\'ve properly imported all dependencies.\n\n**Issue 2**: Styling conflicts\nSolution: Check for CSS conflicts with other libraries.',
        isCollapsible: true,
        defaultCollapsed: true,
      },
    ],
  },
}; 
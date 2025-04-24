import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContextPanel, TextBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof ContextPanel> = {
  title: 'Surfaces/Context/ContextPanel',
  component: ContextPanel,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    placement: { control: 'select', options: ['left', 'right'] },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof ContextPanel>;

export const Basic: Story = {
  args: {
    id: 'context-panel-example',
    title: 'Documentation',
    placement: 'right',
    width: '300px',
    children: (
      <TextBlock 
        id="context-text" 
        content="This is contextual information that provides additional details about the current task or topic. It can include references, documentation, or related content."
      />
    ),
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
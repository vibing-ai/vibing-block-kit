import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Widget, TextBlock, CodeBlock } from '@vibing-ai/block-kit';

// Create a more complete props interface for storybook
interface WidgetStoryProps {
  id: string;
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  actions?: Array<{
    id: string;
    icon: string;
    tooltip: string;
    onClick: () => void;
  }>;
  statusIndicator?: {
    status: 'success' | 'warning' | 'error' | 'info';
    label: string;
  };
}

const meta = {
  title: 'Surfaces/Widget/Widget',
  component: Widget,
  tags: ['autodocs'],
  // Type argTypes as a generic Record to avoid type errors
  argTypes: {} as Record<string, unknown>,
} satisfies Meta<typeof Widget>;

export default meta;
type Story = StoryObj<WidgetStoryProps>;

export const Basic: Story = {
  args: {
    id: 'widget-example',
    title: 'Information Widget',
    children: React.createElement(TextBlock, {
      id: "widget-text",
      content: "This is a basic widget that can contain any Block Kit component. Widgets are useful for organizing content in a dashboard or sidebar."
    }),
  },
};

export const WithActions: Story = {
  args: {
    id: 'widget-actions-example',
    title: 'Quick Actions',
    actions: [
      { id: 'refresh', icon: 'refresh', tooltip: 'Refresh', onClick: () => {} },
      { id: 'settings', icon: 'settings', tooltip: 'Settings', onClick: () => {} },
    ],
    children: React.createElement('div', { style: { padding: '12px' } },
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' } },
        React.createElement('button', { style: { padding: '8px', background: '#f1f5f9', borderRadius: '4px', border: 'none' } }, 'New Project'),
        React.createElement('button', { style: { padding: '8px', background: '#f1f5f9', borderRadius: '4px', border: 'none' } }, 'Import Data'),
        React.createElement('button', { style: { padding: '8px', background: '#f1f5f9', borderRadius: '4px', border: 'none' } }, 'Export Report'),
        React.createElement('button', { style: { padding: '8px', background: '#f1f5f9', borderRadius: '4px', border: 'none' } }, 'Share Link')
      )
    ),
  },
};

export const Collapsible: Story = {
  args: {
    id: 'widget-collapsible-example',
    title: 'Code Snippet',
    collapsible: true,
    defaultCollapsed: false,
    children: React.createElement(CodeBlock, {
      id: "widget-code",
      language: "javascript",
      code: `function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

const items = [
  { name: 'Widget A', price: 10, quantity: 2 },
  { name: 'Widget B', price: 15, quantity: 1 },
  { name: 'Widget C', price: 5, quantity: 4 },
];

const total = calculateTotal(items);
// Format and return the total
return \`Total: $\${total}\`; // Outputs: Total: $50`
    }),
  },
};

export const WithStatus: Story = {
  args: {
    id: 'widget-status-example',
    title: 'System Status',
    statusIndicator: {
      status: 'success',
      label: 'Operational',
    },
    children: React.createElement('div', { style: { padding: '12px' } },
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          React.createElement('span', null, 'API Service'),
          React.createElement('span', { style: { color: '#10b981' } }, 'Online')
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          React.createElement('span', null, 'Database'),
          React.createElement('span', { style: { color: '#10b981' } }, 'Online')
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          React.createElement('span', null, 'Storage'),
          React.createElement('span', { style: { color: '#10b981' } }, 'Online')
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          React.createElement('span', null, 'Authentication'),
          React.createElement('span', { style: { color: '#10b981' } }, 'Online')
        )
      )
    ),
  },
}; 
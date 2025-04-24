import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Widget, TextBlock, CodeBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof Widget> = {
  title: 'Surfaces/Widget/Widget',
  component: Widget,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    collapsible: { control: 'boolean' },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof Widget>;

export const Basic: Story = {
  args: {
    id: 'widget-example',
    title: 'Information Widget',
    children: (
      <TextBlock 
        id="widget-text" 
        content="This is a basic widget that can contain any Block Kit component. Widgets are useful for organizing content in a dashboard or sidebar."
      />
    ),
  },
};

export const WithActions: Story = {
  args: {
    id: 'widget-actions-example',
    title: 'Quick Actions',
    actions: [
      { id: 'refresh', icon: 'refresh', tooltip: 'Refresh', onClick: () => console.log('Refresh clicked') },
      { id: 'settings', icon: 'settings', tooltip: 'Settings', onClick: () => console.log('Settings clicked') },
    ],
    children: (
      <div style={{ padding: '12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button style={{ padding: '8px', background: '#f1f5f9', borderRadius: '4px', border: 'none' }}>New Project</button>
          <button style={{ padding: '8px', background: '#f1f5f9', borderRadius: '4px', border: 'none' }}>Import Data</button>
          <button style={{ padding: '8px', background: '#f1f5f9', borderRadius: '4px', border: 'none' }}>Export Report</button>
          <button style={{ padding: '8px', background: '#f1f5f9', borderRadius: '4px', border: 'none' }}>Share Link</button>
        </div>
      </div>
    ),
  },
};

export const Collapsible: Story = {
  args: {
    id: 'widget-collapsible-example',
    title: 'Code Snippet',
    collapsible: true,
    defaultCollapsed: false,
    children: (
      <CodeBlock 
        id="widget-code"
        language="javascript"
        code={`function calculateTotal(items) {
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
console.log(\`Total: \$\${total}\`); // Output: Total: $50`}
      />
    ),
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
    children: (
      <div style={{ padding: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>API Service</span>
            <span style={{ color: '#10b981' }}>Online</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Database</span>
            <span style={{ color: '#10b981' }}>Online</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Storage</span>
            <span style={{ color: '#10b981' }}>Online</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Authentication</span>
            <span style={{ color: '#10b981' }}>Online</span>
          </div>
        </div>
      </div>
    ),
  },
}; 
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Simple image component for testing
const TestImage = ({ src, alt, width = '100%', height = 'auto' }: { src: string; alt: string; width?: string | number; height?: string | number }) => {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '10px', 
      borderRadius: '4px',
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>
      <img 
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          display: 'block',
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '2px'
        }}
        onError={(e) => console.error('Failed to load image', e)}
        onLoad={() => console.log('Image loaded successfully')}
      />
      <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#666' }}>
        Source: <code style={{ wordBreak: 'break-word' }}>{src}</code>
      </p>
    </div>
  );
};

const meta: Meta<typeof TestImage> = {
  title: 'Test/SimpleImage',
  component: TestImage,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
  args: {
    src: 'https://placehold.co/800x450/4f46e5/ffffff.png?text=Test+Image',
    alt: 'Test image',
    width: 800,
    height: 450,
  },
};

export default meta;
type Story = StoryObj<typeof TestImage>;

export const Default: Story = {};

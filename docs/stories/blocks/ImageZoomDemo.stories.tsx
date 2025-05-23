import type { Meta, StoryObj } from '@storybook/react';
import ImageZoomDemo from '../../../src/blocks/media-block/ImageZoomDemo';
import { ImageBlock } from '../../../src/blocks/media-block';

// Define the meta information for Storybook
export default {
  title: 'Blocks/Media/ImageZoomDemo',
  component: ImageZoomDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A demo showcasing the zoom feature of the ImageBlock component. Click on any image to enable the zoom functionality.',
      },
    },
  },
  tags: ['autodocs'],
} as Meta<typeof ImageZoomDemo>;

// Create the default story
export const Default: StoryObj<typeof ImageZoomDemo> = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the zoom functionality of the ImageBlock component with example images.',
      },
    },
  },
};

// Create a story with custom images
export const WithCustomImages: StoryObj<typeof ImageBlock> = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h1>Custom Image Gallery with Zoom</h1>
      <p>This example shows how you can create a custom image gallery with zoom functionality.</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '2rem',
      }}>
        <div>
          <ImageBlock
            id="custom-1"
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200"
            alt="Misty morning landscape"
            width="100%"
            height={400}
            zoomable
            caption="Misty morning - Click to zoom"
            borderRadius="lg"
            hasBorder
            loading="lazy"
          />
        </div>
        <div>
          <ImageBlock
            id="custom-2"
            src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1200"
            alt="Ocean waves crashing"
            width="100%"
            height={400}
            zoomable
            caption="Ocean waves - Click to zoom"
            borderRadius="lg"
            hasBorder
            loading="lazy"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom image gallery implementation with zoom functionality.',
      },
    },
  },
};

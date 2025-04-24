import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BlockGroup, TextBlock, ImageBlock, CodeBlock } from '@vibing/block-kit';

const meta: Meta<typeof BlockGroup> = {
  title: 'Composition/Container/BlockGroup',
  component: BlockGroup,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    collapsible: { control: 'boolean' },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof BlockGroup>;

export const Basic: Story = {
  args: {
    id: 'block-group-example',
    title: 'Getting Started',
    children: (
      <>
        <TextBlock
          id="intro-text"
          content="This is a basic block group that organizes related content together."
        />
        <TextBlock
          id="description-text"
          content="Block groups help create visual hierarchy and structure in your interface."
        />
      </>
    ),
  },
};

export const WithDividers: Story = {
  args: {
    id: 'block-group-dividers-example',
    title: 'Installation Guide',
    showDividers: true,
    children: (
      <>
        <TextBlock
          id="step-1"
          heading="Step 1: Install Package"
          content="Install the package from npm using your preferred package manager."
        />
        <CodeBlock
          id="install-example"
          language="bash"
          code="npm install @vibing/block-kit"
        />
        <TextBlock
          id="step-2"
          heading="Step 2: Import Components"
          content="Import the components you need in your application."
        />
        <CodeBlock
          id="usage-example"
          language="tsx"
          code="import { BlockContainer, TextBlock } from '@vibing/block-kit';"
        />
        <TextBlock
          id="step-3"
          heading="Step 3: Use Components"
          content="Use the components in your application as needed."
        />
      </>
    ),
  },
};

export const Collapsible: Story = {
  args: {
    id: 'block-group-collapsible-example',
    title: 'Advanced Configuration',
    collapsible: true,
    defaultCollapsed: false,
    children: (
      <>
        <TextBlock
          id="advanced-text"
          content="This section contains advanced configuration options that are not typically needed for basic usage."
        />
        <CodeBlock
          id="config-code"
          language="javascript"
          code={`// Advanced configuration example
const config = {
  theme: {
    accentColor: '#6366f1',
    borderRadius: '0.375rem',
    typography: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
    },
  },
  behavior: {
    animations: true,
    transitionDuration: 150,
  },
};`}
        />
      </>
    ),
  },
};

export const WithActions: Story = {
  args: {
    id: 'block-group-actions-example',
    title: 'Project Overview',
    actions: [
      { id: 'edit', icon: 'edit-2', tooltip: 'Edit Project', onClick: () => console.log('Edit clicked') },
      { id: 'share', icon: 'share-2', tooltip: 'Share Project', onClick: () => console.log('Share clicked') },
    ],
    children: (
      <>
        <TextBlock
          id="project-description"
          content="This is a showcase project demonstrating the capabilities of the Block Kit component library."
        />
        <ImageBlock
          id="project-image"
          src="https://placehold.co/600x300"
          alt="Project screenshot"
          caption="Screenshot of the project dashboard"
        />
      </>
    ),
  },
}; 
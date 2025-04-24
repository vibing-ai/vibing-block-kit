import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DocumentView, TextBlock, CodeBlock, ImageBlock, TableBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof DocumentView> = {
  title: 'Composition/Views/DocumentView',
  component: DocumentView,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    showToc: { control: 'boolean' },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof DocumentView>;

export const Basic: Story = {
  args: {
    id: 'document-view-example',
    title: 'Getting Started with Block Kit',
    blocks: [
      {
        id: 'intro',
        content: <TextBlock id="intro-text" heading="Introduction" content="Block Kit is a powerful component library for building AI-powered interfaces. This guide will help you get started with using Block Kit in your applications." />,
      },
      {
        id: 'installation',
        content: (
          <>
            <TextBlock id="installation-text" heading="Installation" content="You can install Block Kit using npm, yarn, or pnpm:" />
            <CodeBlock
              id="installation-code"
              language="bash"
              code="npm install @vibing-ai/block-kit"
            />
          </>
        ),
      },
      {
        id: 'usage',
        content: (
          <>
            <TextBlock id="usage-text" heading="Basic Usage" content="Import the components you need and use them in your application:" />
            <CodeBlock
              id="usage-code"
              language="jsx"
              code={`import React from 'react';
import { BlockContainer, TextBlock } from '@vibing-ai/block-kit';

const Example = () => {
  return (
    <BlockContainer id="container" layout="vertical" spacing="md">
      <TextBlock 
        id="text-block" 
        content="This is a simple text block" 
      />
    </BlockContainer>
  );
};`}
            />
          </>
        ),
      },
      {
        id: 'components',
        content: (
          <>
            <TextBlock id="components-text" heading="Available Components" content="Block Kit includes several categories of components:" />
            <TableBlock
              id="components-table"
              columns={[
                { header: 'Category', accessorKey: 'category' },
                { header: 'Description', accessorKey: 'description' },
                { header: 'Examples', accessorKey: 'examples' },
              ]}
              data={[
                { category: 'Blocks', description: 'Core content components', examples: 'TextBlock, ImageBlock, CodeBlock' },
                { category: 'Surfaces', description: 'Container components that provide context', examples: 'ConversationCard, ContextPanel' },
                { category: 'Composition', description: 'Layout and organization components', examples: 'BlockContainer, Grid' },
              ]}
            />
          </>
        ),
      },
      {
        id: 'example',
        content: (
          <>
            <TextBlock id="example-text" heading="Example" content="Here's a simple example of what you can build with Block Kit:" />
            <ImageBlock
              id="example-image"
              src="https://placehold.co/600x400"
              alt="Block Kit example"
              caption="Example of a Block Kit interface"
            />
          </>
        ),
      },
      {
        id: 'conclusion',
        content: <TextBlock id="conclusion-text" heading="Conclusion" content="Block Kit provides a flexible foundation for building AI-powered interfaces. Explore the documentation to learn more about the available components and how to use them effectively." />,
      },
    ],
    showToc: true,
  },
};

export const WithoutToc: Story = {
  args: {
    id: 'document-view-no-toc-example',
    title: 'Quick Reference Guide',
    blocks: [
      {
        id: 'intro',
        content: <TextBlock id="quick-intro-text" heading="Quick Reference" content="This is a quick reference guide without a table of contents." />,
      },
      {
        id: 'section-1',
        content: <TextBlock id="section-1-text" heading="Section 1" content="This is the content for section 1." />,
      },
      {
        id: 'section-2',
        content: <TextBlock id="section-2-text" heading="Section 2" content="This is the content for section 2." />,
      },
    ],
    showToc: false,
  },
};

export const WithMetadata: Story = {
  args: {
    id: 'document-view-metadata-example',
    title: 'Technical Specification',
    metadata: {
      author: 'John Doe',
      lastUpdated: 'June 15, 2023',
      version: '1.2.0',
      status: 'Draft',
    },
    blocks: [
      {
        id: 'summary',
        content: <TextBlock id="summary-text" heading="Executive Summary" content="This document outlines the technical specifications for the project." />,
      },
      {
        id: 'requirements',
        content: <TextBlock id="requirements-text" heading="Requirements" content="Detailed requirements for the implementation." />,
      },
      {
        id: 'architecture',
        content: <TextBlock id="architecture-text" heading="Architecture" content="Overview of the system architecture and components." />,
      },
    ],
    showToc: true,
  },
}; 
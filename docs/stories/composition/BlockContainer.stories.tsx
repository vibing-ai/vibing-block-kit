import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BlockContainer, TextBlock, ImageBlock } from '@vibing/block-kit';

const meta: Meta<typeof BlockContainer> = {
  title: 'Composition/Container/BlockContainer',
  component: BlockContainer,
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
    spacing: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof BlockContainer>;

export const Vertical: Story = {
  args: {
    id: 'block-container-vertical-example',
    layout: 'vertical',
    spacing: 'md',
    children: (
      <>
        <TextBlock
          id="text-1"
          content="This is a vertical container with multiple blocks stacked on top of each other."
        />
        <TextBlock
          id="text-2"
          content="Each block appears below the previous one, creating a natural reading flow."
        />
        <TextBlock
          id="text-3"
          content="This layout is ideal for content that should be read in sequence, like articles or documentation."
        />
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    id: 'block-container-horizontal-example',
    layout: 'horizontal',
    spacing: 'md',
    children: (
      <>
        <TextBlock
          id="text-1"
          content="This is a horizontal container."
          style={{ flex: 1 }}
        />
        <TextBlock
          id="text-2"
          content="Blocks are arranged side by side."
          style={{ flex: 1 }}
        />
        <TextBlock
          id="text-3"
          content="Good for comparisons or parallel content."
          style={{ flex: 1 }}
        />
      </>
    ),
  },
};

export const Nested: Story = {
  args: {
    id: 'block-container-nested-example',
    layout: 'vertical',
    spacing: 'lg',
    padding: 'md',
    background: 'gray.50',
    borderRadius: 'md',
    children: (
      <>
        <TextBlock
          id="header-text"
          content="Nested containers example"
          heading="Container Demo"
        />
        <BlockContainer
          id="inner-container"
          layout="horizontal"
          spacing="md"
          children={
            <>
              <ImageBlock
                id="image-1"
                src="https://placehold.co/200x150"
                alt="Example image"
                style={{ flex: 1 }}
              />
              <BlockContainer
                id="text-container"
                layout="vertical"
                spacing="sm"
                style={{ flex: 2 }}
                children={
                  <>
                    <TextBlock
                      id="inner-text-1"
                      content="This is a nested container structure."
                    />
                    <TextBlock
                      id="inner-text-2"
                      content="The outer container is vertical, while this inner container is also vertical."
                    />
                    <TextBlock
                      id="inner-text-3"
                      content="Nested containers let you create complex layouts with simple components."
                    />
                  </>
                }
              />
            </>
          }
        />
      </>
    ),
  },
}; 
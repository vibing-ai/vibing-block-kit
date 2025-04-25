import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BlockModal, TextBlock, FormBlock } from '@vibing-ai/block-kit';

// Define interface for the story props
interface BlockModalStoryProps {
  id?: string;
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children?: React.ReactNode;
}

const meta = {
  title: 'Surfaces/Modal/BlockModal',
  component: BlockModal,
  tags: ['autodocs'],
  // Type argTypes as a generic Record to avoid type errors
  argTypes: {} as Record<string, any>,
} satisfies Meta<typeof BlockModal>;

export default meta;
type Story = StoryObj<BlockModalStoryProps>;

export const Basic: Story = {
  args: {
    id: 'block-modal-example',
    title: 'Information',
    isOpen: true,
    onClose: () => {},
    children: React.createElement(TextBlock, {
      id: "modal-text",
      content: "This is a modal dialog that can contain any Block Kit component. It provides a focused way to present information or gather user input."
    }),
  },
};

export const WithForm: Story = {
  args: {
    id: 'block-modal-form-example',
    title: 'Create New Project',
    isOpen: true,
    onClose: () => {},
    size: 'md',
    children: React.createElement(FormBlock, {
      id: "modal-form",
      children: React.createElement('div', null, [
        React.createElement('div', { key: 'field-1', className: 'form-field' }, [
          React.createElement('label', { htmlFor: 'projectName' }, 'Project Name'),
          React.createElement('input', { 
            id: 'projectName', 
            type: 'text', 
            placeholder: 'Enter project name', 
            required: true 
          })
        ]),
        React.createElement('div', { key: 'field-2', className: 'form-field' }, [
          React.createElement('label', { htmlFor: 'description' }, 'Description'),
          React.createElement('textarea', { 
            id: 'description', 
            placeholder: 'Enter project description', 
            rows: 4 
          })
        ]),
        React.createElement('div', { key: 'field-3', className: 'form-field' }, [
          React.createElement('label', { htmlFor: 'category' }, 'Category'),
          React.createElement('select', { id: 'category' }, [
            React.createElement('option', { value: 'web' }, 'Web Development'),
            React.createElement('option', { value: 'mobile' }, 'Mobile App'),
            React.createElement('option', { value: 'data' }, 'Data Science'),
            React.createElement('option', { value: 'ai' }, 'Artificial Intelligence')
          ])
        ])
      ])
    })
  },
};

export const FullScreen: Story = {
  args: {
    id: 'block-modal-fullscreen-example',
    title: 'Document Preview',
    isOpen: true,
    onClose: () => {},
    size: 'full',
    children: React.createElement('div', { style: { padding: '20px' } },
      React.createElement(TextBlock, {
        id: "fullscreen-text",
        content: "This is a fullscreen modal that can be used for detailed views or complex interactions. It provides maximum space while still maintaining the modal context."
      }),
      React.createElement('div', { 
        style: { 
          height: '400px', 
          background: '#f8fafc', 
          marginTop: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        } 
      }, "Document preview content would appear here")
    ),
  },
}; 
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BlockModal, TextBlock, FormBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof BlockModal> = {
  title: 'Surfaces/Modal/BlockModal',
  component: BlockModal,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    isOpen: { control: 'boolean' },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof BlockModal>;

export const Basic: Story = {
  args: {
    id: 'block-modal-example',
    title: 'Information',
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    children: (
      <TextBlock 
        id="modal-text" 
        content="This is a modal dialog that can contain any Block Kit component. It provides a focused way to present information or gather user input."
      />
    ),
  },
};

export const WithForm: Story = {
  args: {
    id: 'block-modal-form-example',
    title: 'Create New Project',
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    size: 'md',
    children: (
      <FormBlock
        id="modal-form"
        fields={[
          {
            id: 'projectName',
            label: 'Project Name',
            type: 'text',
            placeholder: 'Enter project name',
            required: true,
          },
          {
            id: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Enter project description',
            rows: 4,
          },
          {
            id: 'category',
            label: 'Category',
            type: 'select',
            options: [
              { value: 'web', label: 'Web Development' },
              { value: 'mobile', label: 'Mobile App' },
              { value: 'data', label: 'Data Science' },
              { value: 'ai', label: 'Artificial Intelligence' },
            ],
          },
        ]}
        submitLabel="Create Project"
      />
    ),
  },
};

export const FullScreen: Story = {
  args: {
    id: 'block-modal-fullscreen-example',
    title: 'Document Preview',
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    size: 'full',
    children: (
      <div style={{ padding: '20px' }}>
        <TextBlock 
          id="fullscreen-text" 
          content="This is a fullscreen modal that can be used for detailed views or complex interactions. It provides maximum space while still maintaining the modal context."
        />
        <div style={{ height: '400px', background: '#f8fafc', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Document preview content would appear here
        </div>
      </div>
    ),
  },
}; 
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormBlock } from '@vibing/block-kit';

const meta: Meta<typeof FormBlock> = {
  title: 'Blocks/Interactive/FormBlock',
  component: FormBlock,
  tags: ['autodocs'],
  argTypes: {
    fields: { control: 'object' },
    onSubmit: { action: 'submitted' },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof FormBlock>;

export const Basic: Story = {
  args: {
    id: 'form-block-example',
    fields: [
      {
        id: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter your name',
        required: true,
      },
      {
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email address',
        required: true,
      },
      {
        id: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Enter your message',
        rows: 4,
      },
    ],
    submitLabel: 'Submit',
  },
};

export const WithValidation: Story = {
  args: {
    id: 'form-block-validation-example',
    fields: [
      {
        id: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter a username',
        required: true,
        validation: {
          minLength: 3,
          maxLength: 20,
          pattern: '^[a-zA-Z0-9_]+$',
          message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores',
        },
      },
      {
        id: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        validation: {
          minLength: 8,
          message: 'Password must be at least 8 characters',
        },
      },
    ],
    submitLabel: 'Create Account',
  },
};

export const WithDefaultValues: Story = {
  args: {
    id: 'form-block-default-values-example',
    fields: [
      {
        id: 'firstName',
        label: 'First Name',
        type: 'text',
      },
      {
        id: 'lastName',
        label: 'Last Name',
        type: 'text',
      },
      {
        id: 'newsletter',
        label: 'Subscribe to newsletter',
        type: 'checkbox',
      },
    ],
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      newsletter: true,
    },
    submitLabel: 'Save',
  },
}; 
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormBuilder } from '@vibing-ai/block-kit';

// Define a custom interface for the story props
interface FormBuilderStoryProps {
  id?: string;
  schema?: {
    title?: string;
    description?: string;
    fields?: Array<{
      id: string;
      label: string;
      type: string;
      placeholder?: string;
      required?: boolean;
      validation?: {
        minLength?: number;
        maxLength?: number;
        message?: string;
      };
      min?: number;
      step?: number;
      options?: Array<{
        value: string;
        label: string;
      }>;
      defaultValue?: any;
      rows?: number;
      itemTemplate?: {
        type: string;
        placeholder?: string;
      };
      addButtonLabel?: string;
      minItems?: number;
      maxItems?: number;
    }>;
    sections?: Array<{
      title?: string;
      fields: Array<{
        id: string;
        label: string;
        type: string;
        placeholder?: string;
        required?: boolean;
        options?: Array<{
          value: string;
          label: string;
        }>;
        defaultValue?: any;
      }>;
    }>;
  };
  submitLabel?: string;
  resetLabel?: string;
}

const meta = {
  title: 'Surfaces/Form/FormBuilder',
  component: FormBuilder,
  tags: ['autodocs'],
  // Type argTypes as a generic Record to avoid type errors
  argTypes: {} as Record<string, any>,
} satisfies Meta<typeof FormBuilder>;

export default meta;
type Story = StoryObj<FormBuilderStoryProps>;

export const Basic: Story = {
  args: {
    id: 'form-builder-example',
    schema: {
      title: 'Contact Form',
      fields: [
        {
          id: 'name',
          label: 'Full Name',
          type: 'text',
          placeholder: 'Enter your full name',
          required: true,
        },
        {
          id: 'email',
          label: 'Email Address',
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
          required: true,
        },
      ],
    },
    submitLabel: 'Submit',
  },
};

export const WithSections: Story = {
  args: {
    id: 'form-builder-sections-example',
    schema: {
      title: 'User Registration',
      sections: [
        {
          title: 'Account Information',
          fields: [
            {
              id: 'username',
              label: 'Username',
              type: 'text',
              required: true,
            },
            {
              id: 'email',
              label: 'Email Address',
              type: 'email',
              required: true,
            },
            {
              id: 'password',
              label: 'Password',
              type: 'password',
              required: true,
            },
          ],
        },
        {
          title: 'Personal Information',
          fields: [
            {
              id: 'firstName',
              label: 'First Name',
              type: 'text',
              required: true,
            },
            {
              id: 'lastName',
              label: 'Last Name',
              type: 'text',
              required: true,
            },
            {
              id: 'birthdate',
              label: 'Date of Birth',
              type: 'date',
            },
          ],
        },
        {
          title: 'Preferences',
          fields: [
            {
              id: 'theme',
              label: 'Theme Preference',
              type: 'select',
              options: [
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System Default' },
              ],
              defaultValue: 'system',
            },
            {
              id: 'notifications',
              label: 'Email Notifications',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
      ],
    },
    submitLabel: 'Create Account',
  },
};

export const Advanced: Story = {
  args: {
    id: 'form-builder-advanced-example',
    schema: {
      title: 'Product Configuration',
      description: 'Configure your product with the options below.',
      fields: [
        {
          id: 'productName',
          label: 'Product Name',
          type: 'text',
          placeholder: 'Enter product name',
          required: true,
          validation: {
            minLength: 3,
            maxLength: 50,
            message: 'Product name must be between 3 and 50 characters',
          },
        },
        {
          id: 'category',
          label: 'Category',
          type: 'select',
          options: [
            { value: 'electronics', label: 'Electronics' },
            { value: 'clothing', label: 'Clothing' },
            { value: 'home', label: 'Home & Garden' },
            { value: 'books', label: 'Books' },
          ],
          required: true,
        },
        {
          id: 'price',
          label: 'Price ($)',
          type: 'number',
          min: 0.01,
          step: 0.01,
          required: true,
        },
        {
          id: 'features',
          label: 'Features',
          type: 'array',
          itemTemplate: {
            type: 'text',
            placeholder: 'Enter a feature',
          },
          addButtonLabel: 'Add Feature',
          minItems: 1,
          maxItems: 10,
        },
        {
          id: 'description',
          label: 'Description',
          type: 'rich-text',
          required: true,
        },
        {
          id: 'available',
          label: 'Available for Purchase',
          type: 'switch',
          defaultValue: true,
        },
      ],
    },
    submitLabel: 'Save Configuration',
    resetLabel: 'Reset Form',
  },
}; 
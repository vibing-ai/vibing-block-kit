import type { Meta, StoryObj } from '@storybook/react';
import { FormBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof FormBlock> = {
  title: 'Blocks/Interactive/FormBlock',
  component: FormBlock,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The FormBlock component provides a flexible and customizable form builder with built-in validation and error handling.
### Features
- Multiple field types (Text, Email, Number, Select, Checkbox, Radio, Textarea, Date)
- Built-in validation system
- Customizable layouts (Vertical, Horizontal, Grid)
- Error state handling
- Responsive design
- Accessibility support
        `,
      },
    },
  },
} satisfies Meta<typeof FormBlock>;

export default meta;
type Story = StoryObj<typeof FormBlock>;

const sampleFields = [
  {
    id: 'name',
    type: 'text' as const,
    label: 'Full Name',
    required: true,
  },
  {
    id: 'email',
    type: 'email' as const,
    label: 'Email Address',
    required: true,
    validation: {
      pattern: /^\S+@\S+\.\S+$/,
      message: 'Please enter a valid email address',
    },
  },
  {
    id: 'message',
    type: 'textarea' as const,
    label: 'Message',
    required: true,
  },
];

export const BasicForm: Story = {
  args: {
    id: 'contact-form',
    fields: sampleFields,
    submitButton: {
      text: 'Send Message',
      variant: 'primary',
    },
  },
};

export const AllFieldTypes: Story = {
  args: {
    id: 'all-fields-form',
    fields: [
      {
        id: 'Name',
        type: 'text' as const,
        label: 'Name',
        required: true,
        placeholder: 'Enter your Full Name',
      },
      {
        id: 'selectInput',
        type: 'select' as const,
        label: 'Select Input',
        required: false,
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ],
      },
      {
        id: 'checkboxInput',
        type: 'checkbox' as const,
        label: 'Checkbox Input',
        required: false,
        options: [
          { label: 'I agree to the terms', value: 'agree' }
        ],
      },
      {
        id: 'radioInput',
        type: 'radio' as const,
        label: 'Radio Input',
        required: false,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
      {
        id: 'textarea',
        type: 'textarea' as const,
        label: 'Textarea Input',
        placeholder: 'Enter long text',
      },
      {
        id: 'date',
        type: 'date' as const,
        label: 'Date Input',
      },
    ],
    submitButton: {
      text: 'Submit Form',
      variant: 'primary',
    },
  },
};

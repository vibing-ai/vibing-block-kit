import { Meta, StoryObj } from '@storybook/react';
import { FormBlock } from '../../../src/blocks/interactive-block/FormBlock';
import type { FormField } from '../../../src/blocks/interactive-block/FormBlock';

const meta: Meta<typeof FormBlock> = {
  title: 'Blocks/Interactive/FormBlock (Enhanced)',
  component: FormBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Enhanced FormBlock component with comprehensive form functionality including validation, various field types, and responsive layouts.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
};

export default meta;
type Story = StoryObj<typeof FormBlock>;

// Sample field configurations - only the simplest field types
const basicFormFields: FormField[] = [
  {
    id: 'name',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'your.email@example.com',
    required: true,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    patternMessage: 'Please enter a valid email address',
    helpText: 'We will never share your email with anyone else.',
  },
  {
    id: 'message',
    type: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message',
    required: true,
  },
];

// Minimal version with only the most basic field types
const minimalSafeFields: FormField[] = [
  {
    id: 'name',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'your.email@example.com',
    required: true,
  },
  {
    id: 'comments',
    type: 'textarea',
    label: 'Additional Comments',
    placeholder: 'Enter any additional information',
    helpText: 'Optional but appreciated',
  },
];

// For reference only - not used in stories
const allFormFields: FormField[] = [
  ...minimalSafeFields,
  {
    id: 'phone',
    type: 'tel',
    label: 'Phone Number',
    placeholder: '(123) 456-7890',
    pattern: '^\\(\\d{3}\\)\\s\\d{3}-\\d{4}$',
    patternMessage: 'Please enter a phone number in the format (123) 456-7890',
  },
  {
    id: 'birthdate',
    type: 'date',
    label: 'Birth Date',
    required: true,
  },
  {
    id: 'department',
    type: 'select',
    label: 'Department',
    placeholder: 'Select a department',
    required: true,
    options: [
      { label: 'Marketing', value: 'marketing' },
      { label: 'Sales', value: 'sales' },
      { label: 'Engineering', value: 'engineering' },
      { label: 'Human Resources', value: 'hr' },
      { label: 'Customer Support', value: 'support' },
    ],
  },
  {
    id: 'interests',
    type: 'checkbox',
    label: 'Areas of Interest',
    options: [
      { label: 'Product Updates', value: 'products' },
      { label: 'Industry News', value: 'news' },
      { label: 'Company Events', value: 'events' },
      { label: 'Training Opportunities', value: 'training' },
    ],
    multiple: true,
  },
  {
    id: 'experience',
    type: 'radio',
    label: 'Years of Experience',
    required: true,
    options: [
      { label: 'Less than 1 year', value: '<1' },
      { label: '1-3 years', value: '1-3' },
      { label: '3-5 years', value: '3-5' },
      { label: '5+ years', value: '5+' },
    ],
  },
];

// Basic form
export const BasicForm: Story = {
  args: {
    id: 'basic-form',
    fields: basicFormFields,
    submitLabel: 'Submit',
    className: 'max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md',
  },
};

// Advanced form with all field types
export const AdvancedForm: Story = {
  args: {
    id: 'advanced-form',
    fields: minimalSafeFields, // Using the minimal version with only text, email, and textarea
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    successMessage: 'Form submitted successfully!',
    className: 'max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md',
  },
};

// Grid layout
export const GridLayout: Story = {
  args: {
    id: 'grid-form',
    fields: minimalSafeFields, // Using the minimal version with only text, email, and textarea
    layout: 'grid',
    gridColumns: 2,
    submitLabel: 'Submit',
    className: 'max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md',
  },
};

// Horizontal layout
export const HorizontalLayout: Story = {
  args: {
    id: 'horizontal-form',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        required: true,
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        required: true,
      },
    ],
    layout: 'horizontal',
    submitLabel: 'Subscribe',
    className: 'max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md',
  },
};

// Form with validation errors
export const WithErrors: Story = {
  args: {
    id: 'error-form',
    fields: basicFormFields,
    submitLabel: 'Submit',
    initialValues: {
      name: '',
      email: 'invalid-email',
      message: '',
    },
    error: 'There are validation errors in the form.',
    className: 'max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a form with validation errors.',
      },
    },
  },
}; 
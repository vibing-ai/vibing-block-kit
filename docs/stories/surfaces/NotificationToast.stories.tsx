import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationToast } from '@vibing/block-kit';

const meta: Meta<typeof NotificationToast> = {
  title: 'Surfaces/Notification/NotificationToast',
  component: NotificationToast,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    type: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof NotificationToast>;

export const Info: Story = {
  args: {
    id: 'notification-toast-info-example',
    title: 'Information',
    message: 'This is an informational notification.',
    type: 'info',
    isVisible: true,
    duration: 5000,
    onClose: () => console.log('Notification closed'),
  },
};

export const Success: Story = {
  args: {
    id: 'notification-toast-success-example',
    title: 'Success',
    message: 'The operation completed successfully.',
    type: 'success',
    isVisible: true,
    duration: 5000,
    onClose: () => console.log('Notification closed'),
  },
};

export const Warning: Story = {
  args: {
    id: 'notification-toast-warning-example',
    title: 'Warning',
    message: 'This action may have unintended consequences.',
    type: 'warning',
    isVisible: true,
    duration: 5000,
    onClose: () => console.log('Notification closed'),
  },
};

export const Error: Story = {
  args: {
    id: 'notification-toast-error-example',
    title: 'Error',
    message: 'An error occurred while processing your request.',
    type: 'error',
    isVisible: true,
    duration: 5000,
    onClose: () => console.log('Notification closed'),
  },
};

export const WithAction: Story = {
  args: {
    id: 'notification-toast-action-example',
    title: 'File Saved',
    message: 'Your file has been saved successfully.',
    type: 'success',
    isVisible: true,
    duration: 8000,
    action: {
      label: 'View File',
      onClick: () => console.log('Action clicked'),
    },
    onClose: () => console.log('Notification closed'),
  },
}; 
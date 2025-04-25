import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationToast } from '@vibing-ai/block-kit';

// Define interface for the story props
interface NotificationToastStoryProps {
  id?: string;
  title?: string;
  message?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  isVisible?: boolean;
  duration?: number;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const meta = {
  title: 'Surfaces/Notification/NotificationToast',
  component: NotificationToast,
  tags: ['autodocs'],
  // Type argTypes as a generic Record to avoid type errors
  argTypes: {} as Record<string, any>,
} satisfies Meta<typeof NotificationToast>;

export default meta;
type Story = StoryObj<NotificationToastStoryProps>;

export const Info: Story = {
  args: {
    id: 'notification-toast-info-example',
    title: 'Information',
    message: 'This is an informational notification.',
    type: 'info',
    isVisible: true,
    duration: 5000,
    onClose: () => {},
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
    onClose: () => {},
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
    onClose: () => {},
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
    onClose: () => {},
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
      onClick: () => {},
    },
    onClose: () => {},
  },
}; 
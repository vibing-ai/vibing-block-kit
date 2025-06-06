import type { Meta, StoryObj } from '@storybook/react';
import { PromptContainerFullLineBottomActionsLarge } from '@/blocks/prompt/PromptContainerFullLineBottomActionsLarge';
import { Button } from '@/components/ui/button';
import { Send, Mic, Paperclip } from 'lucide-react';

const meta: Meta<typeof PromptContainerFullLineBottomActionsLarge> = {
  title: 'Blocks/Prompt/PromptContainerFullLineBottomActionsLarge',
  component: PromptContainerFullLineBottomActionsLarge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PromptContainerFullLineBottomActionsLarge>;

const defaultActionButtons = (
  <>
    <Button variant="ghost" size="icon">
      <Paperclip className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon">
      <Mic className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon">
      <Send className="h-4 w-4" />
    </Button>
  </>
);

export const Default: Story = {
  args: {
    placeholder: 'Type your message...',
    actionButtons: defaultActionButtons,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Type your message...',
    actionButtons: defaultActionButtons,
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    placeholder: 'Type your message...',
    actionButtons: defaultActionButtons,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Type your message...',
    actionButtons: defaultActionButtons,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Type your message...',
    actionButtons: defaultActionButtons,
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is a sample message that shows how the component looks with content.',
    placeholder: 'Type your message...',
    actionButtons: defaultActionButtons,
  },
}; 
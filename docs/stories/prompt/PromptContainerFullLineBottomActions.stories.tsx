import type { Meta, StoryObj } from '@storybook/react';
import { PromptContainerFullLineBottomActions } from '@/blocks/prompt/PromptContainerFullLineBottomActions';
import { Button } from '@/components/ui/button';
import { Paperclip, Mic, Send } from 'lucide-react';

const meta: Meta<typeof PromptContainerFullLineBottomActions> = {
  title: 'Blocks/Prompt/PromptContainerFullLineBottomActions',
  component: PromptContainerFullLineBottomActions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PromptContainerFullLineBottomActions>;

const defaultActionButtons = (
  <>
    <Button variant="ghost" size="icon" aria-label="Attach file">
      <Paperclip className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon" aria-label="Use microphone">
      <Mic className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon" aria-label="Send message">
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

export const WithValue: Story = {
  args: {
    value: 'This is a sample message',
    actionButtons: defaultActionButtons,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'This input is disabled',
    actionButtons: defaultActionButtons,
  },
};

export const CustomActionButtons: Story = {
  args: {
    actionButtons: (
      <>
        <Button variant="ghost" size="icon" aria-label="Custom action 1">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Custom action 2">
          <Mic className="h-4 w-4" />
        </Button>
      </>
    ),
  },
}; 
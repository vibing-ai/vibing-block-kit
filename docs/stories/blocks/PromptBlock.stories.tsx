import type { Meta, StoryObj } from '@storybook/react';
import { PromptContainerFullLineBottomActionsBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof PromptContainerFullLineBottomActionsBlock> = {
  title: 'Blocks/Prompt/PromptContainerFullLineBottomActionsBlock',
  component: PromptContainerFullLineBottomActionsBlock,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PromptContainerFullLineBottomActionsBlock>;

export const Default: Story = {
  args: {
    placeholder: 'Enter a prompt here',
  },
};

export const Disabled: Story = {
  args: {
    value: 'This is disabled prompt block',
    disabled: true,
  },
};

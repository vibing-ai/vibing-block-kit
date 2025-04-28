import type { Meta, StoryObj } from '@storybook/react';
import { TabBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof TabBlock> = {
  title: 'Blocks/TabBlock',
  component: TabBlock,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    mobileMode: {
      control: 'select',
      options: ['tabs', 'accordion'],
    },
    syncWithUrl: {
      control: 'boolean',
    },
    defaultTab: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabBlock>;

export const Default: Story = {
  args: {
    id: 'example-tabs',
    tabs: [
      {
        id: 'tab1',
        label: 'First Tab',
        icon: 'mdi:home',
        content: <div className="p-4">Content for first tab</div>,
      },
      {
        id: 'tab2',
        label: 'Second Tab',
        icon: 'mdi:information',
        content: <div className="p-4">Content for second tab</div>,
      },
      {
        id: 'tab3',
        label: 'Third Tab',
        icon: 'mdi:cog',
        content: <div className="p-4">Content for third tab</div>,
      },
    ],
  },
};

export const Vertical: Story = {
  args: {
    ...Default.args,
    layout: 'vertical',
  },
};

export const WithoutIcons: Story = {
  args: {
    ...Default.args,
    tabs: Default.args!.tabs.map(({ id, label, content }) => ({
      id,
      label,
      content,
    })),
  },
};

export const MobileAccordion: Story = {
  args: {
    ...Default.args,
    mobileMode: 'accordion',
  },
};

export const WithURLSync: Story = {
  args: {
    ...Default.args,
    syncWithUrl: true,
  },
};

export const CustomDefaultTab: Story = {
  args: {
    ...Default.args,
    defaultTab: 'tab2',
  },
};
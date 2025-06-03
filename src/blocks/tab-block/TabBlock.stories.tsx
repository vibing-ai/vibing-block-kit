import React from 'react';
import { TabBlock } from './TabBlock';
import type { TabBlockProps } from './TabBlock.types';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

export default {
  title: 'Blocks/TabBlock',
  component: TabBlock,
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
  },
};

const tabs: TabBlockProps['tabs'] = [
  {
    label: 'Home',
    key: 'home',
    icon: <FaHome />,
    content: <div>Welcome to the Home tab!</div>,
  },
  {
    label: 'Profile',
    key: 'profile',
    icon: <FaUser />,
    content: <div>This is your profile.</div>,
  },
  {
    label: 'Settings',
    key: 'settings',
    icon: <FaCog />,
    content: <div>Adjust your settings here.</div>,
    disabled: false,
  },
];

export const Default = (args: Partial<TabBlockProps>) => (
  <TabBlock {...args} tabs={tabs} />
);

Default.args = {
  orientation: 'horizontal',
  responsiveBreakpoint: 600,
  defaultActiveKey: 'home',
};
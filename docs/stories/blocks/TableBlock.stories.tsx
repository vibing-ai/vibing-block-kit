import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TableBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof TableBlock> = {
  title: 'Blocks/Data/TableBlock',
  component: TableBlock,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'object' },
    data: { control: 'object' },
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TableBlock>;

export const Basic: Story = {
  args: {
    id: 'table-block-example',
    columns: [
      { header: 'Name', accessor: 'name' },
      { header: 'Age', accessor: 'age' },
      { header: 'Status', accessor: 'status' },
    ],
    data: [
      { name: 'John Doe', age: 28, status: 'Active' },
      { name: 'Jane Smith', age: 34, status: 'Inactive' },
      { name: 'Bob Johnson', age: 45, status: 'Active' },
    ],
  },
};

export const WithTitle: Story = {
  args: {
    id: 'table-block-title-example',
    columns: [
      { header: 'Name', accessor: 'name' },
      { header: 'Age', accessor: 'age' },
      { header: 'Status', accessor: 'status' },
    ],
    data: [
      { name: 'John Doe', age: 28, status: 'Active' },
      { name: 'Jane Smith', age: 34, status: 'Inactive' },
      { name: 'Bob Johnson', age: 45, status: 'Active' },
    ],
  },
};

export const Customized: Story = {
  args: {
    id: 'table-block-customized-example',
    columns: [
      { header: 'Name', accessor: 'name' },
      { header: 'Age', accessor: 'age' },
      { header: 'Status', accessor: 'status' },
    ],
    data: [
      { name: 'John Doe', age: 28, status: 'Active' },
      { name: 'Jane Smith', age: 34, status: 'Inactive' },
      { name: 'Bob Johnson', age: 45, status: 'Active' },
    ],
    striped: true,
    bordered: true,
    compact: true,
  },
}; 
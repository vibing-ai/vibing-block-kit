import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TableBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof TableBlock> = {
  title: 'Blocks/Data/TableBlock',
  component: TableBlock,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'object' },
    data: { control: 'object' },
    // Add other controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof TableBlock>;

export const Basic: Story = {
  args: {
    id: 'table-block-example',
    columns: [
      { header: 'Name', accessorKey: 'name' },
      { header: 'Age', accessorKey: 'age' },
      { header: 'Status', accessorKey: 'status' },
    ],
    data: [
      { name: 'John Doe', age: 28, status: 'Active' },
      { name: 'Jane Smith', age: 34, status: 'Inactive' },
      { name: 'Bob Johnson', age: 45, status: 'Active' },
    ],
  },
};

export const WithPagination: Story = {
  args: {
    id: 'table-block-pagination-example',
    columns: [
      { header: 'Name', accessorKey: 'name' },
      { header: 'Age', accessorKey: 'age' },
      { header: 'Status', accessorKey: 'status' },
    ],
    data: [
      { name: 'John Doe', age: 28, status: 'Active' },
      { name: 'Jane Smith', age: 34, status: 'Inactive' },
      { name: 'Bob Johnson', age: 45, status: 'Active' },
      { name: 'Alice Williams', age: 29, status: 'Active' },
      { name: 'Charlie Brown', age: 38, status: 'Inactive' },
    ],
    pagination: true,
    pageSize: 2,
  },
};

export const WithSorting: Story = {
  args: {
    id: 'table-block-sorting-example',
    columns: [
      { header: 'Name', accessorKey: 'name' },
      { header: 'Age', accessorKey: 'age' },
      { header: 'Status', accessorKey: 'status' },
    ],
    data: [
      { name: 'John Doe', age: 28, status: 'Active' },
      { name: 'Jane Smith', age: 34, status: 'Inactive' },
      { name: 'Bob Johnson', age: 45, status: 'Active' },
    ],
    sorting: true,
  },
}; 
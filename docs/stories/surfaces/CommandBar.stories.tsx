import type { Meta, StoryObj } from '@storybook/react';
import { CommandBar } from '@vibing-ai/block-kit';

// Define interfaces for commands
interface Command {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  keywords?: string[];
}

// Define interface for the story props
interface CommandBarStoryProps {
  id?: string;
  placeholder?: string;
  isOpen?: boolean;
  commands?: Command[];
  commandGroups?: Array<{
    id: string;
    label: string;
    commands: Command[];
  }>;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  searchResults?: Array<{
    id: string;
    label: string;
    icon?: string;
    description?: string;
    matchedTerms?: string[];
  }>;
  onSelect?: (item: unknown) => void;
}

const meta = {
  title: 'Surfaces/Command/CommandBar',
  component: CommandBar,
  tags: ['autodocs'],
  // Type argTypes as a generic Record to avoid type errors
  argTypes: {} as Record<string, unknown>,
} satisfies Meta<typeof CommandBar>;

export default meta;
type Story = StoryObj<CommandBarStoryProps>;

export const Basic: Story = {
  args: {
    id: 'command-bar-example',
    placeholder: 'Type a command or search...',
    isOpen: true,
    commands: [
      {
        id: 'create',
        label: 'Create New',
        icon: 'plus',
        description: 'Create a new item',
        keywords: ['new', 'add', 'create'],
      },
      {
        id: 'open',
        label: 'Open File',
        icon: 'folder-open',
        description: 'Open an existing file',
        keywords: ['open', 'file', 'load'],
      },
      {
        id: 'save',
        label: 'Save',
        icon: 'save',
        description: 'Save the current file',
        keywords: ['save', 'store'],
      },
      {
        id: 'export',
        label: 'Export',
        icon: 'download',
        description: 'Export the current project',
        keywords: ['export', 'download'],
      },
    ],
    onSelect: () => {},
  },
};

export const WithGroups: Story = {
  args: {
    id: 'command-bar-groups-example',
    placeholder: 'Type a command or search...',
    isOpen: true,
    commandGroups: [
      {
        id: 'recent',
        label: 'Recent',
        commands: [
          {
            id: 'project-a',
            label: 'Project A',
            icon: 'file',
            description: 'Last edited 2 hours ago',
          },
          {
            id: 'project-b',
            label: 'Project B',
            icon: 'file',
            description: 'Last edited yesterday',
          },
        ],
      },
      {
        id: 'actions',
        label: 'Actions',
        commands: [
          {
            id: 'new-project',
            label: 'New Project',
            icon: 'plus',
            description: 'Create a new project',
          },
          {
            id: 'settings',
            label: 'Settings',
            icon: 'settings',
            description: 'Open application settings',
          },
          {
            id: 'help',
            label: 'Help',
            icon: 'help-circle',
            description: 'View help documentation',
          },
        ],
      },
    ],
    onSelect: () => {},
  },
};

export const WithSearch: Story = {
  args: {
    id: 'command-bar-search-example',
    placeholder: 'Search documents...',
    isOpen: true,
    showSearch: true,
    onSearch: () => {},
    searchResults: [
      {
        id: 'doc-1',
        label: 'Getting Started Guide',
        icon: 'file-text',
        description: 'Introduction to the Block Kit',
        matchedTerms: ['guide', 'introduction'],
      },
      {
        id: 'doc-2',
        label: 'Component API Reference',
        icon: 'code',
        description: 'Detailed API documentation for all components',
        matchedTerms: ['api', 'reference', 'documentation'],
      },
      {
        id: 'doc-3',
        label: 'Styling Guide',
        icon: 'palette',
        description: 'Customizing the appearance of components',
        matchedTerms: ['style', 'customize', 'appearance'],
      },
    ],
    onSelect: () => {},
  },
}; 
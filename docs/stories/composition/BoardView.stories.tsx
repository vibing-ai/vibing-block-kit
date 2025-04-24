import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BoardView, TextBlock, ImageBlock, CodeBlock } from '@vibing/block-kit';

const meta: Meta<typeof BoardView> = {
  title: 'Composition/Views/BoardView',
  component: BoardView,
  tags: ['autodocs'],
  argTypes: {
    // Add controls as needed
  },
};

export default meta;
type Story = StoryObj<typeof BoardView>;

export const KanbanBoard: Story = {
  args: {
    id: 'board-view-kanban-example',
    title: 'Project Tasks',
    columns: [
      {
        id: 'column-1',
        title: 'Backlog',
        items: [
          {
            id: 'item-1',
            content: (
              <TextBlock
                id="task-1"
                heading="User Authentication"
                content="Implement user authentication with OAuth 2.0 and JWT tokens."
              />
            ),
          },
          {
            id: 'item-2',
            content: (
              <TextBlock
                id="task-2"
                heading="API Documentation"
                content="Create comprehensive API documentation using Swagger."
              />
            ),
          },
          {
            id: 'item-3',
            content: (
              <TextBlock
                id="task-3"
                heading="Database Schema"
                content="Design initial database schema for user management."
              />
            ),
          },
        ],
      },
      {
        id: 'column-2',
        title: 'In Progress',
        items: [
          {
            id: 'item-4',
            content: (
              <TextBlock
                id="task-4"
                heading="UI Components"
                content="Develop core UI components for the application."
              />
            ),
          },
          {
            id: 'item-5',
            content: (
              <CodeBlock
                id="task-5-code"
                heading="Fix Authentication Bug"
                language="javascript"
                code={`// Need to fix token refresh logic
function refreshToken() {
  // TODO: Implement proper refresh mechanism
  const newToken = fetchNewToken();
  return newToken;
}`}
              />
            ),
          },
        ],
      },
      {
        id: 'column-3',
        title: 'Review',
        items: [
          {
            id: 'item-6',
            content: (
              <TextBlock
                id="task-6"
                heading="Dashboard Layout"
                content="Create responsive dashboard layout with sidebar navigation."
              />
            ),
          },
        ],
      },
      {
        id: 'column-4',
        title: 'Done',
        items: [
          {
            id: 'item-7',
            content: (
              <TextBlock
                id="task-7"
                heading="Project Setup"
                content="Initialize project repository and configure development environment."
              />
            ),
          },
          {
            id: 'item-8',
            content: (
              <TextBlock
                id="task-8"
                heading="Requirements Gathering"
                content="Collect and document project requirements from stakeholders."
              />
            ),
          },
        ],
      },
    ],
    allowDragDrop: true,
  },
};

export const MoodBoard: Story = {
  args: {
    id: 'board-view-mood-example',
    title: 'Design Inspiration',
    layout: 'grid',
    gridOptions: {
      columns: { sm: 1, md: 2, lg: 3 },
      gap: 'md',
    },
    items: [
      {
        id: 'inspiration-1',
        content: (
          <ImageBlock
            id="inspiration-image-1"
            src="https://placehold.co/300x200?text=Inspiration+1"
            alt="Design inspiration 1"
            caption="Minimalist dashboard design"
          />
        ),
      },
      {
        id: 'inspiration-2',
        content: (
          <ImageBlock
            id="inspiration-image-2"
            src="https://placehold.co/300x200?text=Inspiration+2"
            alt="Design inspiration 2"
            caption="Dark mode interface"
          />
        ),
      },
      {
        id: 'inspiration-3',
        content: (
          <ImageBlock
            id="inspiration-image-3"
            src="https://placehold.co/300x200?text=Inspiration+3"
            alt="Design inspiration 3"
            caption="Custom form elements"
          />
        ),
      },
      {
        id: 'inspiration-4',
        content: (
          <ImageBlock
            id="inspiration-image-4"
            src="https://placehold.co/300x200?text=Inspiration+4"
            alt="Design inspiration 4"
            caption="Animation concepts"
          />
        ),
      },
      {
        id: 'inspiration-5',
        content: (
          <ImageBlock
            id="inspiration-image-5"
            src="https://placehold.co/300x200?text=Inspiration+5"
            alt="Design inspiration 5"
            caption="Typography examples"
          />
        ),
      },
      {
        id: 'color-palette',
        content: (
          <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
            <h3 style={{ marginTop: 0 }}>Color Palette</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#0ea5e9', borderRadius: '0.25rem' }}></div>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#14b8a6', borderRadius: '0.25rem' }}></div>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#8b5cf6', borderRadius: '0.25rem' }}></div>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#f43f5e', borderRadius: '0.25rem' }}></div>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#eab308', borderRadius: '0.25rem' }}></div>
            </div>
          </div>
        ),
      },
    ],
  },
};

export const ProjectDashboard: Story = {
  args: {
    id: 'board-view-dashboard-example',
    title: 'Project Dashboard',
    layout: 'custom',
    customLayout: {
      columns: 12,
      rowHeight: 100,
      gap: 'md',
      items: [
        { id: 'widget-1', x: 0, y: 0, w: 8, h: 2 },
        { id: 'widget-2', x: 8, y: 0, w: 4, h: 2 },
        { id: 'widget-3', x: 0, y: 2, w: 4, h: 3 },
        { id: 'widget-4', x: 4, y: 2, w: 8, h: 3 },
        { id: 'widget-5', x: 0, y: 5, w: 12, h: 2 },
      ],
    },
    items: [
      {
        id: 'widget-1',
        content: (
          <div style={{ padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '0.5rem', height: '100%' }}>
            <h3>Project Overview</h3>
            <p>Summary of project status, progress, and key metrics.</p>
          </div>
        ),
      },
      {
        id: 'widget-2',
        content: (
          <div style={{ padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '0.5rem', height: '100%' }}>
            <h3>Team Members</h3>
            <p>5 active members</p>
          </div>
        ),
      },
      {
        id: 'widget-3',
        content: (
          <div style={{ padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '0.5rem', height: '100%' }}>
            <h3>Recent Activity</h3>
            <ul>
              <li>Task completed: UI Design</li>
              <li>New comment on API docs</li>
              <li>File uploaded: requirements.pdf</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'widget-4',
        content: (
          <div style={{ padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '0.5rem', height: '100%' }}>
            <h3>Task Progress</h3>
            <div style={{ height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Chart visualization would appear here
            </div>
          </div>
        ),
      },
      {
        id: 'widget-5',
        content: (
          <div style={{ padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '0.5rem', height: '100%' }}>
            <h3>Upcoming Deadlines</h3>
            <p>Timeline of upcoming project milestones and deadlines.</p>
          </div>
        ),
      },
    ],
  },
}; 
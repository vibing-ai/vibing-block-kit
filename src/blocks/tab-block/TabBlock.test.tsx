import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabBlock } from './TabBlock';
import type { TabBlockProps } from './TabBlock.types';

const tabs: TabBlockProps['tabs'] = [
  { label: 'Tab 1', key: 'tab1', content: <div>Content 1</div> },
  { label: 'Tab 2', key: 'tab2', content: <div>Content 2</div> },
  { label: 'Tab 3', key: 'tab3', content: <div>Content 3</div>, disabled: true },
];

describe('TabBlock', () => {
  it('renders all tab headers', () => {
    render(<TabBlock tabs={tabs} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('shows the content of the default active tab', () => {
    render(<TabBlock tabs={tabs} defaultActiveKey="tab2" />);
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('switches tab on click', () => {
    render(<TabBlock tabs={tabs} />);
    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('does not switch to a disabled tab', () => {
    render(<TabBlock tabs={tabs} />);
    fireEvent.click(screen.getByText('Tab 3'));
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(<TabBlock tabs={tabs} />);
    const tab1 = screen.getByText('Tab 1');
    tab1.focus();
    fireEvent.keyDown(tab1, { key: 'ArrowRight' });
    expect(screen.getByText('Tab 2')).toHaveFocus();
    fireEvent.keyDown(screen.getByText('Tab 2'), { key: 'Enter' });
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});
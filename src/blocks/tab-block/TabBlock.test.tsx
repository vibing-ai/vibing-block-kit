import { render, screen, fireEvent } from '@testing-library/react';
import { TabBlock } from './TabBlock';

describe('TabBlock', () => {
  const mockTabs = [
    { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content 3' },
  ];

  it('renders all tabs', () => {
    render(<TabBlock id="test-tabs" tabs={mockTabs} />);
    
    mockTabs.forEach(tab => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });
  });

  it('shows first tab content by default', () => {
    render(<TabBlock id="test-tabs" tabs={mockTabs} />);
    
    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.queryByText('Content 2')).not.toBeVisible();
  });

  it('switches content when clicking tabs', () => {
    render(<TabBlock id="test-tabs" tabs={mockTabs} />);
    
    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Content 2')).toBeVisible();
    expect(screen.queryByText('Content 1')).not.toBeVisible();
  });

  it('calls onChange when switching tabs', () => {
    const handleChange = vi.fn();
    render(<TabBlock id="test-tabs" tabs={mockTabs} onChange={handleChange} />);
    
    fireEvent.click(screen.getByText('Tab 2'));
    expect(handleChange).toHaveBeenCalledWith('tab2');
  });

  it('supports keyboard navigation', () => {
    render(<TabBlock id="test-tabs" tabs={mockTabs} />);
    
    const firstTab = screen.getByText('Tab 1');
    firstTab.focus();
    
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' });
    expect(screen.getByText('Tab 2')).toHaveFocus();
  });
});
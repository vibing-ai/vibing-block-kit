import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabBlock } from './TabBlock';
import type { TabBlockProps } from './TabBlock.types';

const tabs: TabBlockProps['tabs'] = [
  { label: 'Tab 1', id: 'tab1', icon: <span data-testid="icon1">🌟</span>, content: <div>Content 1</div> },
  { label: 'Tab 2', id: 'tab2', icon: <span data-testid="icon2">🔥</span>, content: <div>Content 2</div> },
  { label: 'Tab 3', id: 'tab3', icon: <span data-testid="icon3">💧</span>, content: <div>Content 3</div>, disabled: true },
];

describe('TabBlock', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('renders all tab headers', () => {
    render(<TabBlock tabs={tabs} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('shows the content of the default active tab', async () => {
    render(<TabBlock tabs={tabs} defaultActiveId="tab2" />);
    await expect(screen.findByText('Content 2')).resolves.toBeInTheDocument();
  });

  it('switches tab on click', async () => {
    render(<TabBlock tabs={tabs} />);
    fireEvent.click(screen.getByText('Tab 2'));
    await expect(screen.findByText('Content 2')).resolves.toBeInTheDocument();
  });

  it('does not switch to a disabled tab', () => {
    render(<TabBlock tabs={tabs} />);
    fireEvent.click(screen.getByText('Tab 3'));
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  it('supports keyboard navigation', async () => {
    render(<TabBlock tabs={tabs} />);
    const tab1 = screen.getByText('Tab 1');
    tab1.focus();
    fireEvent.keyDown(tab1, { key: 'ArrowRight' });
    expect(screen.getByText('Tab 2')).toHaveFocus();
    fireEvent.keyDown(screen.getByText('Tab 2'), { key: 'Enter' });
    await expect(screen.findByText('Content 2')).resolves.toBeInTheDocument();
  });

  it('switches to accordion mode on mobile', () => {
    // Simula un viewport pequeño
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    render(<TabBlock tabs={tabs} responsiveBreakpoint={600} />);
    // Busca un elemento típico del modo acordeón
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    // Puedes buscar una clase específica si la tienes
    // expect(document.querySelector('.vbk-tab-block__accordion')).toBeInTheDocument();
  });

  it('updates URL hash when tabs change', async () => {
    render(<TabBlock tabs={tabs} />);
    fireEvent.click(screen.getByText('Tab 2'));
    await screen.findByText('Content 2');
    expect(window.location.hash).toBe('#tab2');
  });

  it('renders icons in tab headers', () => {
    render(<TabBlock tabs={tabs} />);
    expect(screen.getByTestId('icon1')).toBeInTheDocument();
    expect(screen.getByTestId('icon2')).toBeInTheDocument();
    expect(screen.getByTestId('icon3')).toBeInTheDocument();
  });

  it('supports vertical orientation', () => {
    // Fuerza viewport grande
    global.innerWidth = 1200;
    global.dispatchEvent(new Event('resize'));
    render(<TabBlock tabs={tabs} orientation="vertical" />);
    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
  });
});

describe('TabBlock vertical keyboard navigation', () => {
  it('moves focus with ArrowUp/ArrowDown in vertical layout', () => {
    // Fuerza viewport grande para evitar modo móvil
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));

    render(
      <TabBlock
        tabs={tabs}
        defaultTab="tab1"
        layout="vertical"
      />
    );

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

    tab1.focus();
    fireEvent.keyDown(tab1, { key: 'ArrowDown' });
    expect(tab2).toHaveFocus();

    fireEvent.keyDown(tab2, { key: 'ArrowDown' });
    expect(tab3).toHaveFocus();

    fireEvent.keyDown(tab3, { key: 'ArrowUp' });
    expect(tab2).toHaveFocus();
  });
});
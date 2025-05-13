// src/blocks/data-block/chart-block/ChartBlock.test.tsx

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { ChartBlock, ChartBlockProps } from './ChartBlock';

// Mock Recharts components
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
  LineChart: ({ children }: { children: React.ReactNode }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />
}));

const baseProps: Omit<ChartBlockProps, 'id' | 'type'> = {
  title: 'Test Chart',
  data: [],
  series: [],
};

test('shows loading spinner when loading', () => {
  render(<ChartBlock {...baseProps} id="a" type="line" data={[]} series={[]} loading />);
  expect(screen.getByLabelText('Loading')).toBeInTheDocument();
});

test('shows error message', () => {
  render(<ChartBlock {...baseProps} id="b" type="line" data={[]} series={[]} error="Oops!" />);
  expect(screen.getByText('Oops!')).toBeInTheDocument();
});

test('shows no-data message', () => {
  render(<ChartBlock {...baseProps} id="c" type="line" data={[]} series={[]} />);
  expect(screen.getByText('No data to display')).toBeInTheDocument();
});

test('renders chart component with correct structure', () => {
  const props: ChartBlockProps = {
    ...baseProps,
    id: 'd',
    type: 'line',
    data: [{ x: 1, y: 2 }, { x: 2, y: 4 }],
    xAxis: { dataKey: 'x' },
    yAxis: { tickFormatter: v => `${v}` },
    series: [{ dataKey: 'y', name: 'Y', color: '#000' }],
  };
  render(<ChartBlock {...props} />);
  
  // Check for the container
  expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  expect(screen.getByTestId('line')).toBeInTheDocument();
  expect(screen.getByTestId('x-axis')).toBeInTheDocument();
  expect(screen.getByTestId('y-axis')).toBeInTheDocument();
  expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  expect(screen.getByTestId('legend')).toBeInTheDocument();
});
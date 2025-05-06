import type { Meta, StoryObj } from '@storybook/react';
import { ChartBlock } from '@vibing-ai/block-kit';

const meta: Meta<typeof ChartBlock> = {
  title: 'Blocks/Data/ChartBlock',
  component: ChartBlock,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The ChartBlock component provides powerful data visualization capabilities using charts and graphs. Built on top of the Recharts library, it supports various chart types and customization options.

### Features

- Multiple chart types (Bar, Line, Pie, Donut, Area, Scatter)
- Customizable axes, legends, tooltips, and labels
- Responsive design with aspect ratio control
- Animation support
- Loading and error states
- Accessibility considerations

        `,
      },
    },
  },
} satisfies Meta<typeof ChartBlock>;

export default meta;
type Story = StoryObj<typeof ChartBlock>;

const sampleData = [
  { month: 'Jan', actual: 4000, projected: 3500 },
  { month: 'Feb', actual: 4500, projected: 4000 },
  { month: 'Mar', actual: 5500, projected: 5000 },
  { month: 'Apr', actual: 6500, projected: 6000 },
];

const pieData = [
  { category: 'A', value: 400 },
  { category: 'B', value: 300 },
  { category: 'C', value: 300 },
  { category: 'D', value: 200 },
];

const pieColors = ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f'];
const donutColors = ['#9b59b6', '#e67e22', '#1abc9c', '#34495e'];

/**
 * A line chart showing monthly revenue with actual vs projected values.
 */
export const LineChart: Story = {
  args: {
    id: 'line-chart',
    title: 'Monthly Revenue',
    type: 'line',
    data: sampleData,
    xAxis: { dataKey: 'month', label: 'Month' },
    yAxis: { label: 'Revenue', tickFormatter: (v: number) => `$${v}` },
    series: [
      { dataKey: 'actual', name: 'Actual', color: '#3498db' },
      { dataKey: 'projected', name: 'Projected', color: '#2ecc71', strokeDasharray: '5 5' },
    ],
    tooltip: true,
    legend: true,
    grid: true,
    height: 400,
    width: 600,
    aspectRatio: 16 / 9,
    animation: true,
  },
};

/**
 * A vertical bar chart comparing actual vs projected revenue.
 */
export const BarChart: Story = {
  args: {
    ...LineChart.args,
    id: 'bar-chart',
    type: 'bar',
    title: 'Revenue Comparison',
    yAxis: { label: 'Revenue', tickFormatter: (v: number) => `$${v}` },
  },
};

/**
 * A horizontal bar chart for easier comparison of longer labels.
 */
export const HorizontalBarChart: Story = {
  args: {
    id: 'horizontal-bar',
    type: 'bar',
    title: 'Horizontal Revenue Comparison',
    data: sampleData,
    horizontal: true,
    xAxis: { dataKey: 'month', label: 'Month' },
    yAxis: { label: 'Revenue', tickFormatter: (v: number) => `$${v}` },
    series: [
      { dataKey: 'actual', name: 'Actual', color: '#3498db' },
      { dataKey: 'projected', name: 'Projected', color: '#2ecc71' },
    ],
    tooltip: true,
    legend: true,
    grid: true,
    height: 450,
    width: 600,
    aspectRatio: 16 / 9,
    animation: true,
  },
};

/**
 * An area chart showing revenue trends over time.
 */
export const AreaChart: Story = {
  args: {
    ...LineChart.args,
    id: 'area-chart',
    type: 'area',
    title: 'Revenue Trends',
    yAxis: { label: 'Revenue', tickFormatter: (v: number) => `$${v}` },
  },
};

/**
 * A pie chart showing market distribution with a different color per slice.
 */
export const PieChart: Story = {
  args: {
    id: 'pie-chart',
    title: 'Market Distribution',
    type: 'pie',
    data: pieData,
    series: pieData.map((d, i) => ({
      dataKey: 'value',
      name: d.category,
      color: pieColors[i],
    })),
    height: 400,
    width: 600,
    tooltip: true,
    legend: true,
  },
};

/**
 * A donut chart showing category distribution with a different color per slice.
 */
export const DonutChart: Story = {
  args: {
    id: 'donut-chart',
    title: 'Category Distribution',
    type: 'donut',
    data: pieData,
    series: pieData.map((d, i) => ({
      dataKey: 'value',
      name: d.category,
      color: donutColors[i],
    })),
    height: 400,
    width: 600,
    tooltip: true,
    legend: true,
  },
};
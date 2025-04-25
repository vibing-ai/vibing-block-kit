import React from 'react';
import { Card } from '@heroui/react';
import { Text } from '../../components/Text';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  AreaChart, 
  Area, 
  ScatterChart, 
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { BlockProps } from '../../types';

export type ChartType = 'bar' | 'line' | 'pie' | 'area' | 'scatter';

export type ChartDataPoint = {
  [key: string]: string | number | null | undefined;
};

export interface ChartBlockProps extends BlockProps {
  type: ChartType;
  data: ChartDataPoint[];
  options?: {
    xAxisDataKey?: string;
    yAxisDataKey?: string;
    dataKey?: string;
    nameKey?: string;
    colors?: string[];
    showGrid?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    title?: string;
  };
  height?: number | string;
  width?: number | string;
}

export const ChartBlock: React.FC<ChartBlockProps> = ({
  id,
  type,
  data,
  options = {},
  height = 300,
  width = '100%',
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  
  
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onChange,
  ...props
}) => {
  const {
    xAxisDataKey = 'x',
    yAxisDataKey = 'y',
    dataKey = 'value',
    nameKey = 'name',
    colors = ['var(--hero-color-primary)', 'var(--hero-color-secondary)', 'var(--hero-color-success)', 'var(--hero-color-info)'],
    showGrid = true,
    showTooltip = true,
    showLegend = true,
    title
  } = options;

  const renderChart = () => {
    if (!data || data.length === 0) {
      return (
        <div 
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--hero-color-foreground-muted)'
          }}
        >
          No data to display
        </div>
      );
    }

    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              {showTooltip && <Tooltip />}
              {showLegend && <Legend />}
              <Bar dataKey={dataKey} fill={colors[0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              {showTooltip && <Tooltip />}
              {showLegend && <Legend />}
              <Line type="monotone" dataKey={dataKey} stroke={colors[0]} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              {showTooltip && <Tooltip />}
              {showLegend && <Legend />}
              <Area type="monotone" dataKey={dataKey} fill={colors[0]} stroke={colors[0]} />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                nameKey={nameKey}
                dataKey={dataKey}
                outerRadius={80}
                fill={colors[0]}
              />
              {showTooltip && <Tooltip />}
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              {showGrid && <CartesianGrid />}
              <XAxis type="number" dataKey={xAxisDataKey} />
              <YAxis type="number" dataKey={yAxisDataKey} />
              {showTooltip && <Tooltip cursor={{ strokeDasharray: '3 3' }} />}
              {showLegend && <Legend />}
              <Scatter name={nameKey} data={data} fill={colors[0]} />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card
      className={className}
      data-block-id={id}
      {...props}
    >
      {title && (
        <Text 
          as="h3" 
          size="lg" 
          weight="medium"
          p="3"
          borderBottom="1px solid"
          borderColor="border"
        >
          {title}
        </Text>
      )}
      
      <div 
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
          width: typeof width === 'number' ? `${width}px` : width,
          padding: 'var(--hero-spacing-3)'
        }}
      >
        {renderChart()}
      </div>
    </Card>
  );
}; 
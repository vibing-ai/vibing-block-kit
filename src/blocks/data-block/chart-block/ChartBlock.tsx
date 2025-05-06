// src/components/ChartBlock.tsx

import React from 'react';
import {
  ResponsiveContainer,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie,
  AreaChart, Area,
  XAxis,
  YAxis as RechartsYAxis,
  CartesianGrid, Tooltip, Legend,
  Cell
} from 'recharts';
import { Card, Spinner } from '@heroui/react';
import { BlockProps } from '@/types';

export type ChartType = 'bar' | 'line' | 'pie' | 'donut' | 'area';
export type ChartDataPoint = Record<string, number | string | null | undefined>;

export interface XAxisProps {
  dataKey: string;
  label?: string;
}
export interface YAxisProps {
  // for horizontal bars: which field to use for the category labels 
  dataKey?: string;
  label?: string;
  tickFormatter?: (value: number) => string;
}
export interface SeriesProps {
  dataKey: string;
  name?: string;
  color?: string;
  strokeDasharray?: string;
}
export interface ChartBlockProps extends BlockProps {
  type: ChartType;
  data: ChartDataPoint[];
  xAxis?: XAxisProps;
  yAxis?: YAxisProps;
  series: SeriesProps[];
  tooltip?: boolean;
  legend?: boolean;
  grid?: boolean;
  height?: number;
  width?: number;
  aspectRatio?: number;
  animation?: boolean;
  loading?: boolean;
  error?: string;
  horizontal?: boolean;
  title?: string;
  value?: number | string;
}

export const ChartBlock: React.FC<ChartBlockProps> = ({
  id,
  title,
  data,
  type,
  xAxis,
  yAxis,
  series,
  tooltip = true,
  legend = true,
  grid = false,
  height = 300,
  width = 400,
  aspectRatio,
  animation = true,
  loading = false,
  error,
  horizontal = false,
}) => {
  if (loading) return <Spinner />;
  if (error)   return <div style={{ color: 'red' }}>{error}</div>;
  if (!data || data.length === 0)
    return <div style={{ color: '#666' }}>No data to display</div>;

  // axis labels
  const yLabel = yAxis?.label
    ? { value: yAxis.label, angle: -90, position: 'insideLeft' as const, dx: -30 }
    : undefined;
  const xLabel = xAxis?.label
    ? { value: xAxis.label, position: 'insideBottom' as const, dy: 10 }
    : undefined;

  // legend placement
  const isPie = type === 'pie' || type === 'donut';
  const legendProps = isPie
    ? { layout: 'vertical' as const, align: 'right' as const, verticalAlign: 'middle' as const }
    : { verticalAlign: 'bottom' as const, align: 'center' as const, wrapperStyle: { transform: 'translateY(10px)' } };

  // margin (give room for rotated Y-label on horizontal)
  const margin = {
    top: 5,
    right: 20,
    bottom: 5,
    left: horizontal ? 80 : 80,
  };

  const chartProps = {
    width,
    height,
    ...(aspectRatio ? { aspect: aspectRatio } : {}),
  };

  const renderChartContent = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data} layout={horizontal ? 'vertical' : 'horizontal'} margin={margin}>
            {grid && <CartesianGrid strokeDasharray="3 3" />}

            {horizontal ? (
              <>
                {/* numeric X-axis */}
                <XAxis type="number" {...xAxis} label={xLabel} />
                {/* category Y-axis */}
                <RechartsYAxis
                  type="category"
                  dataKey={yAxis?.dataKey}
                  tickFormatter={yAxis?.tickFormatter}
                  label={yLabel}
                />
              </>
            ) : (
              <>
                {/* category X-axis */}
                <XAxis {...xAxis} label={xLabel} />
                {/* numeric Y-axis */}
                <RechartsYAxis {...yAxis} label={yLabel} />
              </>
            )}

            {tooltip && <Tooltip />}
            {legend && <Legend {...legendProps} />}
            {series.map(s => (
              <Bar
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.name}
                fill={s.color}
                strokeDasharray={s.strokeDasharray}
                isAnimationActive={animation}
              />
            ))}
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 80 }}>
            {grid && <CartesianGrid strokeDasharray="3 3" />}
            {xAxis && <XAxis {...xAxis} label={xLabel} />}
            {yAxis && <RechartsYAxis {...yAxis} label={yLabel} />}
            {tooltip && <Tooltip />}
            {legend && <Legend {...legendProps} />}
            {series.map(s => (
              <Line
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.name}
                stroke={s.color}
                strokeDasharray={s.strokeDasharray}
                isAnimationActive={animation}
              />
            ))}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 80 }}>
            {grid && <CartesianGrid strokeDasharray="3 3" />}
            {xAxis && <XAxis {...xAxis} label={xLabel} />}
            {yAxis && <RechartsYAxis {...yAxis} label={yLabel} />}
            {tooltip && <Tooltip />}
            {legend && <Legend {...legendProps} />}
            {series.map(s => (
              <Area
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.name}
                stroke={s.color}
                fill={s.color}
                isAnimationActive={animation}
              />
            ))}
          </AreaChart>
        );

      case 'pie':
      case 'donut':
        return (
          <PieChart>
            {tooltip && <Tooltip />}
            {legend && (
              <Legend
                {...legendProps}
                payload={series.map((s, i) => ({
                  id:    `${s.dataKey}-${i}`,
                  value: s.name || s.dataKey,
                  type:  'square' as const,
                  color: s.color,
                }))}
              />
            )}
            <Pie
              data={data}
              dataKey={series[0].dataKey}
              innerRadius={type === 'donut' ? 60 : 0}
              outerRadius={80}
              isAnimationActive={animation}
              label
            >
              {data.map((_, i) => (
                <Cell key={`cell-${i}`} fill={series[i % series.length].color} />
              ))}
            </Pie>
          </PieChart>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <Card data-block-id={id} style={{ width, height, margin: '0 auto' }}>
      {title && <h3>{title}</h3>}
      <ResponsiveContainer {...chartProps}>
        {renderChartContent()}
      </ResponsiveContainer>
    </Card>
  );
};
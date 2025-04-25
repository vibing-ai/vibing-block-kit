import React from 'react';
import { Card } from '@heroui/react';
import { Text } from '../../components/Text';
import { BlockProps } from '../../types';

export type TableRowData = Record<string, string | number | boolean | null | undefined>;

export interface TableColumn {
  header: string;
  accessorKey: string;
  cell?: (info: TableRowData) => React.ReactNode;
}

export interface TableBlockProps extends BlockProps {
  columns: TableColumn[];
  data: TableRowData[];
  caption?: string;
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  title?: string;
  showHeader?: boolean;
}

export const TableBlock: React.FC<TableBlockProps> = ({
  id,
  columns,
  data,
  caption,
  striped = true,
  bordered = true,
  hoverable = true,
  compact = false,
  title,
  showHeader = true,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  
  
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onChange,
  ...props
}) => {
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
      
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            ...(compact ? { fontSize: 'var(--hero-font-size-sm)' } : {})
          }}
        >
          {caption && (
            <caption>
              <Text size="sm" color="foreground-muted">
                {caption}
              </Text>
            </caption>
          )}
          
          {showHeader && (
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th 
                    key={index}
                    style={{
                      textAlign: 'left',
                      padding: compact ? 'var(--hero-spacing-1)' : 'var(--hero-spacing-2)',
                      backgroundColor: 'var(--hero-color-muted)',
                      borderBottom: '1px solid var(--hero-color-border)',
                      ...(bordered ? { border: '1px solid var(--hero-color-border)' } : {})
                    }}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          
          <tbody>
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                style={{
                  ...(striped && rowIndex % 2 === 1 ? { backgroundColor: 'var(--hero-color-muted-50)' } : {}),
                  ...(hoverable ? { ':hover': { backgroundColor: 'var(--hero-color-muted-100)' } } : {})
                }}
              >
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex}
                    style={{
                      padding: compact ? 'var(--hero-spacing-1)' : 'var(--hero-spacing-2)',
                      ...(bordered ? { border: '1px solid var(--hero-color-border)' } : {
                        borderBottom: '1px solid var(--hero-color-border)'
                      })
                    }}
                  >
                    {column.cell ? column.cell(row) : row[column.accessorKey]}
                  </td>
                ))}
              </tr>
            ))}
            
            {data.length === 0 && (
              <tr>
                <td 
                  colSpan={columns.length}
                  style={{
                    textAlign: 'center',
                    padding: 'var(--hero-spacing-4)',
                    color: 'var(--hero-color-foreground-muted)'
                  }}
                >
                  No data to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}; 
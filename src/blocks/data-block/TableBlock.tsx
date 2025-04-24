import React from 'react';
import { Card, Box, Text, Table, Tbody, Thead, Tr, Th, Td } from '@heroui/react';
import { BlockProps } from '../../types';

export interface TableColumn {
  header: string;
  accessorKey: string;
  cell?: (info: any) => React.ReactNode;
}

export interface TableBlockProps extends BlockProps {
  columns: TableColumn[];
  data: Record<string, any>[];
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
      
      <Box overflowX="auto">
        <Table
          width="100%"
          style={{
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
            <Thead>
              <Tr>
                {columns.map((column, index) => (
                  <Th 
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
                  </Th>
                ))}
              </Tr>
            </Thead>
          )}
          
          <Tbody>
            {data.map((row, rowIndex) => (
              <Tr 
                key={rowIndex}
                style={{
                  ...(striped && rowIndex % 2 === 1 ? { backgroundColor: 'var(--hero-color-muted-50)' } : {}),
                  ...(hoverable ? { ':hover': { backgroundColor: 'var(--hero-color-muted-100)' } } : {})
                }}
              >
                {columns.map((column, colIndex) => (
                  <Td 
                    key={colIndex}
                    style={{
                      padding: compact ? 'var(--hero-spacing-1)' : 'var(--hero-spacing-2)',
                      ...(bordered ? { border: '1px solid var(--hero-color-border)' } : {
                        borderBottom: '1px solid var(--hero-color-border)'
                      })
                    }}
                  >
                    {column.cell ? column.cell(row) : row[column.accessorKey]}
                  </Td>
                ))}
              </Tr>
            ))}
            
            {data.length === 0 && (
              <Tr>
                <Td 
                  colSpan={columns.length}
                  textAlign="center"
                  p="4"
                  color="foreground-muted"
                >
                  No data to display
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}; 
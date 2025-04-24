import React, { useState, useMemo } from 'react';
import { Card, Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Select, Text } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { BlockProps } from '../../types';

export interface DataGridColumn {
  field: string;
  headerName: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
}

export interface DataGridBlockProps extends BlockProps {
  columns: DataGridColumn[];
  rows: Record<string, any>[];
  title?: string;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  showFooter?: boolean;
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
}

export const DataGridBlock: React.FC<DataGridBlockProps> = ({
  id,
  columns,
  rows,
  title,
  pageSizeOptions = [10, 25, 50, 100],
  defaultPageSize = 10,
  showFooter = true,
  bordered = true,
  striped = true,
  hoverable = true,
  className,
  onChange,
  ...props
}) => {
  // Transform columns for react-table
  const tableColumns = useMemo(() => 
    columns.map(col => ({
      Header: col.headerName,
      accessor: col.field,
      width: col.width,
      disableSortBy: !col.sortable
    })), 
    [columns]
  );

  // Set up react-table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter }
  } = useTable(
    { 
      columns: tableColumns, 
      data: rows,
      initialState: { pageSize: defaultPageSize }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

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

      <Box p="3" display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Input
            placeholder="Search..."
            value={globalFilter || ''}
            onChange={e => setGlobalFilter(e.target.value)}
            size="sm"
            className="max-w-sm"
          />
        </Box>
        
        <Box display="flex" alignItems="center" gap="2">
          <Text size="sm" color="foreground-muted">
            Show
          </Text>
          <Select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            size="sm"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
          <Text size="sm" color="foreground-muted">
            entries
          </Text>
        </Box>
      </Box>

      <Box overflowX="auto">
        <Table {...getTableProps()} width="100%" style={{ borderCollapse: 'collapse' }}>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <Th 
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                    style={{
                      width: column.width,
                      padding: 'var(--hero-spacing-2)',
                      textAlign: 'left',
                      borderBottom: '2px solid var(--hero-color-border)',
                      backgroundColor: 'var(--hero-color-muted)',
                      ...(bordered ? { border: '1px solid var(--hero-color-border)' } : {}),
                      userSelect: 'none',
                      cursor: column.disableSortBy ? 'default' : 'pointer'
                    }}
                  >
                    <Box display="flex" alignItems="center" gap="1">
                      {column.render('Header')}
                      <Box>
                        {!column.disableSortBy && (
                          column.isSorted ? (
                            column.isSortedDesc ? (
                              <Icon icon="heroicons:arrow-down" width={14} />
                            ) : (
                              <Icon icon="heroicons:arrow-up" width={14} />
                            )
                          ) : (
                            <Icon icon="heroicons:arrows-up-down" width={14} opacity={0.3} />
                          )
                        )}
                      </Box>
                    </Box>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <Tr 
                  {...row.getRowProps()}
                  key={row.id}
                  style={{
                    ...(striped && rowIndex % 2 === 1 ? { backgroundColor: 'var(--hero-color-muted-50)' } : {}),
                    ...(hoverable ? { ':hover': { backgroundColor: 'var(--hero-color-muted-100)' } } : {})
                  }}
                >
                  {row.cells.map(cell => (
                    <Td 
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      style={{
                        padding: 'var(--hero-spacing-2)',
                        ...(bordered ? { border: '1px solid var(--hero-color-border)' } : {
                          borderBottom: '1px solid var(--hero-color-border)'
                        })
                      }}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              );
            })}
            
            {page.length === 0 && (
              <Tr>
                <Td 
                  colSpan={tableColumns.length}
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

      {showFooter && (
        <Box p="3" display="flex" alignItems="center" justifyContent="space-between">
          <Text size="sm" color="foreground-muted">
            Showing {page.length > 0 ? pageIndex * pageSize + 1 : 0} to {Math.min((pageIndex + 1) * pageSize, rows.length)} of {rows.length} entries
          </Text>
          
          <Box display="flex" alignItems="center" gap="1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              aria-label="First page"
            >
              <Icon icon="heroicons:chevron-double-left" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={previousPage}
              disabled={!canPreviousPage}
              aria-label="Previous page"
            >
              <Icon icon="heroicons:chevron-left" />
            </Button>
            
            <Text px="2" size="sm">
              Page {pageIndex + 1} of {pageOptions.length}
            </Text>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={nextPage}
              disabled={!canNextPage}
              aria-label="Next page"
            >
              <Icon icon="heroicons:chevron-right" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              aria-label="Last page"
            >
              <Icon icon="heroicons:chevron-double-right" />
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  );
}; 
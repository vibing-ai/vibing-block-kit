import React, { useMemo } from 'react';
import { Card, Input, Button, Select } from '@heroui/react';
import { Text } from '../../components/Text';
import { Icon } from '@iconify/react';
import { useTable, useSortBy, useGlobalFilter, usePagination, TableInstance, Row, Cell, TableState } from 'react-table';
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

// Extended TableState with pagination properties
interface TableStateWithPagination<D extends object> extends TableState<D> {
  pageIndex: number;
  pageSize: number;
  globalFilter: string;
}

// Extended table instance with pagination
interface TableInstanceWithPagination<D extends object> extends TableInstance<D> {
  page: Row<D>[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
  pageCount: number;
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (pageSize: number) => void;
  setGlobalFilter: (filterValue: string) => void;
  state: TableStateWithPagination<D>;
}

export const DataGridBlock: React.FC<DataGridBlockProps> = ({
  id,
  columns,
  rows = [],
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
      initialState: { 
        // Type assertion here to tell TypeScript this is correct
        pageSize: defaultPageSize
      } as Partial<TableState<object>>
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  ) as TableInstanceWithPagination<object>;

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

      <div style={{ 
        padding: 'var(--hero-spacing-3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <Input
            placeholder="Search..."
            value={globalFilter || ''}
            onChange={e => setGlobalFilter(e.target.value)}
            size="sm"
            className="max-w-sm"
          />
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--hero-spacing-2)'
        }}>
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
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column => {
                  // Cast column to any to handle custom properties
                  const columnAny = column as any;
                  return (
                    <th 
                      {...column.getHeaderProps(columnAny.getSortByToggleProps ? columnAny.getSortByToggleProps() : undefined)}
                      key={column.id}
                      style={{
                        width: columnAny.width,
                        padding: 'var(--hero-spacing-2)',
                        textAlign: 'left',
                        borderBottom: '2px solid var(--hero-color-border)',
                        backgroundColor: 'var(--hero-color-muted)',
                        ...(bordered ? { border: '1px solid var(--hero-color-border)' } : {}),
                        userSelect: 'none',
                        cursor: columnAny.disableSortBy ? 'default' : 'pointer'
                      }}
                    >
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--hero-spacing-1)'
                      }}>
                        {column.render('Header')}
                        <div>
                          {!columnAny.disableSortBy && (
                            columnAny.isSorted ? (
                              columnAny.isSortedDesc ? (
                                <Icon icon="heroicons:arrow-down" width={14} />
                              ) : (
                                <Icon icon="heroicons:arrow-up" width={14} />
                              )
                            ) : (
                              <Icon icon="heroicons:arrows-up-down" width={14} opacity={0.3} />
                            )
                          )}
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: Row<object>, rowIndex: number) => {
              prepareRow(row);
              return (
                <tr 
                  {...row.getRowProps()}
                  key={row.id}
                  style={{
                    ...(striped && rowIndex % 2 === 1 ? { backgroundColor: 'var(--hero-color-muted-50)' } : {}),
                    ...(hoverable ? { ':hover': { backgroundColor: 'var(--hero-color-muted-100)' } } : {})
                  }}
                >
                  {row.cells.map((cell: Cell<object>) => (
                    <td 
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
                    </td>
                  ))}
                </tr>
              );
            })}
            
            {page.length === 0 && (
              <tr>
                <td 
                  colSpan={tableColumns.length}
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

      {showFooter && (
        <div style={{ 
          padding: 'var(--hero-spacing-3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text size="sm" color="foreground-muted">
            Showing {page.length > 0 ? pageIndex * pageSize + 1 : 0} to {Math.min((pageIndex + 1) * pageSize, rows.length)} of {rows.length} entries
          </Text>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--hero-spacing-1)'
          }}>
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
          </div>
        </div>
      )}
    </Card>
  );
}; 
// This file uses 'react-table' which may not have type declarations. See project README for details.
import React, { useMemo } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import MOCK_DATA from './MOCK_DATA.ts';
import { COLUMNS } from './columns';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';

export const FilteringTable: React.FC = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo<unknown[]>(() => MOCK_DATA, []);

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter
    }),
    []
  );

  // @ts-expect-error: useTable is of type unknown due to missing types for react-table
  const tableInstance: any = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useFilters,
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    state,
    setGlobalFilter
  } = tableInstance;

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} className="min-w-full border border-[var(--Border-Core-borderTertiary,#EEEEEE)]">
        <thead className="bg-[var(--Background-Core-backgroundPrimary,#fff)]">
          {headerGroups.map((headerGroup: unknown) => (
            <tr {...((headerGroup as { getHeaderGroupProps: () => Record<string, unknown> }).getHeaderGroupProps() as Record<string, unknown>)}>
              {(headerGroup as { headers: unknown[] }).headers.map((column: unknown) => (
                <th {...((column as { getHeaderProps: () => Record<string, unknown> }).getHeaderProps() as Record<string, unknown>)} className="px-4 py-2 text-left text-[15px] font-semibold text-[var(--Content-Core-contentPrimary,#121212)] border-b border-[var(--Border-Core-borderTertiary,#EEEEEE)]">
                  {((column as { render: (type: string) => React.ReactNode }).render('Header') as React.ReactNode)}
                  <div>{((column as { canFilter?: boolean; render: (type: string) => React.ReactNode }).canFilter ? (column as { render: (type: string) => React.ReactNode }).render('Filter') : null) as React.ReactNode}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white">
          {rows.map((row: unknown) => {
            return (
              <tr {...((row as { getRowProps: () => Record<string, unknown> }).getRowProps() as Record<string, unknown>)}>
                {(row as { cells: unknown[] }).cells.map((cell: unknown) => {
                  return <td {...((cell as { getCellProps: () => Record<string, unknown> }).getCellProps() as Record<string, unknown>)} className="px-4 py-2 text-[14px] text-[var(--Content-Core-contentPrimary,#121212)] border-b border-[var(--Border-Core-borderTertiary,#EEEEEE)]">{((cell as { render: (type: string) => React.ReactNode }).render('Cell') as React.ReactNode)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot className="bg-[var(--Background-Core-backgroundPrimary,#fff)]">
          {footerGroups.map((footerGroup: unknown) => (
            <tr {...((footerGroup as { getFooterGroupProps: () => Record<string, unknown> }).getFooterGroupProps() as Record<string, unknown>)}>
              {(footerGroup as { headers: unknown[] }).headers.map((column: unknown) => (
                <td {...((column as { getFooterProps: () => Record<string, unknown> }).getFooterProps() as Record<string, unknown>)} className="px-4 py-2 text-[14px] font-medium text-[var(--Content-Core-contentPrimary,#121212)] border-t border-[var(--Border-Core-borderTertiary,#EEEEEE)]">{((column as { render: (type: string) => React.ReactNode }).render('Footer') as React.ReactNode)}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
} 
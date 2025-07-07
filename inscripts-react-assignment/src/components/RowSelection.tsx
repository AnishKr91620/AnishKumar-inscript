// This file uses 'react-table' which may not have type declarations. See project README for details.
import React, { useMemo } from 'react';
import { useTable, useRowSelect } from 'react-table';
import MOCK_DATA from './MOCK_DATA.ts';
import { COLUMNS } from './columns.ts';
import './table.css';
import Checkbox from './Checkbox';

export const RowSelection: React.FC = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo<unknown[]>(() => MOCK_DATA, []);

  // @ts-expect-error: useTable is of type unknown due to missing types for react-table
  const tableInstance: any = useTable(
    {
      columns,
      data
    },
    useRowSelect,
    (hooks: any) => {
      hooks.visibleColumns.push((columns: any[]) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }: any) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }: any) => <Checkbox {...row.getToggleRowSelectedProps()} />
        },
        ...columns
      ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    selectedFlatRows
  } = tableInstance;

  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <table {...getTableProps()} className="min-w-full border border-[var(--Border-Core-borderTertiary,#EEEEEE)]">
        <thead className="bg-[var(--Background-Core-backgroundPrimary,#fff)]">
          {headerGroups.map((headerGroup: unknown) => (
            <tr {...((headerGroup as { getHeaderGroupProps: () => Record<string, unknown> }).getHeaderGroupProps() as Record<string, unknown>)}>
              {(headerGroup as { headers: unknown[] }).headers.map((column: unknown) => (
                <th {...((column as { getHeaderProps: () => Record<string, unknown> }).getHeaderProps() as Record<string, unknown>)} className="px-4 py-2 text-left text-[15px] font-semibold text-[var(--Content-Core-contentPrimary,#121212)] border-b border-[var(--Border-Core-borderTertiary,#EEEEEE)]">{((column as { render: (type: string) => React.ReactNode }).render('Header') as React.ReactNode)}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white">
          {firstPageRows.map((row: unknown) => {
            return (
              <tr {...((row as { getRowProps: () => Record<string, unknown> }).getRowProps() as Record<string, unknown>)}>
                {(row as { cells: unknown[] }).cells.map((cell: unknown) => {
                  return <td {...((cell as { getCellProps: () => Record<string, unknown> }).getCellProps() as Record<string, unknown>)} className="px-4 py-2 text-[14px] text-[var(--Content-Core-contentPrimary,#121212)] border-b border-[var(--Border-Core-borderTertiary,#EEEEEE)]">{((cell as { render: (type: string) => React.ReactNode }).render('Cell') as React.ReactNode)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <pre className="mt-4 bg-gray-100 p-2 rounded text-xs overflow-x-auto">
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: (selectedFlatRows as unknown[]).map((row: unknown) => (row as { original: unknown }).original)
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
} 
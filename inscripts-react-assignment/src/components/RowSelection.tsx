// This file uses 'react-table' which may not have type declarations. See project README for details.
import React, { useMemo } from 'react';
import { useTable, useRowSelect } from 'react-table';
import MOCK_DATA from './MOCK_DATA';
import { COLUMNS } from './columns';
import './table.css';
import Checkbox from './Checkbox';

export const RowSelection: React.FC = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo<unknown[]>(() => MOCK_DATA, []);

  
  const tableInstance = useTable(
    {
      columns,
      data
    },
    useRowSelect,
    (hooks: unknown) => {
      (hooks as { visibleColumns: { push: (cb: (columns: unknown[]) => unknown[]) => void } }).visibleColumns.push((columns: unknown[]) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }: { getToggleAllRowsSelectedProps: () => Record<string, unknown> }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }: { row: { getToggleRowSelectedProps: () => Record<string, unknown> } }) => <Checkbox {...row.getToggleRowSelectedProps()} />
        },
        ...columns
      ]);
    }
  ) as unknown;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    selectedFlatRows
  } = tableInstance as {
    getTableProps: () => Record<string, unknown>;
    getTableBodyProps: () => Record<string, unknown>;
    headerGroups: unknown[];
    rows: unknown[];
    selectedFlatRows: unknown[];
  };

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
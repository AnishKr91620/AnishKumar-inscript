// This file uses 'react-table' which may not have type declarations. See project README for details.
import React, { useMemo } from 'react';
import { useTable, useColumnOrder, Column, TableInstance } from 'react-table';
import MOCK_DATA from './MOCK_DATA.ts';
import { COLUMNS } from './columns.ts';
import './table.css';

export const ColumnOrder: React.FC = () => {
  const columns = useMemo<Column<unknown>[]>(() => COLUMNS, []);
  const data = useMemo<unknown[]>(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    setColumnOrder
  }: TableInstance<unknown> & { setColumnOrder: (order: string[]) => void } = useTable({
    columns,
    data
  }, useColumnOrder);

  const changeOrder = () => {
    setColumnOrder(['id', 'first_name', 'last_name', 'phone', 'country', 'date_of_birth']);
  };

  return (
    <>
      <button onClick={changeOrder}>Change column order</button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: unknown) => (
            <tr {...((headerGroup as { getHeaderGroupProps: () => Record<string, unknown> }).getHeaderGroupProps() as Record<string, unknown>)}>
              {(headerGroup as { headers: unknown[] }).headers.map((column: unknown) => (
                <th {...((column as { getHeaderProps: () => Record<string, unknown> }).getHeaderProps() as Record<string, unknown>)}>{((column as { render: (type: string) => React.ReactNode }).render('Header') as React.ReactNode)}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: unknown) => {
            return (
              <tr {...((row as { getRowProps: () => Record<string, unknown> }).getRowProps() as Record<string, unknown>)}>
                {(row as { cells: unknown[] }).cells.map((cell: unknown) => {
                  return <td {...((cell as { getCellProps: () => Record<string, unknown> }).getCellProps() as Record<string, unknown>)}>{((cell as { render: (type: string) => React.ReactNode }).render('Cell') as React.ReactNode)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup: unknown) => (
            <tr {...((footerGroup as { getFooterGroupProps: () => Record<string, unknown> }).getFooterGroupProps() as Record<string, unknown>)}>
              {(footerGroup as { headers: unknown[] }).headers.map((column: unknown) => (
                <td {...((column as { getFooterProps: () => Record<string, unknown> }).getFooterProps() as Record<string, unknown>)}>{((column as { render: (type: string) => React.ReactNode }).render('Footer') as React.ReactNode)}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
} 
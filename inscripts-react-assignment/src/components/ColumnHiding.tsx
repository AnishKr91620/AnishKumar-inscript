// This file uses 'react-table' which may not have type declarations. See project README for details.
import React, { useMemo } from 'react';
import { useTable,} from 'react-table';
import MOCK_DATA from './MOCK_DATA.ts';
import { COLUMNS } from './columns';
import './table.css';
import Checkbox from './Checkbox';

export const ColumnHiding: React.FC = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo<unknown[]>(() => MOCK_DATA, []);

  const tableInstance = useTable({
    columns,
    data
  }) as {
    getTableProps: () => Record<string, unknown>;
    getTableBodyProps: () => Record<string, unknown>;
    headerGroups: unknown[];
    footerGroups: unknown[];
    rows: unknown[];
    allColumns: unknown[];
    getToggleHideAllColumnsProps: () => Record<string, unknown>;
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    allColumns,
    getToggleHideAllColumnsProps
  } = tableInstance;

  return (
    <>
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2">
          <Checkbox {...getToggleHideAllColumnsProps()} />
          <span className="text-[15px] font-medium text-[var(--Content-Core-contentPrimary,#121212)]">Toggle All</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {allColumns.map((column: unknown) => (
            <div key={(column as { id: string }).id} className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-[14px] font-normal text-[var(--Content-Core-contentPrimary,#121212)]">
                <input type='checkbox' {...(column as unknown as { getToggleHiddenProps: () => Record<string, unknown> }).getToggleHiddenProps()} className="w-[16px] h-[16px] align-middle rounded-[4px] border border-[var(--Border-Core-borderTertiary,#EEEEEE)] bg-[var(--Background-Core-backgroundPrimary,#fff)] appearance-none checked:bg-[var(--Colours-BrandPrimary-500,#4B6A4F)] checked:border-[var(--Colours-BrandPrimary-500,#4B6A4F)] focus:outline-none focus:ring-2 focus:ring-[var(--Colours-BrandPrimary-500,#4B6A4F)] transition duration-100 cursor-pointer" />{' '}
                {(column as { Header?: string }).Header}
              </label>
            </div>
          ))}
        </div>
        <br />
      </div>
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
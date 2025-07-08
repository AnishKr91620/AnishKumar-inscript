// This file uses 'react-table' which may not have type declarations. See project README for details.
import React, { useMemo } from 'react';
import { useTable, useBlockLayout } from 'react-table';
import type { Column,} from 'react-table';
import { useSticky } from 'react-table-sticky';
import { Styles } from './TableStyles';
import MOCK_DATA from './MOCK_DATA';
import { COLUMNS } from './columns';
import './table.css';

export const StickyTable: React.FC = () => {
  const columns = useMemo<Column[]>(() => COLUMNS, []);
  const data = useMemo<unknown[]>(() => MOCK_DATA, []);

  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows
  } = useTable(
    {
      columns,
      data
    },
    useBlockLayout,
    useSticky
  ) as {
    getTableProps: () => Record<string, unknown>;
    getTableBodyProps: () => Record<string, unknown>;
    headerGroups: unknown[];
    rows: unknown[];
  };

  const firstPageRows = rows.slice(0, 15);

  return (
    <Styles>
      <div {...getTableProps()} className="table sticky w-[1000px] h-[500px]">
        <div className="header">
          {headerGroups.map((headerGroup: unknown) => (
            <div {...((headerGroup as { getHeaderGroupProps: () => Record<string, unknown> }).getHeaderGroupProps() as Record<string, unknown>)} className="tr">
              {(headerGroup as { headers: unknown[] }).headers.map((column: unknown) => (
                <div {...((column as { getHeaderProps: () => Record<string, unknown> }).getHeaderProps() as Record<string, unknown>)} className="th">
                  {((column as { render: (type: string) => React.ReactNode }).render('Header') as React.ReactNode)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className="body">
          {firstPageRows.map((row: unknown) => {
            return (
              <div {...((row as { getRowProps: () => Record<string, unknown> }).getRowProps() as Record<string, unknown>)} className="tr">
                {(row as { cells: unknown[] }).cells.map((cell: unknown) => (
                  <div {...((cell as { getCellProps: () => Record<string, unknown> }).getCellProps() as Record<string, unknown>)} className="td">
                    {((cell as { render: (type: string) => React.ReactNode }).render('Cell') as React.ReactNode)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Styles>
  );
} 
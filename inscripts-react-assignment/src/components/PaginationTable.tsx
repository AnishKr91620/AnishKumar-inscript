// This file uses 'react-table' which may not have type declarations. See project README for details.
import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA';
import { COLUMNS } from './columns';
import './table.css';

export const PaginationTable: React.FC = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo<unknown[]>(() => MOCK_DATA, []);

  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize
  } = (useTable as any)(
    {
      columns,
      data,
      initialState: { pageIndex: 2 }
    },
    usePagination
  ) as any;
  const { pageIndex, pageSize } = state;

  return (
    <>
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
          {page.map((row: unknown) => {
            return (
              <tr {...((row as { getRowProps: () => Record<string, unknown> }).getRowProps() as Record<string, unknown>)}>
                {(row as { cells: unknown[] }).cells.map((cell: unknown) => {
                  return <td {...((cell as { getCellProps: () => Record<string, unknown> }).getCellProps() as Record<string, unknown>)}>{((cell as { render: (type: string) => React.ReactNode }).render('Cell') as React.ReactNode)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}>
          {[10, 25, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
} 
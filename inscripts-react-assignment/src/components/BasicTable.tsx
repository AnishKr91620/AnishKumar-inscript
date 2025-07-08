// This file uses 'react-table' which may not have type declarations. See project README for details.
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import type { RowData } from '../types';
import MOCK_DATA from './MOCK_DATA.ts';
import { COLUMNS } from './columns.ts';
import './table.css';
import assignedImg from '../assets/assigned.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DOWN_ARROW = (
  <svg style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }} width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const BLANK_ROW = (serial: number) => {
  // Serial number is first column, rest are blank
  return { id: '', first_name: '', last_name: '', email: '', date_of_birth: '', age: '', country: '', phone: '', serial };
};

export const BasicTable: React.FC = () => {
  const [selectedCol, setSelectedCol] = useState<number | null>(null);
  const [colWidths] = useState<{ [key: number]: number }>({});
  const tableRef = useRef<HTMLDivElement>(null);
  const ROWS = 50;

  // Keyboard navigation state
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const selectedCellRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    if (selectedCellRef.current) {
      selectedCellRef.current.focus({ preventScroll: true });
    }
  }, [selectedCell]);

  // Data: fill up to ROWS, blank after MOCK_DATA
  const data = useMemo<RowData[]>(() => {
    const base = MOCK_DATA;
    const result = [];
    for (let i = 0; i < ROWS; i++) {
      if (i < base.length) {
        result.push({ ...base[i], serial: i + 1 });
      } else {
        result.push(BLANK_ROW(i + 1));
      }
    }
    // @ts-expect-error: Data shape may not match RowData exactly for blank rows, but is safe for rendering.
    return result as RowData[];
  }, []);

  
  const columns = useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  }) as {
    getTableProps: () => Record<string, unknown>;
    getTableBodyProps: () => Record<string, unknown>;
    headerGroups: unknown[];
    rows: unknown[];
    prepareRow: (row: unknown) => void;
  };

  // Remove column selection on cell click
 

  // Keyboard navigation handler
  const handleCellKeyDown = (
    e: React.KeyboardEvent<HTMLTableCellElement>,
    _rowIdx: number,
    _colIdx: number,
    rowsLength: number,
    colsLength: number
  ) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    let newRow = row;
    let newCol = col;
    if (e.key === 'ArrowDown') {
      newRow = Math.min(row + 1, rowsLength - 1);
      setSelectedCell({ row: newRow, col });
      e.preventDefault();
    }
    if (e.key === 'ArrowUp') {
      newRow = Math.max(row - 1, 0);
      setSelectedCell({ row: newRow, col });
      e.preventDefault();
    }
    if (e.key === 'ArrowRight') {
      if (col === colsLength - 2) {
        toast.info('You are at the last editable column. Cannot move right.', { position: 'top-right' });
        e.preventDefault();
        return;
      }
      newCol = Math.min(col + 1, colsLength - 2);
      setSelectedCell({ row, col: newCol });
      e.preventDefault();
    }
    if (e.key === 'ArrowLeft') {
      if (col === 1) {
        toast.info('You are at the first editable column. Cannot move left.', { position: 'top-right' });
        e.preventDefault();
        return;
      }
      newCol = Math.max(col - 1, 1);
      setSelectedCell({ row, col: newCol });
      e.preventDefault();
    }
    // Log info after move
    if (["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) {
      // Get column header if possible
      let header = '';
      if (headerGroups && headerGroups[0] && (headerGroups[0] as { headers: unknown[] }).headers) {
        const headers = (headerGroups[0] as { headers: Array<{ Header?: string }> }).headers;
        if (headers[newCol] && typeof headers[newCol] === 'object' && 'Header' in headers[newCol]) {
          header = (headers[newCol] as { Header?: string }).Header || '';
        }
      }
      console.log(`Moved to cell at row ${newRow}, col ${newCol}${header ? ` (Header: ${header})` : ''}`);
    }
  };

  return (
    <div
      ref={tableRef}
      className="table-container last-column-dashed w-full h-screen overflow-y-auto overflow-x-hidden"
    >
      <table {...getTableProps()}>
        <colgroup><col /><col /><col /><col /><col /><col style={{ width: 94 }} /><col /><col /><col /><col /><col style={{ width: 114 }} /><col style={{ width: 20 }} /></colgroup>
        <thead style={{ position: 'sticky', top: 0, zIndex: 10, background: 'white', height: 37, minHeight: 37, maxHeight: 37 }}>
          {headerGroups.map((headerGroup: unknown, groupIdx: number) => {
            const typedHeaderGroup = headerGroup as { headers: unknown[]; getHeaderGroupProps: () => Record<string, unknown> };
            // Destructure key from headerGroup props
            const { key: headerGroupKey, ...headerGroupProps } = typedHeaderGroup.getHeaderGroupProps();
            return (
              <tr key={(typeof headerGroupKey === 'string' || typeof headerGroupKey === 'number') ? headerGroupKey : groupIdx} {...headerGroupProps}>
                {typedHeaderGroup.headers.map((column: unknown, colIdx: number) => {
                  const typedColumn = column as { Header?: string; id?: string; width?: number; downArrow?: boolean; render?: (type: string) => React.ReactNode };
                  // Destructure key from header props
                  const { key: headerKey, ...headerProps } = (typedColumn as { getHeaderProps: () => Record<string, unknown> }).getHeaderProps();

                  const isSelected = selectedCol === colIdx;
                  const isResizable = colIdx < typedHeaderGroup.headers.length - 4;
                  const isLastCol = colIdx === typedHeaderGroup.headers.length - 1;
                  // Check if this is the Financial overview parent header (contains job request, submitted, status, submitter)
                  const isFinancialOverviewParent = typedColumn.Header === 'Financial overview';
                  // Check if this is the URL parent header (empty header that contains URL column)
                  const isUrlParentHeader = typedColumn.Header === '';
                  // Check if this is the ABC parent header
                  const isAbcParentHeader = typedColumn.Header === 'ABC';
                  // Check if this is the Answer a question parent header
                  const isAnswerQuestionParentHeader = typedColumn.Header === 'Answer a question';
                  // Check if this is the Extract parent header
                  const isExtractParentHeader = typedColumn.Header === 'Extract';
                  // Check if this is the blank parent header (empty header that contains blank column)
                  const isBlankParentHeader = typedColumn.Header === '' && typedColumn.id === 'group-blank';
                  // Check if this is one of the individual header cells (job request, submitted, status, submitter)
                  const isIndividualHeader = ['Job Request', 'submitted', 'status', 'submitter'].includes(String(typedColumn.Header));
                  // If this is the first parent header in the first header row, make background white
                  const isFirstParentHeader = groupIdx === 0 && colIdx === 0;
                  // Add bottom border for ABC, Answer a question, Extract
                  const isBottomBorderGroup = isAbcParentHeader || isAnswerQuestionParentHeader || isExtractParentHeader;
                  // Check if this is the + parent header
                  const isPlusParentHeader = typedColumn.Header === '+';
                  // Only show pointer when not over text or SVG (default: inherit)
                  let thCursor = 'inherit';
                  if (
                    isAbcParentHeader || isAnswerQuestionParentHeader || isExtractParentHeader || isPlusParentHeader
                  ) {
                    thCursor = 'pointer';
                  } else if (isFinancialOverviewParent || isBlankParentHeader) {
                    thCursor = 'default';
                  }
                  // onClick logic for parent headers
                  let thOnClick: (() => void) | undefined = undefined;
                  if (isFinancialOverviewParent || isBlankParentHeader) {
                    thOnClick = undefined;
                  } else if (isAbcParentHeader) {
                    thOnClick = () => toast.info(String('ABC: Grouped for easy access to related columns.'), { position: 'top-right' });
                  } else if (isAnswerQuestionParentHeader) {
                    thOnClick = () => toast.info(String('Answer a question: Columns for Q&A tasks.'), { position: 'top-right' });
                  } else if (isExtractParentHeader) {
                    thOnClick = () => toast.info(String('Extract: Columns for extraction tasks.'), { position: 'top-right' });
                  } else if (isPlusParentHeader) {
                    thOnClick = () => toast.info(String('Add new column or action.'), { position: 'top-right' });
                  }
                  const thStyle = {
                    position: 'relative',
                    width: colWidths[colIdx] || typedColumn.width || 120,
                    height: 37,
                    background: (
                      typedColumn.Header === '#' ? '#f3f3f3' :
                        typedColumn.Header === 'Assigned' ? 'var(--Lvl-2-Background, #E8F0E9)' :
                          typedColumn.Header === 'Priority' ? '#e9e3fb' :
                            typedColumn.Header === 'Due Date' ? '#e9e3fb' :
                              typedColumn.Header === 'Est. Val' ? '#fdebe0' :
                                '#e5e7eb'
                    ),
                    color: 'var(--Lvl-2-Content, #757575)',
                    fontFamily: 'Poppins, Helvetica, sans-serif',
                    fontWeight: 600,
                    fontSize: 12,
                    lineHeight: '16px',
                    letterSpacing: 0,
                    cursor: thCursor,
                    userSelect: 'none',
                    borderLeft: isLastCol ? '2px dashed #aaa' : (isSelected ? '2px solid #4b9ce2' : undefined),
                    borderRight: isLastCol ? '2px dashed #aaa' : (isSelected ? '2px solid #4b9ce2' : undefined),
                  };
                  return (
                    <th
                      key={(typeof headerKey === 'string' || typeof headerKey === 'number') ? headerKey : (typeof typedColumn.id === 'string' ? typedColumn.id : colIdx)}
                      {...headerProps}
                      style={
                        {
                          ...(
                            isFirstParentHeader
                          ? { ...thStyle, background: '#fff' }
                          : isFinancialOverviewParent
                            ? { ...thStyle, background: 'var(--Colours-TrueGrey-200, #E2E2E2)' }
                            : isUrlParentHeader
                              ? { ...thStyle, background: 'var(--Background-Core-backgroundPrimary, #FFFFFF)' }
                              : isAbcParentHeader
                                ? { ...thStyle, background: '#d2dfd3' }
                                : isAnswerQuestionParentHeader
                                  ? { ...thStyle, background: '#dccffb', borderLeft: '2px solid #ebefec', borderRight: '2px solid #ebefec' }
                                  : isExtractParentHeader
                                    ? { ...thStyle, background: '#fbc2af' }
                                    : isBlankParentHeader
                                      ? { ...thStyle, background: '#eeeeee' }
                                      : isIndividualHeader
                                        ? { ...thStyle, background: '#f3f3f3' }
                                            : thStyle
                          ),
                        ...(isBottomBorderGroup ? { borderBottom: '2px solid #ebefec' } : {})
                        } as React.CSSProperties
                      }
                      className={
                        isFirstParentHeader ? 'first-parent-header' :
                          isFinancialOverviewParent ? 'no-hover' :
                            isAbcParentHeader || isAnswerQuestionParentHeader || isExtractParentHeader || isPlusParentHeader ? undefined :
                              isBlankParentHeader ? 'no-hover' : undefined
                      }
                      onClick={thOnClick}
                    >
                      <span style={{ position: 'relative', paddingRight: isResizable ? 18 : 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 37 }}>
                        <span style={{ flex: 1, textAlign: 'left' }}>
                          {typeof typedColumn.Header === 'function' ? (
                            (typedColumn.Header as () => React.ReactNode)()
                          ) : typedColumn.Header === '#' ? (
                            <div className="flex items-center justify-center gap-1 opacity-100 ml-[-14px]">
                              <div
                                className="flex items-center opacity-100 font-normal not-italic text-[18px] leading-5 tracking-[0%] text-[#d2d2d2] mt-0.5 ml-3"
                                style={{ transform: 'rotate(0deg)', fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji","Segoe UI Symbol", "Noto Color Emoji"' }}
                                onClick={e => {
                                  e.stopPropagation();
                                  console.log(`Header '#' clicked: You can sort or filter this column.`);
                                }}
                              >
                                {typedColumn.Header}
                              </div>
                            </div>
                          ) : typedColumn.Header === 'Job Request' ? (
                            <div className="flex items-center gap-1 w-[210px] h-5 relative">
                              {/* Job Request Icon + Text */}
                              <div className="flex items-center gap-1 opacity-100" style={{ transform: 'rotate(0deg)' }}>
                                <div className="relative w-4 h-4 opacity-100 ml-[5px]" style={{ transform: 'rotate(0deg)' }}>
                                  <svg
                                    width="17"
                                    height="18"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute"
                                    style={{
                                      width: '17px',
                                      height: '18px',
                                      top: '1.33px',
                                      left: '2px',
                                      color: 'var(--Lvl-2-Icon, #AFAFAF)',
                                      marginTop: -1,
                                    }}
                                  >
                                    <path d="M6.83333 2.33333H9.16667C9.44281 2.33333 9.66667 2.55719 9.66667 2.83333V3.99999H6.33333V2.83333C6.33333 2.55719 6.55719 2.33333 6.83333 2.33333ZM5.33333 2.83333V3.99999H4.16667C2.97005 3.99999 2 4.97004 2 6.16666V7.16666C2 7.81099 2.52233 8.33333 3.16667 8.33333H6.66667V8C6.66667 7.63181 6.96514 7.33333 7.33333 7.33333H8.66667C9.03486 7.33333 9.33333 7.6318 9.33333 8V8.33333H12.8333C13.4777 8.33333 14 7.81099 14 7.16666V6.16666C14 4.97004 13.03 3.99999 11.8333 3.99999H10.6667V2.83333C10.6667 2.0049 9.99509 1.33333 9.16667 1.33333H6.83333C6.00491 1.33333 5.33333 2.0049 5.33333 2.83333ZM14 8.99272C13.6632 9.20833 13.2629 9.33333 12.8333 9.33333H9.33333C9.33333 9.70152 9.03486 10 8.66667 10H7.33333C6.96514 10 6.66667 9.70152 6.66667 9.33333H3.16667C2.73712 9.33333 2.33677 9.20833 2 8.99272V11.1667C2 12.3633 2.97005 13.3333 4.16667 13.3333H11.8333C13.03 13.3333 14 12.3633 14 11.1667V8.99272Z" fill="#AFAFAF" />
                                    <path d="M6.83333 2.33333H9.16667C9.44281 2.33333 9.66667 2.55719 9.66667 2.83333V3.99999H6.33333V2.83333C6.33333 2.55719 6.55719 2.33333 6.83333 2.33333ZM5.33333 2.83333V3.99999H4.16667C2.97005 3.99999 2 4.97004 2 6.16666V7.16666C2 7.81099 2.52233 8.33333 3.16667 8.33333H6.66667V8C6.66667 7.63181 6.96514 7.33333 7.33333 7.33333H8.66667C9.03486 7.33333 9.33333 7.6318 9.33333 8V8.33333H12.8333C13.4777 8.33333 14 7.81099 14 7.16666V6.16666C14 4.97004 13.03 3.99999 11.8333 3.99999H10.6667V2.83333C10.6667 2.0049 9.99509 1.33333 9.16667 1.33333H6.83333C6.00491 1.33333 5.33333 2.0049 5.33333 2.83333ZM14 8.99272C13.6632 9.20833 13.2629 9.33333 12.8333 9.33333H9.33333C9.33333 9.70152 9.03486 10 8.66667 10H7.33333C6.96514 10 6.66667 9.70152 6.66667 9.33333H3.16667C2.73712 9.33333 2.33677 9.20833 2 8.99272V11.1667C2 12.3633 2.97005 13.3333 4.16667 13.3333H11.8333C13.03 13.3333 14 12.3633 14 11.1667V8.99272Z" fill="black" fillOpacity="0.7" style={{ mixBlendMode: 'hue' }} />
                                    <path d="M6.83333 2.33333H9.16667C9.44281 2.33333 9.66667 2.55719 9.66667 2.83333V3.99999H6.33333V2.83333C6.33333 2.55719 6.55719 2.33333 6.83333 2.33333ZM5.33333 2.83333V3.99999H4.16667C2.97005 3.99999 2 4.97004 2 6.16666V7.16666C2 7.81099 2.52233 8.33333 3.16667 8.33333H6.66667V8C6.66667 7.63181 6.96514 7.33333 7.33333 7.33333H8.66667C9.03486 7.33333 9.33333 7.6318 9.33333 8V8.33333H12.8333C13.4777 8.33333 14 7.81099 14 7.16666V6.16666C14 4.97004 13.03 3.99999 11.8333 3.99999H10.6667V2.83333C10.6667 2.0049 9.99509 1.33333 9.16667 1.33333H6.83333C6.00491 1.33333 5.33333 2.0049 5.33333 2.83333ZM14 8.99272C13.6632 9.20833 13.2629 9.33333 12.8333 9.33333H9.33333C9.33333 9.70152 9.03486 10 8.66667 10H7.33333C6.96514 10 6.66667 9.70152 6.66667 9.33333H3.16667C2.73712 9.33333 2.33677 9.20833 2 8.99272V11.1667C2 12.3633 2.97005 13.3333 4.16667 13.3333H11.8333C13.03 13.3333 14 12.3633 14 11.1667V8.99272Z" fill="white" fillOpacity="0.16" />
                                  </svg>
                                </div>
                                <div
                                  className="flex items-center font-semibold not-italic text-[14px] leading-4 tracking-[0%] text-[#757575] mt-0.5 ml-[5px]"
                                  style={{ transform: 'rotate(0deg)', fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}
                                  onClick={e => {
                                    e.stopPropagation();
                                    console.log(`Header 'Job Request' clicked: You can sort or filter this column.`);
                                  }}
                                >
                                  {typedColumn.Header}
                                </div>
                              </div>
                              {/* Down Arrow Button */}
                              <div
                                className="flex items-center justify-center gap-2 w-5 h-5 rounded p-1 opacity-100 cursor-pointer"
                                onClick={e => { e.stopPropagation(); toast.info('Column options: Click to sort, filter, or hide this column.', { position: 'top-right' }); }}
                              >
                                <div className="flex items-center justify-center w-3 h-3 opacity-100 relative ml-[250px]">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute"
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      top: '4px',
                                      left: '2px',
                                      color: 'var(--Lvl-2-Icon, #AFAFAF)',
                                      marginTop: -6,
                                      marginLeft: 6,
                                    }}
                                  >
                                    <path fill="none" d="M24 24H0V0h24v24z" opacity=".87"></path>
                                    <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" fill="currentColor"></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ) : typedColumn.Header === 'Financial overview' ? (
                            <div className="flex items-center gap-1">
                              <div
                                className="flex items-center justify-center gap-1 w-[188px] h-6 p-1 rounded bg-[#EEEEEE] opacity-100 font-normal text-[14px] ml-[8px] cursor-pointer"
                                style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}
                                onClick={() => console.log('Clicked on Q3 financial Overview')}
                              >
                                <div className="relative w-4 h-4 opacity-100">
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 256 256"
                                    height="1em"
                                    width="1em"
                                    className="absolute"
                                    style={{
                                      width: '16.33px',
                                      height: '18.67px',
                                      top: '4.67px',
                                      left: '1.33px',
                                      color: 'var(--Icons-Medium-Emphasis-Blue-Op-100, #1A8CFF)',
                                      marginTop: -5,
                                      marginLeft: -4,
                                    }}
                                  >
                                    <path d="M80,122h96a6,6,0,0,1,0,12H80a6,6,0,0,1,0-12Zm24,48H64a42,42,0,0,1,0-84h40a6,6,0,0,0,0-12H64a54,54,0,0,0,0,108h40a6,6,0,0,0,0-12Zm88-96H152a6,6,0,0,0,0,12h40a42,42,0,0,1,0,84H152a6,6,0,0,0,0,12h40a54,54,0,0,0,0-108Z"></path>
                                  </svg>
                                </div>
                                <span className="mx-[2px]">Q3</span> Financial Overview
                              </div>
                              <div className="relative w-4 h-4 opacity-100 cursor-pointer"
                              onClick={() => console.log('Clicked on Refresh')}>
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 1024 1024"
                                  height="1em"
                                  width="1em"
                                  className="absolute"
                                  style={{
                                    width: '15.67px',
                                    height: '15.33px',
                                    top: '0.83px',
                                    left: '2.17px',
                                    color: 'var(--Icons-Medium-Emphasis-Orange-Op-100, #FA6736)',
                                    marginLeft: 2,
                                  }}
                                >
                                  <path d="M497.408 898.56c-.08-.193-.272-.323-.385-.483l-91.92-143.664c-6.528-10.72-20.688-14.527-31.728-8.512l-8.193 5.04c-11.007 6-10.767 21.537-4.255 32.256l58.927 91.409c-5.024-1.104-10.096-2-15.056-3.296-103.184-26.993-190.495-96.832-239.535-191.6-46.336-89.52-55.04-191.695-24.512-287.743 30.512-96.048 99.775-174.464 189.295-220.784 15.248-7.888 21.2-26.64 13.312-41.856-7.872-15.264-26.64-21.231-41.855-13.327-104.272 53.952-184.4 145.28-219.969 257.152C45.982 485.008 56.11 604.033 110.078 708.29c57.136 110.336 158.832 191.664 279.024 223.136 1.36.352 2.784.56 4.16.911l-81.311 41.233c-11.008 6.032-14.657 19.631-8.128 30.351l3.152 8.176c6.56 10.72 17.84 14.527 28.815 8.512L484.622 944.4c.193-.128.385-.096.578-.224l9.984-5.456c5.52-3.024 9.168-7.969 10.624-13.505 1.52-5.52.815-11.663-2.448-16.991zm416.496-577.747c-57.056-110.304-155.586-191.63-275.762-223.118-8.56-2.24-17.311-3.984-26.048-5.712l79.824-40.48c11.008-6.033 17.568-19.632 11.04-30.369l-3.153-8.16c-6.56-10.736-20.752-14.528-31.727-8.528L519.262 80.654c-.176.112-.384.08-.577.208l-9.967 5.472c-5.537 3.04-9.168 7.967-10.624 13.503-1.52 5.52-.816 11.648 2.464 16.976l5.92 9.712c.096.192.272.305.384.497l91.92 143.648c6.512 10.736 20.688 14.528 31.712 8.513l7.216-5.025c11.008-6 11.727-21.536 5.231-32.24l-59.2-91.856c13.008 2 25.968 4.416 38.624 7.76 103.232 27.04 187.393 96.864 236.4 191.568 46.32 89.519 55.024 191.695 24.48 287.728-30.511 96.047-96.655 174.448-186.174 220.816-15.233 7.887-21.168 26.607-13.28 41.87 5.519 10.64 16.335 16.768 27.599 16.768 4.8 0 9.664-1.12 14.272-3.488 104.272-53.936 181.248-145.279 216.816-257.119 35.536-111.904 25.393-230.929-28.574-335.152z"></path>
                                </svg>
                              </div>
                            </div>
                          ) : typedColumn.Header === 'ABC' ? (
                            <div className="flex items-center justify-center gap-1 w-[91px] h-6 opacity-100 rounded-[4px] pt-[2px] pr-1 pb-[2px] pl-1">
                              <div className="relative w-4 h-4 opacity-100">
                                <svg
                                  width="18"
                                  height="19"
                                  viewBox="0 0 17 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="absolute"
                                  style={{
                                    width: '20px',
                                    height: '24px',
                                    top: '2px',
                                    left: '2px',
                                    color: 'var(--Lvl-1-Icon, #A3ACA3)',
                                    marginTop: -5,
                                    marginLeft: 10,
                                  }}
                                >
                                  <path d="M8.49995 2C8.7761 2 8.99995 2.22386 8.99995 2.5V6.33333H10.6636C11.6761 6.33333 12.4969 7.15414 12.4969 8.16667V12.2944L13.6466 11.1462C13.842 10.9511 14.1586 10.9513 14.3537 11.1467C14.5489 11.3421 14.5487 11.6587 14.3533 11.8538L12.3502 13.8541C12.1549 14.0492 11.8385 14.0491 11.6434 13.8539L9.64302 11.8536C9.44775 11.6583 9.44775 11.3417 9.64302 11.1464C9.83828 10.9512 10.1549 10.9512 10.3501 11.1464L11.4969 12.2932V8.16667C11.4969 7.70643 11.1238 7.33333 10.6636 7.33333H6.33322C5.87298 7.33333 5.49989 7.70643 5.49989 8.16667V12.2932L6.64667 11.1464C6.84193 10.9512 7.15852 10.9512 7.35378 11.1464C7.54904 11.3417 7.54904 11.6583 7.35378 11.8536L5.35344 13.8539C5.15818 14.0492 4.8416 14.0492 4.64634 13.8539L2.64596 11.8536C2.4507 11.6583 2.45069 11.3417 2.64595 11.1465C2.84122 10.9512 3.1578 10.9512 3.35306 11.1464L4.49989 12.2932V8.16667C4.49989 7.15414 5.3207 6.33333 6.33322 6.33333H7.99995V2.5C7.99995 2.22386 8.22381 2 8.49995 2Z" fill="currentColor" />
                                </svg>
                              </div>
                              <span
                                className="flex items-center font-medium not-italic text-[14px] leading-5 tracking-[0%] text-[#505450] ml-5 w-[29px] h-5 opacity-100"
                                style={{
                                  fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                }}
                                onClick={e => {
                                  e.stopPropagation();
                                  console.log(`Header 'ABC' clicked: You can sort or filter this column.`);
                                }}
                              >
                                {typedColumn.Header}
                              </span>
                              <div className="flex items-center justify-center gap-2 w-5 h-5 rounded-[4px] opacity-100">
                                <div className="flex items-center justify-center w-4 h-4 opacity-100">
                                  <span className="text-[#afafaf] text-[18px] tracking-[0.05em] ml-2 translate-y-[-1px] leading-none mt-[-3px]">
                                    ...
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : typedColumn.Header === 'submitter' ? (
                            <div className="flex items-center gap-1 w-[88px] h-4 opacity-100">
                              <div className="relative flex items-center justify-center w-4 h-4 opacity-100 ml-[5px]">
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 448 512"
                                  height="16px"
                                  width="16px"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="absolute"
                                  style={{
                                    color: '#bcbcbc',
                                    width: '16px',
                                    height: '16px',
                                    top: 0,
                                    left: 0,
                                    marginTop: 1,
                                  }}
                                >
                                  <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                                </svg>
                              </div>
                              <div
                                className="flex items-center font-medium not-italic text-[14px] leading-5 tracking-[0%] text-[#757575] ml-[18px] mt-1 w-[68px] h-4 opacity-100"
                                style={{
                                  fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                }}
                              >
                                {"Submitter"}
                              </div>
                              <div
                                className="flex items-center justify-center gap-2 w-5 h-5 rounded-[4px] p-1 opacity-100 cursor-pointer"
                                onClick={e => {
                                  e.stopPropagation();
                                  toast.info('Column options: Click to sort, filter, or hide this column.', { position: 'top-right' });
                                }}
                              >
                                <div className="flex items-center justify-center w-3 h-3 opacity-100 relative">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute"
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      top: '4px',
                                      left: '2px',
                                      color: 'var(--Lvl-2-Icon, #AFAFAF)',
                                      marginTop: -6,
                                      marginLeft: 4,
                                    }}
                                  >
                                    <path fill="none" d="M24 24H0V0h24v24z" opacity=".87"></path>
                                    <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" fill="currentColor"></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ) : typedColumn.Header === 'submitted' ? (
                            <div className="flex items-center gap-1 w-[78px] h-4 opacity-100 relative ml-[5px]">
                              <div className="relative flex items-center justify-center w-4 h-4 opacity-100">
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="absolute"
                                  style={{
                                    width: '18px',
                                    height: '18px',
                                    top: '2px',
                                    left: '2px',
                                    color: 'var(--Lvl-2-Icon, #AFAFAF)',
                                    marginLeft: -2,
                                    marginTop: -2,
                                  }}
                                >
                                  <path d="M14 5.66667V11.8333C14 13.03 13.03 14 11.8333 14H4.16667C2.97005 14 2 13.03 2 11.8333V5.66667H14ZM4.83333 10C4.3731 10 4 10.3731 4 10.8333C4 11.2936 4.3731 11.6667 4.83333 11.6667C5.29357 11.6667 5.66667 11.2936 5.66667 10.8333C5.66667 10.3731 5.29357 10 4.83333 10ZM8 10C7.53976 10 7.16667 10.3731 7.16667 10.8333C7.16667 11.2936 7.53976 11.6667 8 11.6667C8.46024 11.6667 8.83333 11.2936 8.83333 10.8333C8.83333 10.3731 8.46024 10 8 10ZM4.83333 7C4.3731 7 4 7.3731 4 7.83333C4 8.29357 4.3731 8.66667 4.83333 8.66667C5.29357 8.66667 5.66667 8.29357 5.66667 7.83333C5.66667 7.3731 5.29357 7 4.83333 7ZM8 7C7.53976 7 7.16667 7.3731 7.16667 7.83333C7.16667 8.29357 7.53976 8.66667 8 8.66667C8.46024 8.66667 8.83333 8.29357 8.83333 7.83333C8.83333 7.3731 8.46024 7 8 7ZM11.1667 7C10.7064 7 10.3333 7.3731 10.3333 7.83333C10.3333 8.29357 10.7064 8.66667 11.1667 8.66667C11.6269 8.66667 12 8.29357 12 7.83333C12 7.3731 11.6269 7 11.1667 7ZM11.8333 2C13.03 2 14 2.97005 14 4.16667V4.66667H2V4.16667C2 2.97005 2.97005 2 4.16667 2H11.8333Z" fill="#AFAFAF" />
                                  <path d="M14 5.66667V11.8333C14 13.03 13.03 14 11.8333 14H4.16667C2.97005 14 2 13.03 2 11.8333V5.66667H14ZM4.83333 10C4.3731 10 4 10.3731 4 10.8333C4 11.2936 4.3731 11.6667 4.83333 11.6667C5.29357 11.6667 5.66667 11.2936 5.66667 10.8333C5.66667 10.3731 5.29357 10 4.83333 10ZM8 10C7.53976 10 7.16667 10.3731 7.16667 10.8333C7.16667 11.2936 7.53976 11.6667 8 11.6667C8.46024 11.6667 8.83333 11.2936 8.83333 10.8333C8.83333 10.3731 8.46024 10 8 10ZM4.83333 7C4.3731 7 4 7.3731 4 7.83333C4 8.29357 4.3731 8.66667 4.83333 8.66667C5.29357 8.66667 5.66667 8.29357 5.66667 7.83333C5.66667 7.3731 5.29357 7 4.83333 7ZM8 7C7.53976 7 7.16667 7.3731 7.16667 7.83333C7.16667 8.29357 7.53976 8.66667 8 8.66667C8.46024 8.66667 8.83333 8.29357 8.83333 7.83333C8.83333 7.3731 8.46024 7 8 7ZM11.1667 7C10.7064 7 10.3333 7.3731 10.3333 7.83333C10.3333 8.29357 10.7064 8.66667 11.1667 8.66667C11.6269 8.66667 12 8.29357 12 7.83333C12 7.3731 11.6269 7 11.1667 7ZM11.8333 2C13.03 2 14 2.97005 14 4.16667V4.66667H2V4.16667C2 2.97005 2.97005 2 4.16667 2H11.8333Z" fill="black" fillOpacity="0.7" style={{ mixBlendMode: 'hue' }} />
                                  <path d="M14 5.66667V11.8333C14 13.03 13.03 14 11.8333 14H4.16667C2.97005 14 2 13.03 2 11.8333V5.66667H14ZM4.83333 10C4.3731 10 4 10.3731 4 10.8333C4 11.2936 4.3731 11.6667 4.83333 11.6667C5.29357 11.6667 5.66667 11.2936 5.66667 10.8333C5.66667 10.3731 5.29357 10 4.83333 10ZM8 10C7.53976 10 7.16667 10.3731 7.16667 10.8333C7.16667 11.2936 7.53976 11.6667 8 11.6667C8.46024 11.6667 8.83333 11.2936 8.83333 10.8333C8.83333 10.3731 8.46024 10 8 10ZM4.83333 7C4.3731 7 4 7.3731 4 7.83333C4 8.29357 4.3731 8.66667 4.83333 8.66667C5.29357 8.66667 5.66667 8.29357 5.66667 7.83333C5.66667 7.3731 5.29357 7 4.83333 7ZM8 7C7.53976 7 7.16667 7.3731 7.16667 7.83333C7.16667 8.29357 7.53976 8.66667 8 8.66667C8.46024 8.66667 8.83333 8.29357 8.83333 7.83333C8.83333 7.3731 8.46024 7 8 7ZM11.1667 7C10.7064 7 10.3333 7.3731 10.3333 7.83333C10.3333 8.29357 10.7064 8.66667 11.1667 8.66667C11.6269 8.66667 12 8.29357 12 7.83333C12 7.3731 11.6269 7 11.1667 7ZM11.8333 2C13.03 2 14 2.97005 14 4.16667V4.66667H2V4.16667C2 2.97005 2.97005 2 4.16667 2H11.8333Z" fill="white" fillOpacity="0.16" />
                                </svg>
                              </div>
                              <div
                                className="flex items-center font-medium not-italic text-[14px] leading-4 tracking-[0%] text-[#757575] ml-5 mt-1 w-[68px] h-4 opacity-100"
                                style={{
                                  fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                }}
                                onClick={e => {
                                  e.stopPropagation();
                                  console.log(`Header 'submitted' clicked: You can sort or filter this column.`);
                                }}
                              >
                                {'Submitted'}
                              </div>
                              <div
                                className="flex items-center justify-center gap-2 w-5 h-5 rounded-[4px] p-1 opacity-100 cursor-pointer"
                                onClick={e => {
                                  e.stopPropagation();
                                  toast.info('Column options: Click to sort, filter, or hide this column.', { position: 'top-right' });
                                }}
                              >
                                <div className="flex items-center justify-center w-3 h-3 opacity-100 relative">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute"
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      top: '4px',
                                      left: '2px',
                                      color: 'var(--Lvl-2-Icon, #AFAFAF)',
                                      marginTop: -6,
                                      marginLeft: 10,
                                    }}
                                  >
                                    <path fill="none" d="M24 24H0V0h24v24z" opacity=".87"></path>
                                    <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" fill="currentColor"></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ) : typedColumn.Header === 'Answer a question' ? (
                            <div className="flex items-center justify-center gap-1 w-[199px] h-6 opacity-100 rounded-[4px] pt-[2px] pr-1 pb-[2px] pl-1 ml-5">
                              <div className="relative w-4 h-4 opacity-100">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="absolute"
                                  style={{
                                    width: '20px',
                                    height: '24px',
                                    top: '2px',
                                    left: '2px',
                                    color: 'var(--Lvl-1-Icon, #FFFFFF)',
                                    marginTop: -5,
                                    marginLeft: 12,
                                  }}
                                >
                                  <path d="M10.0001 2.5C10.3452 2.5 10.6251 2.77982 10.6251 3.125V7.91667H12.7046C13.9702 7.91667 14.9963 8.94268 14.9963 10.2083V15.368L16.4334 13.9328C16.6777 13.6888 17.0734 13.6891 17.3173 13.9334C17.5612 14.1776 17.5609 14.5733 17.3167 14.8172L14.8129 17.3177C14.5688 17.5615 14.1733 17.5613 13.9293 17.3174L11.4289 14.8169C11.1848 14.5729 11.1848 14.1771 11.4289 13.9331C11.673 13.689 12.0687 13.689 12.3128 13.9331L13.7463 15.3665V10.2083C13.7463 9.63304 13.2799 9.16667 12.7046 9.16667H7.29165C6.71635 9.16667 6.24998 9.63304 6.24998 10.2083V15.3665L7.68346 13.9331C7.92754 13.689 8.32327 13.689 8.56734 13.9331C8.81142 14.1771 8.81142 14.5729 8.56734 14.8169L6.06692 17.3174C5.82285 17.5614 5.42712 17.5614 5.18304 17.3174L2.68257 14.8169C2.43849 14.5729 2.43849 14.1771 2.68257 13.9331C2.92664 13.689 3.32237 13.689 3.56645 13.9331L4.99998 15.3666V10.2083C4.99998 8.94268 6.026 7.91667 7.29165 7.91667H9.37506V3.125C9.37506 2.77982 9.65488 2.5 10.0001 2.5Z" fill="currentColor" />
                                </svg>
                              </div>
                              <div
                                className="flex items-center font-medium not-italic text-[14px] leading-5 tracking-[0%] text-[#463E59] ml-5 w-[127px] h-5 opacity-100"
                                style={{
                                  fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                }}
                                onClick={e => {
                                  e.stopPropagation();
                                  console.log(`Header 'Answer a question' clicked: You can sort or filter this column.`);
                                }}
                              >
                                {typedColumn.Header}
                              </div>
                              <div className="flex items-center justify-center gap-2 w-5 h-5 rounded-[4px] opacity-100">
                                <div className="flex items-center justify-center w-4 h-4 opacity-100">
                                  <span className="text-[#afafaf] text-[18px] tracking-[0.05em] ml-2 translate-y-[-1px] leading-none mt-[-3px]">
                                    ...
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : typedColumn.Header === 'Extract' ? (
                            <div className="flex items-center justify-center gap-1 w-[102px] ml-[14px] h-6 opacity-100 rounded-[4px] pt-[2px] pr-1 pb-[2px] pl-1">
                              <div className="relative w-4 h-4 opacity-100 ml-[3px]">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="absolute"
                                  style={{
                                    width: '20px',
                                    height: '24px',
                                    top: '2px',
                                    left: '2px',
                                    color: 'var(--Lvl-1-Icon, #FFFFFF)',
                                    marginTop: -5,
                                    marginLeft: -2,
                                  }}
                                >
                                  <path d="M10.0001 2.5C10.3452 2.5 10.6251 2.77982 10.6251 3.125V7.91667H12.7046C13.9702 7.91667 14.9963 8.94268 14.9963 10.2083V15.368L16.4334 13.9328C16.6777 13.6888 17.0734 13.6891 17.3173 13.9334C17.5612 14.1776 17.5609 14.5733 17.3167 14.8172L14.8129 17.3177C14.5688 17.5615 14.1733 17.5613 13.9293 17.3174L11.4289 14.8169C11.1848 14.5729 11.1848 14.1771 11.4289 13.9331C11.673 13.689 12.0687 13.689 12.3128 13.9331L13.7463 15.3665V10.2083C13.7463 9.63304 13.2799 9.16667 12.7046 9.16667H7.29165C6.71635 9.16667 6.24998 9.63304 6.24998 10.2083V15.3665L7.68346 13.9331C7.92754 13.689 8.32327 13.689 8.56734 13.9331C8.81142 14.1771 8.81142 14.5729 8.56734 14.8169L6.06692 17.3174C5.82285 17.5614 5.42712 17.5614 5.18304 17.3174L2.68257 14.8169C2.43849 14.5729 2.43849 14.1771 2.68257 13.9331C2.92664 13.689 3.32237 13.689 3.56645 13.9331L4.99998 15.3666V10.2083C4.99998 8.94268 6.026 7.91667 7.29165 7.91667H9.37506V3.125C9.37506 2.77982 9.65488 2.5 10.0001 2.5Z" fill="currentColor" />
                                </svg>
                              </div>
                              <div
                                className="flex items-center font-medium not-italic text-[14px] leading-5 tracking-[0%] text-[#695149] ml-1 w-[50px] h-5 opacity-100"
                                style={{
                                  fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                }}
                                onClick={e => {
                                  e.stopPropagation();
                                  console.log(`Header 'Extract' clicked: You can sort or filter this column.`);
                                }}
                              >
                                {typedColumn.Header}
                              </div>
                              <div className="flex items-center justify-center w-4 h-4 opacity-100">
                                <span className="text-[#afafaf] text-[18px] tracking-[0.05em] ml-[-1] translate-y-[-1px] leading-none mt-[-3px]">
                                  ...
                                </span>
                              </div>
                            </div>

                          ) : typedColumn.Header === 'status' ? (
                            <div className="flex items-center gap-1 w-[88px] h-4 opacity-100">
                              <div className="relative ml-[5px] flex items-center justify-center w-4 h-4 opacity-100">
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 24 24"
                                  height="16.33"
                                  width="17.33"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="absolute"
                                  style={{
                                    top: '1.33px',
                                    left: '1.33px',
                                    color: '#bcbcbc',
                                    opacity: 1,
                                  }}
                                >
                                  <path fill="none" d="M0 0h24v24H0z"></path>
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13.5L7.5 11l1.42-1.41L12 12.67l3.08-3.08L16.5 11 12 15.5z"></path>
                                </svg>
                              </div>
                              <div
                                className="flex items-center font-medium not-italic text-[15px] leading-5 tracking-[0%] text-[#757575] ml-5 mt-[1px] w-[68px] h-4 opacity-100"
                                style={{
                                  fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                }}
                              >
                                {"Status"}
                              </div>
                              <div
                                className="flex items-center justify-center gap-2 w-5 h-5 rounded-[4px] p-1 opacity-100 cursor-pointer"
                                onClick={e => {
                                  e.stopPropagation();
                                  toast.info('Column options: Click to sort, filter, or hide this column.', { position: 'top-right' });
                                }}
                              >
                                <div className="flex items-center justify-center w-3 h-3 opacity-100 relative">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute"
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      top: '4px',
                                      left: '2px',
                                      color: 'var(--Lvl-2-Icon, #AFAFAF)',
                                      marginTop: -6,
                                      marginLeft: 34,
                                    }}
                                  >
                                    <path fill="none" d="M24 24H0V0h24v24z" opacity=".87"></path>
                                    <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" fill="currentColor"></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ) : typedColumn.Header === 'URL' ? (
                            <div className="flex items-center gap-1 w-[88px] h-4 opacity-100 ml-[5px]">
                              <div className="relative flex items-center justify-center w-4 h-4 opacity-100">
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 512 512"
                                  height="18px"
                                  width="18px"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="absolute"
                                  style={{
                                    color: '#bcbcbc',
                                    width: '16px',
                                    height: '16px',
                                    top: 0,
                                    left: 0,
                                    opacity: 1,
                                  }}
                                >
                                  <path d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z"></path>
                                </svg>
                              </div>
                              <div
                                className="flex items-center font-medium not-italic text-[14px] leading-5 tracking-[0%] text-[#757575] ml-2 mt-[-0.5] w-[68px] h-4 opacity-100"
                                style={{
                                  fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                }}
                              >
                                {"URL"}
                              </div>
                              <div
                                className="flex items-center justify-center w-5 h-5 rounded-[4px] p-1 opacity-100 cursor-pointer"
                                onClick={e => {
                                  e.stopPropagation();
                                  toast.info('Column options: Click to sort, filter, or hide this column.', { position: 'top-right' });
                                }}
                              >
                                <div className="flex items-center justify-center w-3 h-3 opacity-100 relative">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute"
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      top: '4px',
                                      left: '2px',
                                      color: 'var(--Lvl-2-Icon, #AFAFAF)',
                                      marginTop: -6,
                                      marginLeft: 28,
                                    }}
                                  >
                                    <path fill="none" d="M24 24H0V0h24v24z" opacity=".87"></path>
                                    <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" fill="currentColor"></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ) : typedColumn.Header === 'Assigned' ? (
                            <div className="flex items-center gap-1 w-[102px] h-4 opacity-100 ml-[5px]">
                              <div className="relative flex items-center justify-center w-[14px] h-[14px] opacity-100">
                                <img
                                  src={assignedImg}
                                  alt="Assigned Icon"
                                  className="absolute"
                                  style={{
                                    width: '16px',
                                    height: '16px',
                                    top: '0.67px',
                                    left: '1.67px',
                                    marginTop: -2,
                                    color: 'var(--Icons-Medium-Emphasis-BrandPrimary-Op-60, #83A588)',
                                    opacity: 1,
                                  }}
                                />
                              </div>
                              <div
                                className="flex items-center font-semibold not-italic text-[14px] leading-5 tracking-[0%] text-[#757575] ml-2 mt-[-0.5] w-[78px] h-4 opacity-100"
                                style={{
                                  fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                }}
                              >
                                {typedColumn.Header}
                              </div>
                            </div>
                          ) : typedColumn.Header === 'Priority' ? (
                            <div className='ml-[8px]'>{typedColumn.Header}</div>
                          ) : typedColumn.Header === 'Due Date' ? (
                            <div className='ml-[8px]'>{typedColumn.Header}</div>
                          ) : typedColumn.Header === 'Est. Val' ? (
                            <div
                              className="flex ml-[-20px] items-center justify-end w-[90px] h-4 opacity-100 font-medium not-italic text-[14px] leading-[19px] tracking-[0%] text-right text-[#a38780]"
                              style={{
                                fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                              }}
                            >
                              {"Est. Value"}
                            </div>
                          ) : typedColumn.Header === '+' ? (
                            <div className="flex ml-[15px] items-center justify-center w-5 h-5 opacity-100" style={{ transform: 'rotate(0deg)' }}>
                              <div
                                className="relative flex items-center justify-center mb-1"
                                style={{
                                  width: '14.59px',
                                  height: '14.58px',
                                  top: '2.5px',
                                  left: '2.5px',
                                  color: '#04071E',
                                  fontSize: 24,
                                  fontWeight: 300,
                                  marginLeft: 70,
                                  transform: 'rotate(0deg)',
                                  opacity: 1,
                                  fontFamily: 'Roboto, sans-serif',
                                }}
                              >
                                +
                              </div>
                            </div>
                          ) : (
                            typedColumn.Header
                          )}
                        </span>
                        {/* Down arrow except last four columns */}
                        {(typedColumn as { downArrow?: boolean }).downArrow && colIdx < typedHeaderGroup.headers.length - 4 && (
                          <span
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', cursor: 'pointer' }}
                            onClick={e => {
                              e.stopPropagation();
                              toast.info('Column options: Click to sort, filter, or hide this column.', { position: 'top-right' });
                            }}
                          >
                            {DOWN_ARROW}
                          </span>
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.slice(0, 25).map((row: unknown, rowIdx: number) => {
            const typedRow = row as unknown;
            prepareRow(typedRow);
            // Destructure key from row props
            const { key: rowKey, ...rowProps } = (typedRow as { getRowProps: () => Record<string, unknown> }).getRowProps();
            return (
              <tr key={(typeof rowKey === 'string' || typeof rowKey === 'number') ? rowKey : rowIdx} {...rowProps}>
                {(typedRow as { cells: unknown[] }).cells.map((cell: unknown, colIdx: number) => {
                  const typedCell = cell as unknown;
                  const cellProps = (typedCell as { getCellProps: () => Record<string, unknown> }).getCellProps();
                  const { key: cellKey, ...restCellProps } = cellProps;
                  const rowIndex = (typedRow as { index: number }).index;
                  const isLastCol = colIdx === (typedRow as { cells: unknown[] }).cells.length - 1;
                  const isColSelected = selectedCol === colIdx;
                  const cellForWidth = (typedRow as { cells: unknown[] }).cells[colIdx] as { column: { width?: number } };
                  let cellWidth = 120;
                  if (colWidths[colIdx]) {
                    cellWidth = colWidths[colIdx];
                  } else if (
                    cellForWidth &&
                    typeof cellForWidth === 'object' &&
                    'column' in cellForWidth &&
                    cellForWidth.column &&
                    typeof cellForWidth.column === 'object' &&
                    'width' in cellForWidth.column &&
                    typeof cellForWidth.column.width === 'number'
                  ) {
                    cellWidth = cellForWidth.column.width;
                  }
                  const tdStyle = {
                    background: selectedCol !== null && isColSelected && rowIndex !== 0 ? '#e5e7eb' : undefined,
                    borderLeft: isLastCol ? '2px dashed #aaa' : (isColSelected ? '2px solid #4b9ce2' : undefined),
                    borderRight: isLastCol ? '2px dashed #aaa' : (isColSelected ? '2px solid #4b9ce2' : undefined),
                    width: cellWidth,
                    height: 32,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    cursor: selectedCol !== null ? 'default' : undefined,
                  };
                  // Extract column once for all checks
                  const cellColumn = (typedCell as { column?: { id?: string; accessor?: string } }).column;
                  // Check if this is the # column (serial number column)
                  const isSerialCell = cellColumn?.id === 'serial' || cellColumn?.accessor === 'serial';
                  // Check if this is the Job Request column (by accessor or header)
                  const isJobRequestCell = cellColumn?.id === 'job_request' || cellColumn?.accessor === 'job_request';
                  // Check if this is the Submitted column (by accessor or header)
                  const isSubmittedCell = cellColumn?.id === 'submitted' || cellColumn?.accessor === 'submitted';
                  // Check if this is the Submitter column (by accessor or header)
                  const isSubmitterCell = cellColumn?.id === 'submitter' || cellColumn?.accessor === 'submitter';
                  // Check if this is the URL column (by accessor or header)
                  const isUrlCell = cellColumn?.id === 'url' || cellColumn?.accessor === 'url';
                  // Check if this is the Assigned column (by accessor or header)
                  const isAssignedCell = cellColumn?.id === 'assigned' || cellColumn?.accessor === 'assigned';
                  // Check if this is the Due Date column (by accessor or header)
                  const isDueDateCell = cellColumn?.id === 'due_date' || cellColumn?.accessor === 'due_date';
                  // Check if this is the Est. Val column (by accessor or header)
                  const isEstValCell = cellColumn?.id === 'est_val' || cellColumn?.accessor === 'est_val';
                  // Check if this is the Priority column (by accessor or header)
                  const isPriorityCell = cellColumn?.id === 'priority' || cellColumn?.accessor === 'priority';
                  // Check if this is the Status column (by accessor or header)
                  const isStatusCell = cellColumn?.id === 'status' || cellColumn?.accessor === 'status';
                  // Keyboard navigation: is this cell selected?
                  const isCellSelected = selectedCell?.row === rowIdx && selectedCell?.col === colIdx;
                  return (
                    <td
                      key={(typeof cellKey === 'string' || typeof cellKey === 'number') ? cellKey : colIdx}
                      {...restCellProps}
                      tabIndex={0}
                      ref={isCellSelected ? selectedCellRef : null}
                      onClick={() => {
                        setSelectedCell({ row: rowIdx, col: colIdx });
                        setSelectedCol(null); // Unselect the previously clicked cell
                      }}
                      onKeyDown={e => handleCellKeyDown(
                        e,
                        rowIdx,
                        colIdx,
                        rows.slice(0, 25).length,
                        (typedRow as { cells: unknown[] }).cells.length
                      )}
                      style={tdStyle}
                      className={isCellSelected ? 'selected-cell' : ''}
                    >
                      {isSerialCell ? (
                        <div className="flex items-center justify-center h-[20px] opacity-100 relative top-[6px] font-sans font-normal not-italic text-[14px] leading-[20px] tracking-[0%] text-center mt-[-8px] text-[var(--Content-Core-contentPrimary,#afafaf)]">
                          {(typedCell as { render: (type: string) => React.ReactNode }).render('Cell')}
                        </div>
                      ) : isSubmitterCell ? (
                        <div
                          className="flex items-center justify-start w-[108px] h-4 opacity-100 font-normal not-italic text-[14px] leading-4 tracking-[0%] text-[#121212]"
                          style={{
                            fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            letterSpacing: '0%',
                          }}
                        >
                          {(typedCell as { render: (type: string) => React.ReactNode }).render('Cell')}
                        </div>
                      ) : isUrlCell ? (
                        <div className="flex items-center justify-start w-[108px] h-5 opacity-100 overflow-hidden">
                          <span
                            className="block font-normal not-italic text-[14px] leading-5 tracking-[0%] text-[#121212] underline underline-solid underline-offset-2 w-[calc(100%+7px)] h-5 pr-[-7px] overflow-hidden whitespace-nowrap"
                            style={{
                              fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                              letterSpacing: '0%',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {(typedCell as { render: (type: string) => React.ReactNode }).render('Cell')}
                          </span>
                        </div>
                      ) : isAssignedCell ? (
                        <div
                          className="flex items-center justify-start w-[108px] h-4 opacity-100 font-normal not-italic text-[14px] leading-4 tracking-[0%] text-[#121212]"
                          style={{
                            fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            letterSpacing: '0%',
                          }}
                        >
                          {(typedCell as { render: (type: string) => React.ReactNode }).render('Cell')}
                        </div>
                      ) : isDueDateCell ? (
                        <div
                          className="flex items-center justify-end w-[109px] h-4 opacity-100 font-normal not-italic text-[14px] leading-4 tracking-[0%] text-right text-[#121212]"
                          style={{
                            fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            letterSpacing: '0%',
                          }}
                        >
                          {(typedCell as { render: (type: string) => React.ReactNode }).render('Cell')}
                        </div>
                      ) : isEstValCell ? (
                        <div className="ml-7">
                          <div
                            className="flex items-center justify-end w-[87px] h-4 opacity-100 gap-[2px] font-normal not-italic text-[14px] leading-4 tracking-[0%] text-right text-[#121212]"
                            style={{
                              fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                              letterSpacing: '0%',
                            }}
                          >
                            {((typedCell as { render: (type: string) => unknown }).render('Cell')) as React.ReactNode}
                            {(() => {
                              const value = (typedCell as { value?: unknown }).value;
                              return value !== undefined && value !== null && String(value).trim() !== '';
                            })() && (
                              <div
                                className="flex items-center justify-end w-[7px] h-4 opacity-100 ml-1 font-normal not-italic text-[14px] leading-4 tracking-[0%] text-right text-[#AFAFAF]"
                                style={{
                                  fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                  letterSpacing: '0%',
                                }}
                              >
                                ₹
                              </div>
                            )}
                          </div>
                        </div>
                      ) : isPriorityCell ? (
                        <div
                          className={
                            [
                              "flex items-center justify-center h-4 opacity-100 font-semibold not-italic text-[13px] leading-4 tracking-[0%] text-center",
                              (typedCell as { value?: unknown }).value === "Medium"
                                ? "w-[48px] ml-7 text-[#C29210]"
                                : (typedCell as { value?: unknown }).value === "High"
                                  ? "w-[27px] ml-9 text-[#EF4D44]"
                                  : "w-[25px] ml-9 text-[#1A8CFF]"
                            ].join(" ")
                          }
                          style={{
                            fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            letterSpacing: '0%',
                          }}
                        >
                          {(typedCell as { render: (type: string) => React.ReactNode }).render('Cell')}
                        </div>
                      ) : isStatusCell ? (
                        (() => {
                          const value = (typedCell as { value?: unknown }).value;
                          return value !== undefined && value !== null && String(value).trim() !== '';
                        })() ? (
                          <div
                            className={[
                              "flex items-center justify-center h-5 opacity-100 rounded-full gap-2 pt-1 pr-2 pb-1 pl-2",
                              (typedCell as { value?: unknown }).value === "In-Process"
                                ? "w-[80px] ml-3 bg-[#FFF3D6]"
                                : (typedCell as { value?: unknown }).value === "Need to start"
                                  ? "w-[95px] ml-1 bg-[#E2E8F0]"
                                  : (typedCell as { value?: unknown }).value === "Complete"
                                    ? "w-[73px] ml-4 bg-[#D3F2E3]"
                                    : "w-[63px] ml-5 bg-[#FFE1DE]"
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "flex items-center justify-center font-medium not-italic text-[12px] leading-4 tracking-[0%]",
                                (typedCell as { value?: unknown }).value === "In-Process"
                                  ? "w-[64px] h-[14px] text-[#85640B]"
                                  : (typedCell as { value?: unknown }).value === "Need to start"
                                    ? "w-[79px] h-[14px] text-[#475569]"
                                    : (typedCell as { value?: unknown }).value === "Complete"
                                      ? "w-[57px] h-[14px] text-[#0A6E3D]"
                                      : "w-[47px] h-[14px] text-[#C22219]"
                              ].join(" ")}
                              style={{
                                fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                letterSpacing: '0%',
                              }}
                            >
                              {(typedCell as { render: (type: string) => React.ReactNode }).render('Cell')}
                            </span>
                          </div>
                        ) : (
                          <div></div>
                        )
                      ) : isJobRequestCell ? (
                        <div className="w-[250px] h-5 p-0 block">
                          <span
                            className="block w-full h-full overflow-hidden whitespace-nowrap text-ellipsis font-normal not-italic text-[14px] leading-5 text-left text-black"
                            style={{
                              fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            }}
                          >
                            {(typedCell as { render: (type: string) => React.ReactNode }).render('Cell')}
                          </span>
                        </div>
                      ) : isSubmittedCell ? (
                        <div
                          className="flex items-center justify-start w-[98px] h-4 opacity-100 mt-[-1.5] ml-5 overflow-hidden"
                          style={{
                            fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: '20px',
                            color: 'var(--Content-Core-contentPrimary, #121212)',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            textAlign: 'right',
                          }}
                        >
                          <span
                            className="block w-full pl-5 overflow-hidden whitespace-nowrap text-ellipsis text-right"
                          >
                            {(typedCell as { render: (type: string) => React.ReactNode }).render('Cell')}
                          </span>
                        </div>
                      ) : (
                        ((typedCell as { render: (type: string) => unknown }).render('Cell')) as React.ReactNode
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};
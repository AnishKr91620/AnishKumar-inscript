import type { Column } from 'react-table';

export interface DataRow {
  serial: number;
  job_request: string;
  submitted: string;
  status: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: string;
  due_date: string;
  est_val: string;
  blank: string;
}

export interface CustomColumn<T = unknown> extends Column<T> {
  Header?: string;
  width?: number;
  accessor?: string;
}

export const COLUMNS: Column<DataRow>[] = [
  {
    Header: '#',
    accessor: 'serial',
    width: 14,
    id: 'serial',
  },
  {
    Header: 'Financial overview',
    id: 'group-financial-overview',
    columns: [
      {
        Header: 'Job Request',
        accessor: 'job_request',
        width: 259,
        id: 'job_request',
      },
      {
        Header: 'submitted',
        accessor: 'submitted',
        width: 125,
        id: 'submitted',
      },
      {
        Header: 'status',
        accessor: 'status',
        width: 130,
        id: 'status',
      },
      {
        Header: 'submitter',
        accessor: 'submitter',
        width: 124,
        id: 'submitter',
      },
    ],
  },
  {
    Header: '',
    id: 'group-url',
    columns: [
      {
        Header: 'URL',
        accessor: 'url',
        width: 94,
        id: 'url',
      },
    ],
  },
  {
    Header: 'ABC',
    id: 'group-abc',
    columns: [
      {
        Header: 'Assigned',
        accessor: 'assigned',
        width: 97,
        id: 'assigned',
      },
    ],
  },
  {
    Header: 'Answer a question',
    id: 'group-answer',
    columns: [
      {
        Header: 'Priority',
        accessor: 'priority',
        width: 119,
        id: 'priority',
      },
      {
        Header: 'Due Date',
        accessor: 'due_date',
        width: 118,
        id: 'due_date',
      },
    ],
  },
  {
    Header: 'Extract',
    id: 'group-extract',
    columns: [
      {
        Header: 'Est. Val',
        accessor: 'est_val',
        width: 114,
        id: 'est_val',
      },
    ],
  },
  {
    Header: '+',
    id: 'group-blank',
    columns: [
      {
        Header: '',
        accessor: 'blank',
        width: 110,
        id: 'blank',
      },
    ],
  },
];

export const GROUPED_COLUMNS: Column<DataRow>[] = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
      },
    ],
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth',
      },
      {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country',
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
      },
    ],
  },
]; 
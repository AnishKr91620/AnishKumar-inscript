export interface RowData {
  id: number;
  jobRequest: string;
  submitted: string;
  status: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  estValue: number;
}

export interface ColumnDef<T> {
  header: string;
  accessor: keyof T;
  width?: number;
  cell?: (value: unknown, row: T) => React.ReactNode;
} 
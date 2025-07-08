declare module 'react-table' {
  // Minimal type declarations for react-table v7 usage in this project.
  export function useTable(...args: unknown[]): unknown;
  export function useSortBy(...args: unknown[]): unknown;
  export function useBlockLayout(...args: unknown[]): unknown;
  export function useSticky(...args: unknown[]): unknown;
  export function useFilters(...args: unknown[]): unknown;
  export function useGlobalFilter(...args: unknown[]): unknown;
  export function usePagination(...args: unknown[]): unknown;
  export function useRowSelect(...args: unknown[]): unknown;
  export function useColumnOrder(...args: unknown[]): unknown;
  export type Column = Record<string, unknown>;
  export type TableInstance = unknown;
}
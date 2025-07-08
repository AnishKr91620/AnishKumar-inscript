import { useRef, useCallback } from 'react';

export function useAsyncDebounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  wait: number
) {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const debounced = useCallback((...args: Args) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      fn(...args);
    }, wait);
  }, [fn, wait]);

  return debounced;
}
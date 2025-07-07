import { useRef, useCallback } from 'react';

export function useAsyncDebounce(fn: (...args: any[]) => any, wait: number) {
    const timeout = useRef<NodeJS.Timeout | null>(null);


  const debounced = useCallback((...args: any[]) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      fn(...args);
    }, wait);
  }, [fn, wait]);

  return debounced;
}

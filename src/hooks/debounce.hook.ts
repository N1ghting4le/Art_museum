import { useCallback } from 'react';

const useDebounce = () => {
  const debounce = useCallback(function (func: Function, ms: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), ms);
    };
  }, []);

  return debounce;
};

export default useDebounce;

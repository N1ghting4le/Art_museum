import { useCallback } from 'react';

const useDebounce = () => {
  const debounce = useCallback(function (func: Function, ms: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function (this: any) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
  }, []);

  return debounce;
};

export default useDebounce;

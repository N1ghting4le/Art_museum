const useDebounce = () => {
  function debounce(func: Function, ms: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...arguments), ms);
    };
  }

  return debounce;
};

export default useDebounce;

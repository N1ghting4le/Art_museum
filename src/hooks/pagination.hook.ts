import { useCallback, useMemo, MouseEvent } from 'react';
import { Props } from '@/components/pagination/Pagination';

const usePagination = ({ currPage, amountOfPages, setCurrPage }: Props) => {
  const getSequence = useCallback(function* (from: number, to: number) {
    for (let i = from; i <= to; i++) {
      yield i;
    }
  }, []);

  const incrCurrPage = useCallback(() => setCurrPage((page) => page + 1), []);
  const decrCurrPage = useCallback(() => setCurrPage((page) => page - 1), []);

  const setCurrPageByClick = useCallback((e: MouseEvent) => {
    const { textContent } = e.currentTarget;

    setCurrPage(+(textContent as string));
  }, []);

  const pages = useMemo(
    () => [
      ...(() => {
        if (amountOfPages <= 4) {
          return getSequence(1, amountOfPages);
        } else if (currPage <= 2) {
          return getSequence(1, 4);
        } else if (amountOfPages - currPage <= 1) {
          return getSequence(amountOfPages - 3, amountOfPages);
        } else {
          return getSequence(currPage - 1, currPage + 2);
        }
      })(),
    ],
    [currPage, amountOfPages]
  );

  return { incrCurrPage, decrCurrPage, setCurrPageByClick, pages };
};

export default usePagination;

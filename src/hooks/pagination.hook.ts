import { MouseEvent } from 'react';
import { Props } from '@/components/pagination/Pagination';

function* getSequence(from: number, to: number) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
}

const usePagination = ({
  currPage,
  amountOfPages,
  setCurrPage,
  disabled,
}: Props) => {
  const incrCurrPage = () =>
    disabled ? null : setCurrPage((page) => page + 1);
  const decrCurrPage = () =>
    disabled ? null : setCurrPage((page) => page - 1);

  const setCurrPageByClick = (e: MouseEvent) => {
    if (disabled) return;

    const { textContent } = e.currentTarget;

    setCurrPage(+(textContent as string));
  };

  const pages = [
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
  ];

  return { incrCurrPage, decrCurrPage, setCurrPageByClick, pages };
};

export default usePagination;

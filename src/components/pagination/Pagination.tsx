import { Dispatch, SetStateAction, memo } from 'react';
import RightArrow from '@/assets/right-arrow.svg?react';
import LeftArrow from '@/assets/left-arrow.svg?react';
import usePagination from '@/hooks/pagination.hook';
import './pagination.scss';

export type Props = {
  currPage: number;
  setCurrPage: Dispatch<SetStateAction<number>>;
  amountOfPages: number;
  disabled: boolean;
};

const Pagination = memo(
  ({ currPage, setCurrPage, amountOfPages, disabled }: Props) => {
    const { incrCurrPage, decrCurrPage, setCurrPageByClick, pages } =
      usePagination({ currPage, setCurrPage, amountOfPages, disabled });

    return (
      <div className="pagination">
        <button
          onClick={decrCurrPage}
          className={`pagination__btn ${currPage === 1 ? 'hidden' : ''}`}
        >
          <LeftArrow width={20} height={20} />
        </button>
        <ul className="pagination__items_list">
          {pages.map((num) => (
            <li
              key={num}
              className={`pagination__page_item ${currPage === num ? 'active' : ''}`}
              onClick={setCurrPageByClick}
            >
              {num}
            </li>
          ))}
        </ul>
        <button
          onClick={incrCurrPage}
          className={`pagination__btn ${currPage === amountOfPages || !amountOfPages ? 'hidden' : ''}`}
        >
          <RightArrow width={20} height={20} />
        </button>
      </div>
    );
  }
);

export default Pagination;

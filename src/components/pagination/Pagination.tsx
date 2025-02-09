import { Dispatch, SetStateAction } from 'react';
import RightArrow from '../../assets/right-arrow.svg?react';
import LeftArrow from '../../assets/left-arrow.svg?react';
import './pagination.scss';

type Props = {
  currPage: number;
  setCurrPage: Dispatch<SetStateAction<number>>;
  amountOfPages: number;
};

const getArr = (from: number, to: number) => {
  const arr = [];

  for (let i = from; i <= to; i++) {
    arr.push(i);
  }

  return arr;
};

const Pagination = ({ currPage, setCurrPage, amountOfPages }: Props) => {
  const getPageNumbers = () => {
    if (amountOfPages <= 4) {
      return getArr(1, amountOfPages);
    } else if (currPage <= 2) {
      return getArr(1, 4);
    } else if (amountOfPages - currPage <= 1) {
      return getArr(amountOfPages - 3, amountOfPages);
    } else {
      return getArr(currPage - 1, currPage + 2);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => setCurrPage(currPage - 1)}
        className={`pagination__btn ${currPage === 1 ? 'hidden' : ''}`}
      >
        <LeftArrow width={20} height={20} />
      </button>
      <ul className="pagination__items_list">
        {getPageNumbers().map((num) => (
          <li
            key={num}
            className={`pagination__page_item ${currPage === num ? 'active' : ''}`}
            onClick={() => setCurrPage(num)}
          >
            {num}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setCurrPage(currPage + 1)}
        className={`pagination__btn ${currPage === amountOfPages || !amountOfPages ? 'hidden' : ''}`}
      >
        <RightArrow width={20} height={20} />
      </button>
    </div>
  );
};

export default Pagination;

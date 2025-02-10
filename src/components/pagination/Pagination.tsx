import { Dispatch, SetStateAction } from 'react';
import RightArrow from 'assets/right-arrow.svg?react';
import LeftArrow from 'assets/left-arrow.svg?react';
import './pagination.scss';

type Props = {
  currPage: number;
  setCurrPage: Dispatch<SetStateAction<number>>;
  amountOfPages: number;
};

function* getSequence(from: number, to: number) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
};

const Pagination = ({ currPage, setCurrPage, amountOfPages }: Props) => {
  const getPageNumbers = () => {
    if (amountOfPages <= 4) {
      return getSequence(1, amountOfPages);
    } else if (currPage <= 2) {
      return getSequence(1, 4);
    } else if (amountOfPages - currPage <= 1) {
      return getSequence(amountOfPages - 3, amountOfPages);
    } else {
      return getSequence(currPage - 1, currPage + 2);
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
        {[...getPageNumbers()].map((num) => (
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

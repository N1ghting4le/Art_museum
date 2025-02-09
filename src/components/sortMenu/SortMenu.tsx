import { useState, Dispatch, SetStateAction } from 'react';
import './sortMenu.scss';

type Props = {
  sortParam: string;
  setSortParam: Dispatch<SetStateAction<string>>;
};

const SortMenu = ({ sortParam, setSortParam }: Props) => {
  const [showList, setShowList] = useState(false);

  return (
    <div className="sort_menu">
      <p>Sort by:</p>
      <div style={{ position: 'relative' }}>
        <div
          onClick={() => setShowList(!showList)}
          className={`sort_menu__btn ${showList ? 'active' : ''}`}
        >
          {sortParam}
          <ul className={`sort_menu__params_list ${showList ? 'active' : ''}`}>
            <li
              onClick={() => setSortParam('no sort')}
              className="sort_menu__list_item"
            >
              no sort
            </li>
            <li
              onClick={() => setSortParam('title')}
              className="sort_menu__list_item"
            >
              title
            </li>
            <li
              onClick={() => setSortParam('artist')}
              className="sort_menu__list_item"
            >
              artist
            </li>
            <li
              onClick={() => setSortParam('year')}
              className="sort_menu__list_item"
            >
              year
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SortMenu;

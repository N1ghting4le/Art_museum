import { useState, Dispatch, SetStateAction } from 'react';
import './sortMenu.scss';

const sortParams = ['no sort', 'title', 'artist', 'year'] as const;

export type SortParam = (typeof sortParams)[number];

type Props = {
  sortParam: SortParam;
  setSortParam: Dispatch<SetStateAction<SortParam>>;
};

const SortMenu = ({ sortParam, setSortParam }: Props) => {
  const [showList, setShowList] = useState(false);

  return (
    <div className="sort_menu">
      <p>Sort by:</p>
      <div
        onClick={() => setShowList(!showList)}
        className={`sort_menu__btn ${showList ? 'active' : ''}`}
      >
        {sortParam}
        <ul className={`sort_menu__params_list ${showList ? 'active' : ''}`}>
          {sortParams.map((item) => (
            <li
              key={item}
              onClick={() => setSortParam(item)}
              className="sort_menu__list_item"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SortMenu;

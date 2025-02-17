import { Dispatch, SetStateAction, memo } from 'react';
import { SortParam } from 'src/types/sortParam';
import sortParams from 'src/constants/sortParams';
import useSortMenu from 'src/hooks/sortMenu.hook';
import './sortMenu.scss';

export type Props = {
  sortParam: SortParam;
  setSortParam: Dispatch<SetStateAction<SortParam>>;
};

const SortMenu = memo(({ sortParam, setSortParam }: Props) => {
  const { showList, toggleShow, setParamByClick } = useSortMenu({
    setSortParam,
  });

  return (
    <div className="sort_menu">
      <p>Sort by:</p>
      <div
        onClick={toggleShow}
        className={`sort_menu__btn ${showList ? 'active' : ''}`}
      >
        {sortParam}
        <ul className={`sort_menu__params_list ${showList ? 'active' : ''}`}>
          {sortParams.map((item) => (
            <li
              key={item}
              onClick={setParamByClick}
              className="sort_menu__list_item"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default SortMenu;

import sortParams from '@/constants/sortParams';
import { useCardsListContext } from '@/App';
import useSortMenu from '@/hooks/sortMenu.hook';
import './sortMenu.scss';

const SortMenu = () => {
  const { sortParam, setSortParam } = useCardsListContext();
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
};

export default SortMenu;

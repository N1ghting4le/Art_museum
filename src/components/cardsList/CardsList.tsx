import Spinner from '../spinner/Spinner';
import CardItem from '../cardItem/CardItem';
import SortMenu from '../sortMenu/SortMenu';
import Pagination from '../pagination/Pagination';
import useCardsList from '@/hooks/cardsList.hook';
import './cardsList.scss';

const CardsList = () => {
  const {
    isError,
    isLoading,
    sortParam,
    setSortParam,
    sortedCards,
    baseSrc,
    favorites,
    currPage,
    setCurrPage,
    amountOfPages,
  } = useCardsList();

  if (isError) return <p>Unable to load data</p>;

  return (
    <div>
      <SortMenu sortParam={sortParam} setSortParam={setSortParam} />
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="cards_list">
          {sortedCards && sortedCards.length ? (
            sortedCards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                baseSrc={baseSrc}
                favorites={favorites}
              />
            ))
          ) : (
            <p>No items were found</p>
          )}
        </ul>
      )}
      <Pagination
        currPage={currPage}
        setCurrPage={setCurrPage}
        amountOfPages={amountOfPages}
        disabled={isLoading}
      />
    </div>
  );
};

export default CardsList;

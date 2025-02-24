import Spinner from '../spinner/Spinner';
import CardItem from '../cardItem/CardItem';
import SortMenu from '../sortMenu/SortMenu';
import Pagination from '../pagination/Pagination';
import useCardsList from '@/hooks/cardsList.hook';
import './cardsList.scss';

const CardsList = () => {
  const { isError, isLoading, sortedCards } = useCardsList();

  if (isError) return <p>Unable to load data</p>;

  return (
    <div>
      <SortMenu />
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="cards_list">
          {sortedCards && sortedCards.length ? (
            sortedCards.map((card) => <CardItem key={card.id} card={card} />)
          ) : (
            <p>No items were found</p>
          )}
        </ul>
      )}
      <Pagination disabled={isLoading} />
    </div>
  );
};

export default CardsList;

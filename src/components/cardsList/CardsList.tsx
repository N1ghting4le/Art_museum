import { baseUrl, useCardsListContext } from 'src/App';
import { useState, useEffect } from 'react';
import useQuery from 'hooks/query.hook';
import Spinner from '../spinner/Spinner';
import CardItem from '../cardItem/CardItem';
import SortMenu from '../sortMenu/SortMenu';
import Pagination from '../pagination/Pagination';
import './cardsList.scss';

type Pagination = {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url?: string;
};

type Card = {
  id: number;
  title: string;
};

export type SearchCard = Card & {
  api_link: string;
};

export type ShowCard = Card & {
  artist_title: string;
  date_end: number;
  image_id: string;
};

export type Cards = (SearchCard | ShowCard)[];

type ApiResponse = {
  pagination: Pagination;
  data: SearchCard[] | ShowCard[];
  config: {
    iiif_url: string;
    website_url: string;
  };
};

export const fieldsStr = 'fields=id,title,artist_title,date_end,image_id';

const CardsList = () => {
  const {
    queryStr,
    currPage,
    amountOfPages,
    cards,
    sortParam,
    setCurrPage,
    setAmountOfPages,
    setCards,
    setSortParam,
  } = useCardsListContext();
  const [isInitial, setIsInitial] = useState(true);
  const [canSort, setCanSort] = useState(false);
  const { isLoading, isError, query } = useQuery();
  const [favorites, setFavorites] = useState<ShowCard[]>(
    JSON.parse(sessionStorage.getItem('favorites') || '[]')
  );
  const baseSrc = sessionStorage.getItem('baseSrc') || '';

  const fetchCards = () => {
    const url = `${baseUrl}/api/v1/artworks${queryStr ? '/search' : ''}?page=${currPage}&limit=5`;

    query<ApiResponse>(url + (queryStr || `&${fieldsStr}`)).then((res) => {
      setAmountOfPages(res.pagination.total_pages);
      sessionStorage.setItem('baseSrc', res.config.iiif_url);
      setCards(res.data);
    });
  };

  const sortCards = () => {
    if (!canSort) return cards;

    const showCards = [...cards] as ShowCard[];

    switch (sortParam) {
      case 'title':
        return showCards.sort((a, b) => a.title.localeCompare(b.title));
      case 'artist':
        return showCards.sort((a, b) =>
          a.artist_title.localeCompare(b.artist_title)
        );
      case 'year':
        return showCards.sort((a, b) => a.date_end - b.date_end);
      default:
        return showCards;
    }
  };

  useEffect(() => {
    if (!cards.length) {
      fetchCards();
    }
    setIsInitial(false);
  }, []);

  useEffect(() => {
    if (!isInitial) {
      fetchCards();
    }
  }, [currPage]);

  useEffect(() => {
    if (!isInitial) {
      setCurrPage(1);
      fetchCards();
    }
  }, [queryStr]);

  useEffect(() => {
    setCanSort(cards.every((card) => 'image_id' in card));
  }, [cards]);

  useEffect(() => {
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  if (isError) return <p>Unable to load data</p>;

  return (
    <div>
      <SortMenu sortParam={sortParam} setSortParam={setSortParam} />
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="cards_list">
          {sortCards().map((card) => (
            <CardItem
              key={card.id}
              card={card}
              setCards={setCards}
              baseSrc={baseSrc}
              isInFavorites={favorites.some((item) => item.id === card.id)}
              setFavorites={setFavorites}
            />
          ))}
        </ul>
      )}
      <Pagination
        currPage={currPage}
        setCurrPage={setCurrPage}
        amountOfPages={amountOfPages}
      />
    </div>
  );
};

export default CardsList;

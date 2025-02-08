import { baseUrl } from '../../App';
import { useState, useEffect } from 'react';
import useQuery from '../../hooks/query.hook';
import Spinner from '../spinner/Spinner';
import CardItem from '../cardItem/CardItem';
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

type ApiResponse = Pagination & {
  data: SearchCard[] | ShowCard[];
  config: {
    iiif_url: string;
    website_url: string;
  };
};

type Props = {
  queryStr: string;
};

export const fieldsStr = 'fields=id,title,artist_title,date_end,image_id';

const CardsList = ({ queryStr }: Props) => {
  const [baseSrc, setBaseSrc] = useState('');
  const [currPage, setCurrPage] = useState(1);
  const [isInitial, setIsInitial] = useState(true);
  const [amountOfPages, setAmountOfPages] = useState(1);
  const [cards, setCards] = useState<Cards>([]);
  const { isLoading, isError, query } = useQuery();

  const fetchCards = () => {
    const url = `${baseUrl}/api/v1/artworks${queryStr ? '/search' : ''}?page=${currPage}&limit=5`;

    query<ApiResponse>(url + (queryStr || `&${fieldsStr}`)).then((res) => {
      setAmountOfPages(res.total_pages);
      setBaseSrc(res.config.iiif_url);
      setCards(res.data);
    });
  };

  useEffect(fetchCards, [currPage]);

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
    } else {
      setCurrPage(1);
      fetchCards();
    }
  }, [queryStr]);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Unable to load data</p>;

  return (
    <ul className="cards_list">
      {cards.map((card) => (
        <CardItem
          key={card.id}
          card={card}
          setCards={setCards}
          baseSrc={baseSrc}
        />
      ))}
    </ul>
  );
};

export default CardsList;

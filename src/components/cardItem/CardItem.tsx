import { fieldsStr } from '../cardsList/CardsList';
import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  MouseEvent,
  RefObject,
} from 'react';
import { SearchCard, ShowCard, Cards } from '../cardsList/CardsList';
import { Link } from 'react-router-dom';
import useQuery from 'hooks/query.hook';
import Spinner from '../spinner/Spinner';
import BookmarkBtn from '../bookmarkBtn/BookmarkBtn';
import './cardItem.scss';

type Props = {
  card: SearchCard | ShowCard;
  setCards: Dispatch<SetStateAction<Cards>>;
  baseSrc: string | null;
  favorites: RefObject<ShowCard[]>;
};

const CardItem = ({ card, setCards, baseSrc, favorites }: Props) => {
  const { isLoading, isError, query } = useQuery();
  const [isFavorite, setIsFavorite] = useState(
    favorites.current.some((item) => item.id === card.id)
  );

  useEffect(() => {
    if ('api_link' in card) {
      query<{ data: ShowCard }>(card.api_link + `?${fieldsStr}`).then(
        ({ data }) => {
          setCards((cards) =>
            cards.map((card) => (card.id === data.id ? data : card))
          );
        }
      );
    }
  }, [card]);

  const toggleIsFavorite = (e: MouseEvent) => {
    e.preventDefault();

    if (isFavorite) {
      favorites.current = favorites.current.filter(
        (item) => item.id !== card.id
      );
    } else {
      favorites.current.push(card as ShowCard);
    }

    setIsFavorite(!isFavorite);
    sessionStorage.setItem('favorites', JSON.stringify(favorites.current));
  };

  return (
    <li>
      {(() => {
        if (isLoading || !('image_id' in card)) return <Spinner />;
        if (isError) return <p>Unable to load art</p>;

        const { id, image_id, title, artist_title, date_end } = card;

        return (
          <Link to={`/${id}`} className="cards_list_item">
            <img
              src={`${baseSrc}/${image_id}/full/843,/0/default.jpg`}
              alt={title}
              className="cards_list_item__image"
            />
            <div className="cards_list_item__info_wrapper">
              <div>
                <p className="cards_list_item__title">
                  {title.length > 16
                    ? `${title.slice(0, 16).trimEnd()}...`
                    : title}
                </p>
                <p className="cards_list_item__artist">
                  {artist_title && artist_title.length > 18
                    ? `${artist_title.slice(0, 18).trimEnd()}...`
                    : artist_title}
                </p>
                <p className="cards_list_item__year">{date_end}</p>
              </div>
              <BookmarkBtn isFavorite={isFavorite} onClick={toggleIsFavorite} />
            </div>
          </Link>
        );
      })()}
    </li>
  );
};

export default CardItem;

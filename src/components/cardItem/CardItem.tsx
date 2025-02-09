import { fieldsStr } from '../cardsList/CardsList';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SearchCard, ShowCard, Cards } from '../cardsList/CardsList';
import { Link } from 'react-router-dom';
import useQuery from '../../hooks/query.hook';
import Spinner from '../spinner/Spinner';
import BookmarkBtn from '../bookmarkBtn/BookmarkBtn';
import './cardItem.scss';

type Props = {
  card: SearchCard | ShowCard;
  setCards: Dispatch<SetStateAction<Cards>>;
  baseSrc: string;
  isInFavorites: boolean;
  setFavorites: Dispatch<SetStateAction<ShowCard[]>>;
};

const CardItem = ({
  card,
  setCards,
  baseSrc,
  isInFavorites,
  setFavorites,
}: Props) => {
  const { isLoading, isError, query } = useQuery();
  const [isFavorite, setIsFavorite] = useState(isInFavorites);

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

  const toggleIsFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      setFavorites((favorites) =>
        favorites.filter((item) => item.id !== card.id)
      );
    } else {
      setIsFavorite(true);
      setFavorites((favorites) => [...favorites, card as ShowCard]);
    }
  };

  return (
    <li className="cards_list_item">
      {(() => {
        if (isLoading || !('image_id' in card)) return <Spinner />;
        if (isError) return <p>Unable to load art</p>;

        const { id, image_id, title, artist_title, date_end } = card;

        return (
          <>
            <Link to={`/${id}`}>
              <img
                src={`${baseSrc}/${image_id}/full/843,/0/default.jpg`}
                alt={title}
                className="cards_list_item__image"
              />
            </Link>
            <div className="cards_list_item__info_wrapper">
              <div>
                <p className="cards_list_item__title">
                  {title.length > 16
                    ? `${title.slice(0, 16).trimEnd()}...`
                    : title}
                </p>
                <p className="cards_list_item__artist">{artist_title}</p>
                <p className="cards_list_item__year">{date_end}</p>
              </div>
              <BookmarkBtn isFavorite={isFavorite} onClick={toggleIsFavorite} />
            </div>
          </>
        );
      })()}
    </li>
  );
};

export default CardItem;

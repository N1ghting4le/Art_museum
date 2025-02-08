import { fieldsStr } from '../cardsList/CardsList';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { SearchCard, ShowCard, Cards } from '../cardsList/CardsList';
import useQuery from '../../hooks/query.hook';
import Spinner from '../spinner/Spinner';
import './cardItem.scss';

type Props = {
  card: SearchCard | ShowCard;
  setCards: Dispatch<SetStateAction<Cards>>;
  baseSrc: string;
};

const CardItem = ({ card, setCards, baseSrc }: Props) => {
  const { isLoading, isError, query } = useQuery();

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
  }, []);

  const element = (() => {
    if (isLoading) return <Spinner />;
    if (isError) return <p>Unable to load art</p>;
    if ('image_id' in card) {
      const { image_id, title, artist_title, date_end } = card;

      return (
        <>
          <img
            src={`${baseSrc}/${image_id}/full/843,/0/default.jpg`}
            alt={title}
            className="cards_list_item__image"
          />
          <div className="cards_list_item__info_wrapper">
            <p className="cards_list_item__title">
              {title.length > 22 ? `${title.slice(0, 22)}...` : title}
            </p>
            <p>{artist_title}</p>
            <p>{date_end}</p>
          </div>
        </>
      );
    }
  })();

  return <li className="cards_list_item">{element}</li>;
};

export default CardItem;

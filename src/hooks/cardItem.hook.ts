import { useState, useEffect, useCallback, MouseEvent } from 'react';
import { Props } from '@/components/cardItem/CardItem';
import { ShowCard } from '@/types/cards';
import fieldsStr from '@/constants/fieldsStr';
import useQuery from './query.hook';

type Args = Omit<Props, 'baseSrc'>;

const useCardItem = ({ favorites, card, setCards }: Args) => {
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

  const toggleIsFavorite = useCallback(
    (e: MouseEvent) => {
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
    },
    [isFavorite]
  );

  return { isError, isLoading, isFavorite, toggleIsFavorite };
};

export default useCardItem;

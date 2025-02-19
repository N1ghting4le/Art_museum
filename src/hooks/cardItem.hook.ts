import { useState, useEffect, useCallback, MouseEvent } from 'react';
import { Props } from '@/components/cardItem/CardItem';
import { ShowCard } from '@/types/cards';
import useApi from '@/api/api.hook';

type Args = Omit<Props, 'baseSrc'>;

const useCardItem = ({ favorites, card, setCards }: Args) => {
  const { isLoading, isError, fetchSingleCard } = useApi();
  const [isFavorite, setIsFavorite] = useState(
    favorites.current.some((item) => item.id === card.id)
  );

  useEffect(() => {
    if ('api_link' in card) {
      fetchSingleCard(card.api_link).then(({ data }) => {
        setCards((cards) =>
          cards.map((card) => (card.id === data.id ? data : card))
        );
      });
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

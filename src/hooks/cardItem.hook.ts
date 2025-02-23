import { useState, MouseEvent } from 'react';
import { Props } from '@/components/cardItem/CardItem';
import { ShowCard } from '@/types/cards';

type Args = Omit<Props, 'baseSrc'>;

const useCardItem = ({ favorites, card }: Args) => {
  const [isFavorite, setIsFavorite] = useState(
    favorites.current.some((item) => item.id === card.id)
  );

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

  return { isFavorite, toggleIsFavorite };
};

export default useCardItem;

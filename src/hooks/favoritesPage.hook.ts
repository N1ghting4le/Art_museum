import { useState, MouseEvent } from 'react';
import { useCardsListContext } from '@/App';

const useFavoritesPage = () => {
  const { baseSrc, favorites: fav } = useCardsListContext();
  const [favorites, setFavorites] = useState(fav.current);

  const deleteFromFavorites = (e: MouseEvent) => {
    e.preventDefault();

    const { id } = e.currentTarget;
    fav.current = favorites.filter((item) => item.id !== +id);

    setFavorites(fav.current);
    sessionStorage.setItem('favorites', JSON.stringify(fav.current));
  };

  return { favorites, baseSrc, deleteFromFavorites };
};

export default useFavoritesPage;

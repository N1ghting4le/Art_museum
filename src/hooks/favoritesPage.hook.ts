import { useState, useCallback, MouseEvent } from 'react';
import { ShowCard } from 'src/types/cards';

const useFavoritesPage = () => {
  const [favorites, setFavorites] = useState<ShowCard[]>(
    JSON.parse(sessionStorage.getItem('favorites') || '[]')
  );
  const baseSrc = sessionStorage.getItem('baseSrc');

  const deleteFromFavorites = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      const { id } = e.currentTarget;
      const updatedFavorites = favorites.filter((item) => item.id !== +id);

      setFavorites(updatedFavorites);
      sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    },
    [favorites]
  );

  return { favorites, baseSrc, deleteFromFavorites };
};

export default useFavoritesPage;

import { useState, MouseEvent } from 'react';
import { ShowCard } from '@/types/cards';

const useFavoritesPage = () => {
  const [favorites, setFavorites] = useState<ShowCard[]>(
    JSON.parse(sessionStorage.getItem('favorites') || '[]')
  );
  const baseSrc = sessionStorage.getItem('baseSrc');

  const deleteFromFavorites = (e: MouseEvent) => {
    e.preventDefault();

    const { id } = e.currentTarget;
    const updatedFavorites = favorites.filter((item) => item.id !== +id);

    setFavorites(updatedFavorites);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return { favorites, baseSrc, deleteFromFavorites };
};

export default useFavoritesPage;

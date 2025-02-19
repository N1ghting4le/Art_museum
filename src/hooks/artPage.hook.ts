import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { ShowCard } from '@/types/cards';
import { FullInfo } from '@/types/fullInfo';
import useApi from '@/api/api.hook';

const useArtPage = () => {
  const baseSrc = sessionStorage.getItem('baseSrc');
  const { id } = useParams() as { id: string };
  const { isLoading, isError, fetchFullInfo } = useApi({ id });
  const favorites = useRef<ShowCard[]>(
    JSON.parse(sessionStorage.getItem('favorites') || '[]')
  );
  const [isFavorite, setIsFavorite] = useState(
    favorites.current.some((item) => item.id === +id)
  );
  const [info, setInfo] = useState<FullInfo | null>(null);

  useEffect(() => {
    fetchFullInfo().then((res) => {
      setInfo(res.data);
    });
  }, []);

  const toggleIsFavorite = useCallback(() => {
    if (isFavorite) {
      favorites.current = favorites.current.filter((item) => item.id !== +id);
    } else if (info) {
      const { place_of_origin, style_title, dimensions, credit_line, ...card } =
        info;

      favorites.current.push(card);
    }

    setIsFavorite(!isFavorite);
    sessionStorage.setItem('favorites', JSON.stringify(favorites.current));
  }, [isFavorite, info]);

  return { baseSrc, isError, isLoading, isFavorite, info, toggleIsFavorite };
};

export default useArtPage;

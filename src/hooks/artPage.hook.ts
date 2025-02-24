import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { FullInfo } from '@/types/fullInfo';
import { useCardsListContext } from '@/App';
import useApi from '@/api/api.hook';

const useArtPage = () => {
  const { baseSrc, favorites } = useCardsListContext();
  const { id } = useParams() as { id: string };
  const { isLoading, isError, fetchFullInfo } = useApi();
  const [isFavorite, setIsFavorite] = useState(
    favorites.current.some((item) => item.id === +id)
  );
  const [info, setInfo] = useState<FullInfo | null>(null);

  useEffect(() => {
    fetchFullInfo(id).then((res) => {
      setInfo(res.data);
    });
  }, []);

  const toggleIsFavorite = () => {
    if (isFavorite) {
      favorites.current = favorites.current.filter((item) => item.id !== +id);
    } else if (info) {
      const { place_of_origin, style_title, dimensions, credit_line, ...card } =
        info;

      favorites.current.push(card);
    }

    setIsFavorite(!isFavorite);
    sessionStorage.setItem('favorites', JSON.stringify(favorites.current));
  };

  return { baseSrc, isError, isLoading, isFavorite, info, toggleIsFavorite };
};

export default useArtPage;

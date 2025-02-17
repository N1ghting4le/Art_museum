import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { ShowCard } from 'src/types/cards';
import { FullInfo } from 'src/types/fullInfo';
import baseUrl from 'src/constants/baseUrl';
import fieldsStr from 'src/constants/fieldsStr';
import artParams from 'src/constants/artParams';
import useQuery from './query.hook';

const useArtPage = () => {
  const baseSrc = sessionStorage.getItem('baseSrc');
  const { isLoading, isError, query } = useQuery();
  const { id } = useParams() as { id: string };
  const favorites = useRef<ShowCard[]>(
    JSON.parse(sessionStorage.getItem('favorites') || '[]')
  );
  const [isFavorite, setIsFavorite] = useState(
    favorites.current.some((item) => item.id === +id)
  );
  const [info, setInfo] = useState<FullInfo | null>(null);

  useEffect(() => {
    query<{ data: FullInfo }>(
      `${baseUrl}/api/v1/artworks/${id}?${fieldsStr},${artParams.join()}`
    ).then((res) => {
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

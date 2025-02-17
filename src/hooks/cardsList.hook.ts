import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ShowCard } from 'src/types/cards';
import { ApiResponse } from 'src/types/apiResponse';
import { useCardsListContext } from 'src/App';
import baseUrl from 'src/constants/baseUrl';
import fieldsStr from 'src/constants/fieldsStr';
import useQuery from './query.hook';
import useUpdateEffect from './updateEffect.hook';

const useCardsList = () => {
  const {
    queryStr,
    currPage,
    amountOfPages,
    cards,
    sortParam,
    setCurrPage,
    setAmountOfPages,
    setCards,
    setSortParam,
  } = useCardsListContext();

  const [canSort, setCanSort] = useState(false);
  const { isLoading, isError, query } = useQuery();
  const favorites = useRef<ShowCard[]>(
    JSON.parse(sessionStorage.getItem('favorites') || '[]')
  );
  const baseSrc = sessionStorage.getItem('baseSrc');

  const fetchCards = useCallback(() => {
    const url = `${baseUrl}/api/v1/artworks${queryStr ? '/search' : ''}?page=${currPage}&limit=5`;

    query<ApiResponse>(url + (queryStr || `&${fieldsStr}`)).then((res) => {
      sessionStorage.setItem('baseSrc', res.config.iiif_url);
      setAmountOfPages(res.pagination.total_pages);
      setCards(res.data);
    });
  }, [queryStr, currPage]);

  useEffect(() => {
    if (!cards.length) {
      fetchCards();
    }
  }, []);

  useUpdateEffect(fetchCards, [currPage]);

  useUpdateEffect(() => {
    if (currPage === 1) {
      fetchCards();
    } else {
      setCurrPage(1);
    }
  }, [queryStr]);

  useEffect(() => {
    setCanSort(cards.every((card) => 'image_id' in card));
  }, [cards]);

  const sortedCards = useMemo(() => {
    if (!canSort || sortParam === 'no sort') return cards;

    const showCards = [...cards] as ShowCard[];

    switch (sortParam) {
      case 'title':
        return showCards.sort((a, b) => a.title.localeCompare(b.title));
      case 'artist':
        return showCards.sort((a, b) => {
          if (a.artist_title && b.artist_title) {
            return a.artist_title.localeCompare(b.artist_title);
          } else if (a.artist_title) {
            return -1;
          } else if (b.artist_title) {
            return 1;
          }
          return 0;
        });
      case 'year':
        return showCards.sort((a, b) => {
          if (a.date_end && b.date_end) {
            return a.date_end - b.date_end;
          } else if (a.date_end) {
            return -1;
          } else if (b.date_end) {
            return 1;
          }
          return 0;
        });
    }
  }, [canSort, sortParam, cards]);

  return {
    isLoading,
    isError,
    sortParam,
    setSortParam,
    sortedCards,
    setCards,
    favorites,
    baseSrc,
    currPage,
    setCurrPage,
    amountOfPages,
  };
};

export default useCardsList;

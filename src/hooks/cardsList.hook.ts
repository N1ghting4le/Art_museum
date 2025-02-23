import { useEffect, useRef, useCallback, useMemo } from 'react';
import { ShowCard } from '@/types/cards';
import { useCardsListContext } from '@/App';
import useFetchCards from '@/api/api.hook';
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

  const { isLoading, isError, fetchCards, fetchSingleCard } = useFetchCards();
  const favorites = useRef<ShowCard[]>(
    JSON.parse(sessionStorage.getItem('favorites') || '[]')
  );
  const baseSrc = sessionStorage.getItem('baseSrc');

  const setOrUpdateCards = useCallback((query: string, page = 1) => {
    fetchCards(query, page).then((res) => {
      const { config, pagination, data } = res;

      sessionStorage.setItem('baseSrc', config.iiif_url);
      setAmountOfPages(pagination.total_pages);
      setCards(data);

      data.forEach((card) => {
        if ('api_link' in card) {
          fetchSingleCard(card.api_link)
            .then(({ data }) => {
              setCards((cards) =>
                cards.map((card) => (card.id === data.id ? data : card))
              );
            })
            .catch(() => {
              setCards((cards) => cards.filter(({ id }) => id !== card.id));
            });
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!cards.length) {
      setOrUpdateCards('');
    }
  }, []);

  useUpdateEffect(() => {
    setCurrPage(1);
    setOrUpdateCards(queryStr);
  }, [queryStr]);

  useUpdateEffect(() => {
    if (!isLoading) {
      setOrUpdateCards(queryStr, currPage);
    }
  }, [currPage]);

  const canSort = useMemo(
    () => cards.every((card) => 'image_id' in card),
    [cards]
  );

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
  }, [cards, canSort, sortParam]);

  return {
    isLoading,
    isError,
    sortParam,
    setSortParam,
    sortedCards,
    favorites,
    baseSrc,
    currPage,
    setCurrPage,
    amountOfPages,
  };
};

export default useCardsList;

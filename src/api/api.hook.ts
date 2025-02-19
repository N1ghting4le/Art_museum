import { useCallback } from 'react';
import { ApiResponse } from '@/types/apiResponse';
import { FullInfo } from '@/types/fullInfo';
import { ShowCard } from '@/types/cards';
import baseUrl from '@/constants/baseUrl';
import fieldsStr from '@/constants/fieldsStr';
import artParams from '@/constants/artParams';
import useQuery from '@/hooks/query.hook';

const useApi = () => {
  const { isLoading, isError, query } = useQuery();

  const fetchCards = useCallback((queryStr: string, currPage: number) => {
    const url = `${baseUrl}/api/v1/artworks${queryStr ? '/search' : ''}?page=${currPage}&limit=5`;

    return query<ApiResponse>(url + (queryStr || `&${fieldsStr}`));
  }, []);

  const fetchFullInfo = useCallback(
    (id: string) =>
      query<{ data: FullInfo }>(
        `${baseUrl}/api/v1/artworks/${id}?${fieldsStr},${artParams.join()}`
      ),
    []
  );

  const fetchSingleCard = useCallback(
    (apiLink: string) => query<{ data: ShowCard }>(apiLink + `?${fieldsStr}`),
    []
  );

  return { isLoading, isError, fetchCards, fetchFullInfo, fetchSingleCard };
};

export default useApi;

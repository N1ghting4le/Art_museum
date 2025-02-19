import { useCallback } from 'react';
import { ApiResponse } from '@/types/apiResponse';
import { FullInfo } from '@/types/fullInfo';
import baseUrl from '@/constants/baseUrl';
import fieldsStr from '@/constants/fieldsStr';
import artParams from '@/constants/artParams';
import useQuery from '@/hooks/query.hook';

type Args = {
  queryStr?: string;
  currPage?: number;
  id?: string;
};

const useApi = ({ queryStr, currPage, id }: Args) => {
  const { isLoading, isError, query } = useQuery();

  const fetchCards = useCallback(() => {
    const url = `${baseUrl}/api/v1/artworks${queryStr ? '/search' : ''}?page=${currPage}&limit=5`;

    return query<ApiResponse>(url + (queryStr || `&${fieldsStr}`));
  }, [queryStr, currPage]);

  const fetchFullInfo = useCallback(
    () =>
      query<{ data: FullInfo }>(
        `${baseUrl}/api/v1/artworks/${id}?${fieldsStr},${artParams.join()}`
      ),
    [id]
  );

  return { isLoading, isError, fetchCards, fetchFullInfo };
};

export default useApi;

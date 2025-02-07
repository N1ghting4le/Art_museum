import { useState } from 'react';

const useQuery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const query = <T>(url: string): Promise<T> => {
    return new Promise(async (resolve, reject) => {
      try {
        setIsError(false);
        setIsSuccess(false);
        setIsLoading(true);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch url: ${url}, status: ${response.status}`
          );
        }

        const data = (await response.json()) as T;

        setIsSuccess(true);
        resolve(data);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
        }

        setIsError(true);
        reject(e);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return { isLoading, isSuccess, isError, query };
};

export default useQuery;

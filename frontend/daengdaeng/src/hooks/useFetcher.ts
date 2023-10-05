import useSWR from 'swr';

import { getUser } from './useLocalStorage';
import { fetcher } from '../apis/utils/fetcher';

export default function useFetcher<T>(
  url: string,
  isTrigger: boolean = true,
  params: string = '',
) {
  const token: string | undefined = getUser();
  
  const { data, error, mutate, isLoading } = useSWR<T>(
    // eslint-disable-next-line no-null/no-null
    isTrigger ? [url, token, params] : null,
    async ([url, token, params]) => {
      if (typeof token === 'string') {
        return fetcher(url, token, params);
      }
    },
  );

  return {
    data,
    isLoading: !error && !data && isLoading,
    isError: error,
    mutate,
  };
}

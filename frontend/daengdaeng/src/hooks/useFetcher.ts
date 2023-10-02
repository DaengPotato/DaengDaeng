import useSWR from 'swr';

import { getUser } from './useLocalStorage';
import { fetcher } from '../apis/utils/fetcher';

const token: string | undefined = getUser();

export default function useFetcher<T>(url: string) {
  const { data, error, mutate, isLoading } = useSWR<T>(
    [url, token],
    async ([url, token]) => {
      if (typeof token === 'string') {
        return fetcher(url, token);
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

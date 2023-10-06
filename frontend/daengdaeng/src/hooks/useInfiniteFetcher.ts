import useSWRInfinite from 'swr/infinite';

import { getUser } from './useLocalStorage';
import { fetcher } from '../apis/utils/fetcher';

export default function useInfiniteFetcher(
  isTrigger: boolean = true,
  params: string = '',
) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    // 끝에 도달
    if ((previousPageData && !previousPageData.placeList) || !isTrigger) {
      // eslint-disable-next-line no-null/no-null
      return null;
    }

    // 첫 페이지, `previousPageData`가 없음
    if (pageIndex === 0) return `/place${params}&cursor=0`;

    // API의 엔드포인트에 커서를 추가
    return `/place${params}&cursor=${previousPageData.nextCursor}`;
  };

  const token = getUser() as string;

  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite(getKey, (url) => fetcher(url, token));

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize,
  };
}

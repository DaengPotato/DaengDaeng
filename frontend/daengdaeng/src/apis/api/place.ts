import { getUser } from '@/src/hooks/useLocalStorage';

import { reissue } from './member';

export const createLikePlace = async (placeId: number) => {
  const token: string | undefined = getUser();

  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/heart/${placeId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status === 401) {
    res = await reissue(`/member/heart/${placeId}`, 'POST');
  }

  return res;
};

export const deleteLikePlace = async (placeId: number) => {
  const token: string | undefined = getUser();

  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/heart/${placeId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status === 401) {
    res = await reissue(`/member/heart/${placeId}`, 'DELETE');
  }

  return res;
};

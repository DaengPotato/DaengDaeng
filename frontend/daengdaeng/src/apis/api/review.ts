import { getUser } from '@/src/hooks/useLocalStorage';

import { reissue } from './member';

import type { Review } from '@/src/types/place';

const token: string | undefined = getUser();

export const createReview = async (placeId: string, ReviewRequest: Review) => {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/${placeId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ReviewRequest),
    },
  );

  if (res.status === 401) {
    res = await reissue(
      `/review/${placeId}`,
      'POST',
      JSON.stringify(ReviewRequest),
    );
  }

  return res;
};

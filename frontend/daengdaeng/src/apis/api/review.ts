import { getUser } from '@/src/hooks/useLocalStorage';

import type { Review } from '@/src/types/place';

const token: string | undefined = getUser();

export const createReview = async (placeId: string, ReviewRequest: Review) => {
  const res = await fetch(
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

  return res;
};

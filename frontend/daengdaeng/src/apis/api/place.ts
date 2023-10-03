import { getUser } from '@/src/hooks/useLocalStorage';

const token: string | undefined = getUser();

export const createLikePlace = async (placeId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/heart/${placeId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res;
};

export const deleteLikePlace = async (placeId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/heart/${placeId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res;
};

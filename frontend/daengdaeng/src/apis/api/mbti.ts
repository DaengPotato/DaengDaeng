import { getUser } from '@/src/hooks/useLocalStorage';

import { reissue } from './member';

export const updateMBTI = async (
  petId: number,
  mbti: { [key: string]: string },
) => {
  const token: string | undefined = getUser();

  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mbti/${petId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mbti),
  });

  if (res.status === 401) {
    res = await reissue(`/mbti/${petId}`, 'PATCH', JSON.stringify(mbti));
  }

  return res;
};

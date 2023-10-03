import { getUser } from '@/src/hooks/useLocalStorage';

const token: string | undefined = getUser();

export const updateMBTI = async (
  petId: number,
  mbti: { [key: string]: string },
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mbti/${petId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mbti),
  });

  return res;
};

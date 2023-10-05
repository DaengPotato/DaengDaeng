import { getUser } from '@/src/hooks/useLocalStorage';

export const updateMBTI = async (
  petId: number,
  mbti: { [key: string]: string },
) => {
  const token: string | undefined = getUser();
  
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

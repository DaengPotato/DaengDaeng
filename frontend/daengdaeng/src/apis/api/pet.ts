import { getUser } from '@/src/hooks/useLocalStorage';

const token: string | undefined = getUser();

export const createPet = async (pet: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: pet,
  });

  return res;
};

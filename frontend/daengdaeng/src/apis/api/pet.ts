import { getUser } from '@/src/hooks/useLocalStorage';

const token: string | undefined = getUser();

// 반려견 등록
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

// 반려견 수정
export const updatePet = async (pet: FormData, petId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet/${petId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: pet,
  });

  return res;
};

import { getUser } from '@/src/hooks/useLocalStorage';

import { reissue } from './member';

// 반려견 등록
export const createPet = async (pet: FormData) => {
  const token: string | undefined = getUser();

  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: pet,
  });

  if (res.status === 401) {
    res = await reissue('/pet', 'POST', pet);
  }

  return res;
};

// 반려견 수정
export const updatePet = async (pet: FormData, petId: number) => {
  const token: string | undefined = getUser();

  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet/${petId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: pet,
  });

  if (res.status === 401) {
    res = await reissue(`/pet/${petId}`, 'PUT', pet);
  }

  return res;
};

// 반려견 삭제
export const deletePet = async (petId: number) => {
  const token: string | undefined = getUser();

  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet/${petId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    res = await reissue(`/pet/${petId}`, 'DELETE');
  }

  return res;
};

import { getUser } from '@/src/hooks/useLocalStorage';


// 반려견 등록
export const createPet = async (pet: FormData) => {
  const token: string | undefined = getUser();

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
  const token: string | undefined = getUser();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet/${petId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: pet,
  });

  return res;
};

// 반려견 삭제
export const deletePet = async (petId: number) => {
  const token: string | undefined = getUser();
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet/${petId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

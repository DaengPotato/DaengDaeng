import type { UserInfo } from '@/src/types/member';

import { getUser, saveUserInfo } from '@/src/hooks/useLocalStorage';

const token: string | undefined = getUser();

export const findUserInfo = async (token: string): Promise<UserInfo> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = JSON.parse(await res.text());

  saveUserInfo(data);

  return data;
};

export const logout = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const deleteMember = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const getIsAvailableNickname = async (
  token: string,
  nickname: string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/nicknameCheck/${nickname}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res;
};

export const updateNickname = async (token: string, nickname: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/modifyNickname?nickname=${nickname}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res;
};

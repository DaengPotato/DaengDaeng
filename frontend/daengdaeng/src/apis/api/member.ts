import {
  getUser,
  removeUser,
  removeUserInfo,
  saveUser,
  saveUserInfo,
} from '@/src/hooks/useLocalStorage';

import type { UserInfo } from '@/src/types/member';

export const reissue = async (url: string, method?: string, body?: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/reissue`,
    {
      method: 'POST',
    },
  );
  const newToken = await response.text();
  saveUser(newToken);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: method ? method : 'GET',
    headers: {
      Authorization: `Bearer ${newToken}`,
    },
    body: body ? body : undefined,
  });

  if (res.status === 400) {
    removeUser();
    removeUserInfo();
  }

  return res;
};

export const findUserInfo = async (token: string): Promise<UserInfo> => {
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    res = await reissue('/member');
  }

  const data = JSON.parse(await res.text());

  saveUserInfo(data);

  return data;
};

export const logout = async () => {
  const token: string | undefined = getUser();
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    res = await reissue('/member/logout');
  }

  return res;
};

export const deleteMember = async () => {
  const token: string | undefined = getUser();

  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    res = await reissue('/member');
  }

  return res;
};

export const getIsAvailableNickname = async (
  token: string,
  nickname: string,
) => {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/nicknameCheck/${nickname}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status === 401) {
    res = await reissue(`/member/nicknameCheck/${nickname}`);
  }

  return res;
};

export const updateNickname = async (token: string, nickname: string) => {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/modifyNickname?nickname=${nickname}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status === 401) {
    res = await reissue(`/member/modifyNickname?nickname=${nickname}`);
  }

  return res;
};

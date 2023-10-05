import { findUserInfo } from '../apis/api/member';

import type { UserInfo } from '../types/member';

export async function saveUser(token: string): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.setItem('USER', token);
    saveUserInfo(await findUserInfo(token));
  }
}

export function getUser(): string | undefined {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('USER');
    return accessToken as string;
  }
  return undefined;
}

export function removeUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('USER');
    localStorage.removeItem('USER_INFO');
  }
}

export function saveUserInfo(userInfo: UserInfo): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
  }
}

export function getUserInfo(): UserInfo | undefined {
  if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('USER_INFO');
    return JSON.parse(userInfo as string);
  }
  return undefined;
}

export function removeUserInfo(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('USER_INFO');
  }
}

import { findUserInfo } from '../apis/api/member';
import {
  USER_INFO_LOCAL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY,
} from '../constants/localStorageKey';

import type { UserInfo } from '../types/member';

export async function saveUser(token: string): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, token);
    saveUserInfo(await findUserInfo(token));
  }
}

export function getUser(): string | undefined {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    return accessToken as string;
  }
  return undefined;
}

export function removeUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    localStorage.removeItem(USER_INFO_LOCAL_STORAGE_KEY);
  }
}

export function saveUserInfo(userInfo: UserInfo): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_INFO_LOCAL_STORAGE_KEY, JSON.stringify(userInfo));
  }
}

export function getUserInfo(): UserInfo | undefined {
  if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem(USER_INFO_LOCAL_STORAGE_KEY);
    return JSON.parse(userInfo as string);
  }
  return undefined;
}

export function removeUserInfo(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_INFO_LOCAL_STORAGE_KEY);
  }
}

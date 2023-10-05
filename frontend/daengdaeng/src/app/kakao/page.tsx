'use client';

import { useCallback, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { saveUser } from '@/src/hooks/useLocalStorage';

import type { NextPage } from 'next';

const Kakao: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginType = searchParams.get('type');
  const authCode = searchParams.get('code');
  const kakaoServerError = searchParams.get('error');

  const loginHandler = useCallback(
    async (type: string, code: string | string[]) => {
      // 백엔드에 전송
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/member/login/${type}?code=${code}`,
        {
          method: 'POST',
        },
      );

      if (response.ok) {
        // 성공하면 홈으로 리다이렉트
        const accessToken = await response.text();

        if (typeof window !== 'undefined') {
          saveUser(accessToken);
        }
        router.replace('/');
      } else {
        // 실패하면 에러 페이지로 리다이렉트
        router.push('/notifications/authentication-failed');
      }
    },
    [router],
  );

  useEffect(() => {
    if (loginType && authCode) {
      loginHandler(loginType, authCode);
      console.log('loginHandler 완');
      // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
    } else if (kakaoServerError) {
      router.push('/notifications/authentication-failed');
    }
  }, [loginHandler, authCode, kakaoServerError, router]);

  return <h2>로그인 중입니다..</h2>;
};

export default Kakao;

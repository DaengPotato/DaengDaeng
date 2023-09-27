'use client';

import { useCallback, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { saveUser } from '@/src/hooks/useLocalStorage';

import type { NextPage } from 'next';

const Kakao: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authCode = searchParams.get('code');
  const kakaoServerError = searchParams.get('error');
  // const { code: authCode, error: kakaoServerError } = router.query;

  const loginHandler = useCallback(
    async (code: string | string[]) => {
      console.log('code===============' + code);
      // 백엔드에 전송
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/member/login/KAKAO?code=${code}`,
        {
          method: 'POST',
        },
      );
      // const data = await response.json();

      if (response.ok) {
        // 성공하면 홈으로 리다이렉트
        const accessToken = await response.text();
        console.log(accessToken);

        if (typeof window !== 'undefined') {
          saveUser(accessToken);
        }
        router.push('/');
      } else {
        // 실패하면 에러 페이지로 리다이렉트
        router.push('/notifications/authentication-failed');
      }
    },
    [router],
  );

  useEffect(() => {
    if (authCode) {
      loginHandler(authCode);
      console.log('loginHandler 완');
      // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
    } else if (kakaoServerError) {
      router.push('/notifications/authentication-failed');
    }
  }, [loginHandler, authCode, kakaoServerError, router]);

  return <h2>로그인 중입니다..</h2>;
};

export default Kakao;

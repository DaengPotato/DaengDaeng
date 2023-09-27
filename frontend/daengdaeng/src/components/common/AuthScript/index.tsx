'use client';

import React from 'react';

import Script from 'next/script';

const AuthScript = () => {
  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      onLoad={() => {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      }}
    />
  );
};

export default AuthScript;

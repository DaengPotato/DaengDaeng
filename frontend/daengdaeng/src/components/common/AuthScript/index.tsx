'use client';

import React from 'react';

import Script from 'next/script';

const AuthScript = () => {
  return (
    <>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        onLoad={() => {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        }}
      />
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      />
    </>
  );
};

export default AuthScript;

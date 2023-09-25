import localFont from 'next/font/local';

export const ssurround = localFont({
  src: [
    {
      path: './fonts/Cafe24SsurroundAir-v1.1.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Cafe24Ssurround-v2.0.woff2',
      weight: '800',
      style: 'bold',
    },
  ],
});


export const pretendard = localFont({
  src: [
    {
      path: './fonts/Pretendard-Light.subset.woff2',
      weight: '200',
      style: 'light',
    },
    {
      path: './fonts/Pretendard-Regular.subset.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.subset.woff2',
      weight: '500',
      style: 'medium',
    },
    {
      path: './fonts/Pretendard-SemiBold.subset.woff2',
      weight: '600',
      style: 'semibold',
    },
    {
      path: './fonts/Pretendard-Bold.subset.woff2',
      weight: '700',
      style: 'bold',
    },
    {
      path: './fonts/Pretendard-ExtraBold.subset.woff2',
      weight: '800',
      style: 'extrabold',
    },
  ],
});

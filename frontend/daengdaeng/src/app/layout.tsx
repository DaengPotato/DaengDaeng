import React from 'react';

import './global.scss';

import Header from '@/src/components/Header';

import Head from './head';
import AuthScript from '../components/common/AuthScript';
import { ssurround } from '../styles/fonts';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head></Head>
      <body className={`${ssurround.className}`}>
        <div className="fixed-width">
          <Header />
          {children}
        </div>
        <AuthScript />
      </body>
    </html>
  );
}

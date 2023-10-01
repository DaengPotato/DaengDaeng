import React from 'react';

import './global.scss';

import Head from './head';
import AuthScript from '../components/common/AuthScript';
import { ssurround } from '../styles/fonts';

import Header from '@/src/components/Header';

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
        <div id="rootDiv" className="fixed-width">
          <Header />
          {children}
        </div>
        <AuthScript />
      </body>
    </html>
  );
}

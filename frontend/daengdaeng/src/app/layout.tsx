import React from 'react';

import './global.scss';

import Head from './head';
import { ssurround } from '../styles/fonts';

import Header from '@/src/components/Header';

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
      </body>
    </html>
  );
}

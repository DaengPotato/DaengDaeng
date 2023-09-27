import React from 'react';

import './global.scss';

<<<<<<< Updated upstream
=======
import Header from '@/src/components/Header';

>>>>>>> Stashed changes
import Head from './head';
import AuthScript from '../components/common/AuthScript';
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
        <AuthScript />
      </body>
    </html>
  );
}
